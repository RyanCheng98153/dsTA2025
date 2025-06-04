const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1884');

const PLAYER_NAME = 'Player';
const attack_value = 715;

client.on('connect', () => {
  console.log(`${PLAYER_NAME} 已連線至 MQTT broker\n`);

  // === 請實作這裡(以下) ===
  // 訂閱主題 'battle/action' 和 'battle/online'
  // 可參考 Game.js
  client.subscribe('battle/action');
  client.subscribe('battle/online');
  // === 請實作這裡(以上) ===
  // 發送玩家上線通知
  client.publish('battle/online', `online:${PLAYER_NAME}`);
});


client.on('message', (topic, message) => {
  const msg = message.toString();
  
  if (topic === 'battle/online' && msg.includes('online')) {
    // 輸出玩家對 Boss 造成的傷害
    console.log(`${PLAYER_NAME} 對 Boss 發起攻擊，造成 ${attack_value} 傷害`);
    
    // === 請實作這裡(以下) ===
    const BOSS_NAME = 'Boss';
    // 發送攻擊行動給 boss
    const action = {
      from : PLAYER_NAME,
      to : BOSS_NAME,
      damage : attack_value,
    };
    client.publish('battle/action', JSON.stringify(action));
    // 輸出攻擊行動
    console.log(`發送攻擊行動 : ${JSON.stringify(action)}`);
    // === 請實作這裡(以上) ===
    
    // 等待 Boss 回應回合數與血量 (不用寫)
  }

  // === 請實作這裡(以下) ===
  const BOSS_NAME = 'Boss';
  // 程式邏輯: (輔助用)
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //  if 主題是 battle/action :  (可參考 player.js 中 battle/online 怎麼判斷的)
  //    解析 Boss 傳來的回合數與血量 (請參考 Game.js 中 的 action JSON 解析，怎麼實作的)
  //    if 傳回來的回合數不等於 undefined :
  //      輸出內容: [ 回合 ${回合數} ]: Boss 剩餘血量 ${血量}
  //      if Boss 剩餘血量 <= 0 :
  //        輸出內容: 恭喜🎉🎉 ~~~ ${玩家名稱} 攻擊成功，Boss 被擊敗 !!!
  //        結束 MQTT 連線
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // 部分內容，可參考 Game.js 中的程式碼
  if (topic === 'battle/action'){
    const info = JSON.parse(msg);
    if (info.round !== undefined){
      console.log(`[ 第 ${info.round} 回合] : Boss 剩餘血量 ${info.boss_hp}`);
      if (info.boss_hp <= 0){
        console.log(`恭喜🎉🎉 ~~~ ${PLAYER_NAME} 攻擊成功，Boss 被擊敗 !!!`);
        client.end();
      } else {  // Boss 還活著
        console.log(`\nBoss仍然存活!`);
        setTimeout(()=>{
          const next_action = {
            from : PLAYER_NAME,
            to : BOSS_NAME,
            damage : attack_value,
          };
          client.publish('battle/action', JSON.stringify(next_action));
          console.log(`\n繼續攻擊！ 發送攻擊行動 : ${JSON.stringify(next_action)}`);
        }, 2000);  // 2秒後繼續攻擊
      }
    }
  }
  // === 請實作這裡(以上) ===
});

