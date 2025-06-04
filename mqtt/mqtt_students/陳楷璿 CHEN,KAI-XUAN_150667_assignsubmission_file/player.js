const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost')

const PLAYER_NAME = 'Player'
const attack_value = 715

client.on('connect', () => {
  console.log(`${PLAYER_NAME} 已連線至 MQTT broker\n`)

  // === 請實作這裡(以下) ===
  // 訂閱主題 'battle/action' 和 'battle/online'
  // 可參考 Game.js
  client.subscribe('battle/action')
  client.subscribe('battle/online')
  // === 請實作這裡(以上) ===

  client.publish('battle/online', `online:${PLAYER_NAME}`)
})

client.on('message', (topic, message) => {
  const msg = message.toString()

  const action = {
    from: PLAYER_NAME,
    to: 'Boss',
    damage: attack_value,
  }
  if (topic === 'battle/online') {
    // 輸出玩家對 Boss 造成的傷害
    console.log(`${PLAYER_NAME} 對 Boss 發起攻擊，造成 ${attack_value} 傷害`)

    // === 請實作這裡(以下) ===
    client.publish('battle/action', JSON.stringify(action))
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

  if (topic === 'battle/action') {
    const roundInfo = JSON.parse(msg)

    if (roundInfo.round !== undefined) {
      console.log(
        `[ 回合 ${roundInfo.round} ]: Boss 剩餘血量 ${roundInfo.boss_hp} ]`
      )

      if (roundInfo.boss_hp <= 0) {
        console.log(`\n恭喜🎉🎉 ~~~ ${PLAYER_NAME} 攻擊成功，Boss 被擊敗 !!!`)
        client.end() // 結束連線
      } else {
        setTimeout(() => {
          client.publish('battle/online', JSON.stringify(action))
        }, 1000)
      }
    }
  }
  // 部分內容，可參考 Game.js 中的程式碼

  // === 請實作這裡(以上) ===
})
