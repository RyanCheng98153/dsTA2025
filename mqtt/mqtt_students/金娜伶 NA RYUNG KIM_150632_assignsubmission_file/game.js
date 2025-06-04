const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');

const BOSS_NAME = 'Boss';
let boss_hp = 5007;  // Boss 初始血量 보스 초기 체력
let round = 0;  // 回合計數器 라운드

client.on('connect', () => { //mqtt가 연결되면 실행
  console.log(`${BOSS_NAME} 已連線至 MQTT broker`);
  client.subscribe('battle/action'); //토픽 구독
  client.subscribe('battle/online');
});

// 구독해놓은 메시지가 들어오면 실행
client.on('message', (topic, message) => { 
  const msg = message.toString(); 

  if (topic === 'battle/online') { // 토픽이 online이면 
    if (msg.includes('online')) { // + 넘어온 메세지에 online이란 글자가 있으면 밑에 출력
      console.log('\n對方玩家在線，遊戲開始！');
    }
    return;
  }

  const action = JSON.parse(msg); // 메시지를 객체화
  //console.log(action);

  if (action.to === BOSS_NAME) { //action == player에서 보낸 attackInfo
    boss_hp -= action.damage;
    round++;  // 玩家攻擊後回合數加1
    console.log(`[ 第 ${round} 回合 ]`);
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
