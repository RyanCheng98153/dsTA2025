const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');

const PLAYER_NAME = 'Player';
const attack_value = 715;

function sendAttack() {
  console.log(`${PLAYER_NAME} 對 Boss 發起攻擊，造成 ${attack_value} 傷害`);
  const attackAction = {
    from: PLAYER_NAME,
    to: 'Boss',
    damage: attack_value
  };
  client.publish('battle/action', JSON.stringify(attackAction));
}

client.on('connect', () => {
  console.log(`${PLAYER_NAME} 已連線至 MQTT broker\n`);

  // === 請實作這裡(以下) ===
  // 訂閱主題 'battle/action' 和 'battle/online'
  // 可參考 Game.js
  
  client.subscribe('battle/action')
  client.subscribe('battle/online')
  // === 請實作這裡(以上) ===

  client.publish('battle/online', `online:${PLAYER_NAME}`);
});

client.on('message', (topic, message) => {
  const msg = message.toString();
  
  if (topic === 'battle/online') {
    // 初始攻擊
    sendAttack();
    // === 請實作這裡(以下) ===
    // 攻擊邏輯已移至 sendAttack() 函數
    // === 請實作這裡(以上) ===
    
    // 等待 Boss 回應回合數與血量 (不用寫)
  }

  // === 請實作這裡(以下) ===
  if (topic === 'battle/action') {
    try {
      // 解析 Boss 傳來的回合數與血量
      const roundInfo = JSON.parse(msg);
      
      if (roundInfo.round !== undefined) {
        console.log(`[ 回合 ${roundInfo.round} ]: Boss 剩餘血量 ${roundInfo.boss_hp}`);
        
        if (roundInfo.boss_hp <= 0) {
          console.log(`恭喜🎉🎉 ~~~ ${PLAYER_NAME} 攻擊成功，Boss 被擊敗 !!!`);
          client.end(); // 結束 MQTT 連線
        } else {
          // Boss 還活著，繼續攻擊
          setTimeout(sendAttack, 1000); 
        }
      }
    } catch (error) {
      console.error('解析 Boss 回應發生錯誤:', error);
    }
  }
  // === 請實作這裡(以上) ===
});

