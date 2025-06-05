const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');
// 讀終端指令
const readline = require('readline');

const PLAYER_NAME = 'Player';
const attack_value = 715;

// 建立 readline 介面，在終端可以使用鍵盤輸入
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let gameStarted = false;

client.on('connect', () => {
  console.log(`${PLAYER_NAME} 已連線至 MQTT broker\n`);

  // === 請實作這裡(以下) ===
  // 訂閱主題 'battle/action' 和 'battle/online'
  // 可參考 Game.js
  client.subscribe('battle/action');
  client.subscribe('battle/online');
  // === 請實作這裡(以上) ===

  client.publish('battle/online', `online:${PLAYER_NAME}`);
});

client.on('message', (topic, message) => {
  const msg = message.toString();
  
  // MQTT 是「訊息導向」的，不管誰發的，只要主題符合，你就會收到
  if (topic === 'battle/online') {
    // 輸出玩家對 Boss 造成的傷害
    console.log(`${PLAYER_NAME} 對 Boss 發起攻擊，造成 ${attack_value} 傷害`);
    
    // === 請實作這裡(以下) ===
    // 發布攻擊訊息給 Boss
    const attackMsg = {
      from: PLAYER_NAME,
      to: 'Boss',
      damage: attack_value
    };
    client.publish('battle/action', JSON.stringify(attackMsg));

    return; // 處理完上線訊息就結束這輪
    // === 請實作這裡(以上) ===
    
    // 等待 Boss 回應回合數與血量 (不用寫)
  }

  // === 請實作這裡(以下) ===
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
  // ✅ 如果是 Boss 回應的訊息
  if (topic === 'battle/action') {
    const action = JSON.parse(msg);
    
    //判斷是誰發出的action，因為也會收到自己的
    if (action.round !== undefined) {
      console.log(`\n[ 第 ${action.round} 回合 ]`);
      console.log(`Boss 受到 Player 的攻擊，損失 715 HP，剩餘 HP：${action.boss_hp}`);

      if (action.boss_hp <= 0) {
        console.log(`\n恭喜🎉🎉 ~~~ ${PLAYER_NAME} 攻擊成功，Boss 被擊敗 !!!`);
        client.end(); // 結束連線
      }
      else{
        promptAttack();
      }
    }
  }
  // === 請實作這裡(以上) ===
});

//不管輸入什麼只要按enter就會觸發
function promptAttack() {
  rl.question('', () => {
    const attackMsg = {
      from: PLAYER_NAME,
      to: 'Boss',
      damage: attack_value
    };
    console.log(`${PLAYER_NAME} 對 Boss 發起攻擊，造成 ${attack_value} 傷害`);
    client.publish('battle/action', JSON.stringify(attackMsg));
  });
}
