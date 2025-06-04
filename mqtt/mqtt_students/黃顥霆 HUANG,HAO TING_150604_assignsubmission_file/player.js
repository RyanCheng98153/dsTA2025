const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');

const PLAYER_NAME = 'Player';
const attack_value = 715;

client.on('connect', () => {
  console.log(`${PLAYER_NAME} 已連線至 MQTT broker\n`);

  // === 請實作這裡(以下) ===
  // 訂閱主題 'battle/action' 和 'battle/online'
  client.subscribe('battle/action');
  client.subscribe('battle/online');
  // === 請實作這裡(以上) ===

  client.publish('battle/online', `online:${PLAYER_NAME}`);
});

client.on('message', (topic, message) => {
  const msg = message.toString();
  
  if (topic === 'battle/online') {
    // 輸出玩家對 Boss 造成的傷害
    console.log(`${PLAYER_NAME} 對 Boss 發起攻擊，造成 ${attack_value} 傷害`);
    
    // === 請實作這裡(以下) ===
    // 組成一個 JSON 格式的攻擊訊息，包含攻擊者、對象及攻擊傷害，並發送給 'battle/action'
    const action = {
      from: PLAYER_NAME,
      to: 'Boss',
      damage: attack_value
    };
    client.publish('battle/action', JSON.stringify(action));
    // === 請實作這裡(以上) ===
    
    // 等待 Boss 回應回合數與血量 (不用寫)
  }

  // === 請實作這裡(以下) ===
  // 當收到 'battle/action' 主題的訊息時，解析 Boss 回傳的回合數與剩餘 HP，
  // 並依照回傳資料輸出狀態；若 Boss HP <= 0，則結束連線。
  if (topic === 'battle/action') {
    try {
      const roundInfo = JSON.parse(msg);
      // 收到回合資訊時才進行後續判斷
      if (roundInfo.round !== undefined) {
        console.log(`[ 回合 ${roundInfo.round} ]: Boss 剩餘血量 ${roundInfo.boss_hp}`);
        if (roundInfo.boss_hp <= 0) {
          console.log(`恭喜🎉🎉 ~~~ ${PLAYER_NAME} 攻擊成功，Boss 被擊敗 !!!`);
          //client.end();
        } else {
          // Boss 還未被擊敗，繼續發動下一次攻擊
          console.log(`${PLAYER_NAME} 對 Boss 發起攻擊，造成 ${attack_value} 傷害`);
          const action = {
            from: PLAYER_NAME,
            to: 'Boss',
            damage: attack_value
          };
          client.publish('battle/action', JSON.stringify(action));
        }
      }
    } catch (e) {
      console.error('無法解析訊息:', msg);
    }
  }
  // === 請實作這裡(以上) ===
});
