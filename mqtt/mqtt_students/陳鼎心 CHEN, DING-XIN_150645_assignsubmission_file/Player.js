const mqtt = require('mqtt');

// MQTT 連線設定
// const MQTT_SERVER = 'mqtt://localhost:1883';
const MQTT_SERVER = 'mqtt://test.mosquitto.org:1883';
console.log('Trying to connect to MQTT server at:', MQTT_SERVER);

const PLAYER_ID = 'Player';
const client = mqtt.connect(MQTT_SERVER, {
  clientId: PLAYER_ID,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000
});

// 訂閱的主題
const TOPICS = {
  ONLINE: 'game/online/hw12345',
  ACTION: 'battle/action/hw12345',
  STATUS: 'battle/status/hw12345'
};

// 遊戲狀態
let isBossOnline = false;
let isGameOver = false;

// === 請實作這裡(以下) ===
// 1. 連線至 MQTT broker 的事件處理
client.on('connect', () => {
  console.log(`${PLAYER_ID} 已連線至 MQTT broker\n`);
  
  // 訂閱 Boss 上線通知
  client.subscribe(TOPICS.ONLINE);
  
  // 訂閱 Boss 狀態更新
  client.subscribe(TOPICS.STATUS);
  
  // 發布玩家上線通知
  client.publish(TOPICS.ONLINE, JSON.stringify({
    id: PLAYER_ID,
    online: true
  }));
  
  // 讓我們嘗試主動發送一次攻擊
  setTimeout(attackBoss, 2000);
});

// 2. 接收訊息的事件處理
client.on('message', (topic, message) => {
  const messageStr = message.toString();
  
  // 處理 Boss 上線/離線
  if (topic === TOPICS.ONLINE) {
    const data = JSON.parse(messageStr);
    
    // 忽略自己的上線消息
    if (data.id === PLAYER_ID) return;
    
    // 如果 Boss 上線，開始攻擊
    if (data.id === 'Boss' && data.online && !isBossOnline) {
      console.log('對方玩家在線，遊戲開始！');
      isBossOnline = true;
      attackBoss();
    }
  }
  
  // 處理 Boss 回應的狀態更新
  if (topic === TOPICS.STATUS) {
    const status = JSON.parse(messageStr);
    
    // 顯示當前回合資訊
    console.log(`[ 第 ${status.round} 回合 ]`);
    console.log(`Boss 受到 ${status.attacker} 的攻擊，損失 ${status.damage} HP，剩餘 HP：${status.remainingHealth}`);
    
    // 檢查是否擊敗 Boss
    if (status.gameOver) {
      console.log(`恭喜🎉🎉 ~~~ ${status.attacker} 攻擊成功，Boss 被擊敗 !!!`);
      isGameOver = true;
    } else {
      // 繼續攻擊
      setTimeout(attackBoss, 500);
    }
  }
});

// 3. 攻擊 Boss 的函數
function attackBoss() {
  // 如果遊戲已結束，不再攻擊
  if (isGameOver) return;
  
  // 發送攻擊動作
  const attackMsg = {
    id: PLAYER_ID,
    action: 'attack'
  };
  
  client.publish(TOPICS.ACTION, JSON.stringify(attackMsg));
}
// === 請實作這裡(以上) ===

// 程式關閉前的清理工作
process.on('SIGINT', () => {
  // 發布下線通知
  client.publish(TOPICS.ONLINE, JSON.stringify({
    id: PLAYER_ID,
    online: false
  }));
  
  setTimeout(() => {
    client.end();
    process.exit();
  }, 500);
}); 