const mqtt = require('mqtt');

// MQTT 連線設定
// const MQTT_SERVER = 'mqtt://localhost:1883';
const MQTT_SERVER = 'mqtt://test.mosquitto.org:1883';
console.log('Game trying to connect to MQTT server at:', MQTT_SERVER);

const GAME_ID = 'Boss';
const client = mqtt.connect(MQTT_SERVER, {
  clientId: GAME_ID,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000
});

// 遊戲設定
const INIT_HEALTH = 5000;
let gameHealth = INIT_HEALTH;
let round = 0;
let isGameStarted = false;

// 訂閱的主題
const TOPICS = {
  ONLINE: 'game/online/hw12345',
  ACTION: 'battle/action/hw12345',
  STATUS: 'battle/status/hw12345'
};

// 連線至 MQTT broker
client.on('connect', () => {
  console.log(`${GAME_ID} 已連線至 MQTT broker\n`);

  // 訂閱玩家上線通知
  client.subscribe(TOPICS.ONLINE);
  
  // 訂閱玩家攻擊主題
  client.subscribe(TOPICS.ACTION);
  
  // 回應目前在線狀態
  client.publish(TOPICS.ONLINE, JSON.stringify({
    id: GAME_ID,
    online: true
  }));
});

// 訊息處理
client.on('message', (topic, message) => {
  const messageStr = message.toString();
  
  // 處理玩家上線/離線
  if (topic === TOPICS.ONLINE) {
    handlePlayerStatus(messageStr);
  }
  
  // 處理玩家攻擊動作
  if (topic === TOPICS.ACTION) {
    handlePlayerAction(messageStr);
  }
});

// 處理玩家上線/離線邏輯
function handlePlayerStatus(messageStr) {
  try {
    const data = JSON.parse(messageStr);
    
    if (data.id === GAME_ID) return;
    
    if (data.online && !isGameStarted) {
      console.log('對方玩家在線，遊戲開始！');
      isGameStarted = true;
    }
  } catch (err) {
    console.error('解析玩家狀態訊息錯誤:', err);
  }
}

// 處理玩家攻擊動作
function handlePlayerAction(messageStr) {
  try {
    const data = JSON.parse(messageStr);
    
    if (data.id === GAME_ID) return;
    
    if (data.action === 'attack') {
      // 計算傷害 (500-1000之間的隨機值)
      const damage = Math.floor(Math.random() * 501) + 500;
      gameHealth -= damage;
      round++;
      
      // 顯示當前回合資訊
      const roundInfo = `[ 第 ${round} 回合 ]`;
      console.log(roundInfo);
      
      // 構建回合狀態訊息
      const statusMsg = {
        id: GAME_ID,
        round: round,
        attacker: data.id,
        damage: damage,
        remainingHealth: Math.max(0, gameHealth)
      };
      
      // 顯示遊戲訊息
      if (gameHealth <= 0) {
        console.log(`${GAME_ID} 受到 ${data.id} 的攻擊，損失 ${damage} HP，剩餘 HP：0`);
        console.log(`${GAME_ID} 被 ${data.id} 擊敗 !! ${GAME_ID} 哭泣 😭😭`);
        
        // 發布最終回合狀態
        statusMsg.gameOver = true;
        client.publish(TOPICS.STATUS, JSON.stringify(statusMsg));
        
        // 重置遊戲狀態
        setTimeout(() => {
          gameHealth = INIT_HEALTH;
          round = 0;
          isGameStarted = false;
        }, 3000);
      } else {
        console.log(`${GAME_ID} 受到 ${data.id} 的攻擊，損失 ${damage} HP，剩餘 HP：${gameHealth}`);
        
        // 發布當前回合狀態
        client.publish(TOPICS.STATUS, JSON.stringify(statusMsg));
      }
    }
  } catch (err) {
    console.error('解析玩家攻擊訊息錯誤:', err);
  }
}

// 程式關閉前的清理工作
process.on('SIGINT', () => {
  // 發布下線通知
  client.publish(TOPICS.ONLINE, JSON.stringify({
    id: GAME_ID,
    online: false
  }));
  
  setTimeout(() => {
    client.end();
    process.exit();
  }, 500);
}); 