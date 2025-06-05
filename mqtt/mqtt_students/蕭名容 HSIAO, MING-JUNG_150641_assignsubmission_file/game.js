const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost");

const BOSS_NAME = "Boss";
let boss_hp = 5007; // Boss 初始血量
let round = 0; // 回合計數器

client.on("connect", () => {
  console.log(`${BOSS_NAME} 已連線至 MQTT broker`);
  client.subscribe("battle/action");
  client.subscribe("battle/online");
});

client.on("message", (topic, message) => {
  const msg = message.toString();
  if (topic === "battle/online") {
    if (msg.includes("online")) {
      console.log("\n對方玩家在線，遊戲開始！");
    }
    return;
  }

  const action = JSON.parse(msg);
  if (action.to === BOSS_NAME) {
    boss_hp -= action.damage;
    round++; // 玩家攻擊後回合數加1
    console.log(`[ 第 ${round} 回合 ]`);
    console.log(
      `${BOSS_NAME} 受到 ${action.from} 的攻擊，損失 ${action.damage} HP，剩餘 HP：${boss_hp}`
    );

    // 發送更新給玩家，告訴玩家這是第幾回合以及 Boss 剩餘多少血量
    const roundInfo = {
      round: round,
      boss_hp: boss_hp,
    };
    // 這裡將消息發送給 Player
    client.publish("battle/action", JSON.stringify(roundInfo));

    if (boss_hp <= 0) {
      console.log(`\n${BOSS_NAME} 被 ${action.from} 擊敗 !! Boss 哭泣 😭😭`);
      client.end(); // 結束 MQTT 連線
    }
  }
});
