const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost");

const PLAYER_NAME = "Player";
const attack_value = 715;

client.on("connect", () => {
  console.log(`${PLAYER_NAME} 已連線至 MQTT broker\n`);

  // === 請實作這裡(以下) ===
  // 訂閱主題 'battle/action' 和 'battle/online'
  // 可參考 Game.js
  client.subscribe(["battle/action", "battle/online"]);
  // === 請實作這裡(以上) ===

  client.publish("battle/online", `online:${PLAYER_NAME}`);
});

client.on("message", (topic, message) => {
  const msg = message.toString();

  if (topic === "battle/online") {
    // 輸出玩家對 Boss 造成的傷害
    //console.log(`${PLAYER_NAME} 對 Boss 發起攻擊，造成 ${attack_value} 傷害`);

    // === 請實作這裡(以下) ===
    console.log(`Boss 在線，遊戲開始！`);
    const attack = {
      to: "Boss",
      damage: attack_value,
      from: PLAYER_NAME,
    };
    client.publish("battle/action", JSON.stringify(attack));
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
  if (topic === "battle/action") {
    try {
      const action = JSON.parse(msg);
      if (action.round !== undefined) {
        if (action.boss_hp <= 0) {
          action.boss_hp = 0;
        }

        console.log(
          `[ 第 ${action.round} 回合 ]: Boss 剩餘血量 ${action.boss_hp}`
        );

        if (action.boss_hp <= 0) {
          console.log(`恭喜🎉🎉 ~~~ ${PLAYER_NAME} 攻擊成功，Boss 被擊敗 !!!`);
          client.end();
          return;
        }

        // 持續攻擊直到勝利
        const nextAttack = {
          to: "Boss",
          damage: attack_value,
          from: PLAYER_NAME,
        };
        client.publish("battle/action", JSON.stringify(nextAttack));
      }
    } catch (e) {
      console.error("訊息解析錯誤:", e);
    }
  }
  // === 請實作這裡(以上) ===
});
