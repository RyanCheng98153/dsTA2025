// 引入 MQTT 套件並連線到本機的 MQTT Broker
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');

// 設定參數
const BOSS_NAME = 'Boss';
let boss_hp = 5007;  // Boss 初始血量
let round = 0;  // 回合計數器

// 當連上 broker 時，訂閱兩個 topic
client.on('connect', () => {
  console.log(`${BOSS_NAME} 已連線至 MQTT broker`);
  client.subscribe('battle/action');
  client.subscribe('battle/online');
});

// 當有任一訂閱的 topic 收到訊息，就會觸發這段
client.on('message', (topic, message) => {
  // 將收到的訊息轉成字串
  const msg = message.toString();
  // 如果收到的是 battle/online 的 topic，而且訊息是 "online"
  // 顯示玩家已連線，並提示遊戲開始
  if (topic === 'battle/online') {
    if (msg.includes('online')) {
      console.log('\n對方玩家在線，遊戲開始！');
    }
    return;
  }

  // 將攻擊訊息轉成 JSON 格式的物件
  const action = JSON.parse(msg);
  // 確認這個攻擊是打給 Boss（因為可能有多名玩家、多個 Boss）
  if (action.to === BOSS_NAME) {
    boss_hp -= action.damage;
    round++;  // 玩家攻擊後回合數加1
    console.log(`\n[ 第 ${round} 回合 ]`);
    console.log(`${BOSS_NAME} 受到 ${action.from} 的攻擊，損失 ${action.damage} HP，剩餘 HP：${boss_hp}`);

    // 發送更新給玩家，告訴玩家這是第幾回合以及 Boss 剩餘多少血量
    const roundInfo = {
      round: round,
      boss_hp: boss_hp
    };
    
    // 這裡將消息發送給 Player
    client.publish('battle/action', JSON.stringify(roundInfo));

    if (boss_hp <= 0) {
      console.log(`\n${BOSS_NAME} 被 ${action.from} 擊敗 !! Boss 哭泣 😭😭`);
      client.end(); // 結束 MQTT 連線
    }
  }

});
