const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');

const PLAYER_NAME = 'Player';
const attack_value = 715;

client.on('connect', () => { //mqtt가 연결되면 실행
  console.log(`${PLAYER_NAME} 已連線至 MQTT broker\n`);

  // === 請實作這裡(以下) ===
  // 訂閱主題 'battle/action' 和 'battle/online'
  // 可參考 Game.js

  // 연결되면 토픽 2개 구독
  client.subscribe('battle/action');
  client.subscribe('battle/online');
  
  // === 請實作這裡(以上) ===

  //그리고나서 online 채널로 메세지 전송
  client.publish('battle/online', `online:${PLAYER_NAME}`);
});

client.on('message', (topic, message) => {
  const msg = message.toString();
  
  if (topic === 'battle/online') {
    // 輸出玩家對 Boss 造成的傷害
    console.log(`${PLAYER_NAME} 對 Boss 發起攻擊，造成 ${attack_value} 傷害`);
    
    // === 請實作這裡(以下) ===

    const attackInfo = { // 실제 공격 넣는 부분
      to : 'Boss',
      damage : attack_value,
      from : PLAYER_NAME
    };

    client.publish('battle/action', JSON.stringify(attackInfo))

  
    // === 請實作這裡(以上) ===
    
    // 等待 Boss 回應回合數與血量 (不用寫)
  }

  // === 請實作這裡(以下) ===
  
  // 程式邏輯: (輔助用)
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //  if 主題是 battle/action :  (可參考 player.js 中 battle/online 怎麼判斷的)
  //    解析 Boss 傳來的回合數與血量 (請參考 Game.js 中 的 action JSON 解析，怎麼實作的) 보스가 보내온 라운드 수랑 체력을 해석?
  //    if 傳回來的回合數不等於 undefined :
  //      輸出內容: [ 回合 ${回合數} ]: Boss 剩餘血量 ${血量}
  //      if Boss 剩餘血量 <= 0 :
  //        輸出內容: 恭喜🎉🎉 ~~~ ${玩家名稱} 攻擊成功，Boss 被擊敗 !!!
  //        結束 MQTT 連線
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // 部分內容，可參考 Game.js 中的程式碼

  if (topic === 'battle/action'){
    const action = JSON.parse(msg);
    //console.log(action);
  
    if(action.round != undefined){
      console.log(`[ 回合 ${action.round} ]: Boss 剩餘血量 ${action.boss_hp}`)
      if(action.boss_hp <= 0){
        console.log(`恭喜🎉🎉 ~~~ ${PLAYER_NAME} 攻擊成功，Boss 被擊敗 !!!`)
      }
    }

  }

  // === 請實作這裡(以上) ===
});

