const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');

const PLAYER_NAME = 'Player';
const attack_value = 715;

client.on('connect', () => {
  console.log(`${PLAYER_NAME} 已連線至 MQTT broker\n`);

  // === 請實作這裡(以下) ===
  
  client.subscribe('battle/action');
  client.subscribe('battle/online'); 

  // === 請實作這裡(以上) ===

  // 發佈上線通知，這通常會觸發 Boss 的 "遊戲開始" 訊息
  client.publish('battle/online', `online:${PLAYER_NAME}`);

  // --- 考慮在這裡發起第一次攻擊 ---
  // 許多遊戲循環會在連接並宣告上線後，立即發動第一次攻擊，
  // 而不是等待 'battle/online' 的訊息回顯。
  // 如果作業要求是在收到 'battle/online' 訊息後才攻擊，則保持原樣。
  // 如果希望連接後立即攻擊，可以取消下面這段註解：
  /* 
  console.log(`${PLAYER_NAME} 對 Boss 發起初次攻擊，造成 ${attack_value} 傷害`);
  const initialAttack = {
      to: 'Boss',
      from: PLAYER_NAME,
      damage: attack_value
  };
  client.publish('battle/action', JSON.stringify(initialAttack));
  */
  // --- 第一次攻擊考慮結束 ---
});

client.on('message', (topic, message) => {
  const msg = message.toString();
  
  // 處理來自 'battle/online' 的訊息 (如果有的話，通常是 Boss 的歡迎訊息，但此例中似乎用來觸發第一次攻擊)
  if (topic === 'battle/online') { 
    // 按照你原來的邏輯，收到 battle/online 訊息時發動攻擊
    // (注意：這可能意味著 Boss 需要發送一條訊息到 battle/online 來觸發玩家)
    // 或者，如果上面連接後立即攻擊的邏輯被啟用，這個 if 區塊可能就不需要發動攻擊了。
    // 為了保持與你原始碼相似的邏輯，暫且保留攻擊觸發：
    console.log(`(收到 ${topic} 訊息後) ${PLAYER_NAME} 對 Boss 發起攻擊，造成 ${attack_value} 傷害`);
    
    // === 請實作這裡(以下) ===
    const attackAction = {
      to: 'Boss',         
      from: PLAYER_NAME,  
      damage: attack_value 
    };
    client.publish('battle/action', JSON.stringify(attackAction));
    // === 請實作這裡(以上) ===
  } 
  // 處理來自 'battle/action' 的訊息 (Boss 的狀態更新 或 自己的攻擊回顯)
  
  // === 請實作這裡(以下) ===
  if (topic === 'battle/action') { 
    try {
      const receivedData = JSON.parse(msg); // 使用更通用的名稱

      // 檢查是否是 Boss 的狀態更新訊息 (包含 round 和 boss_hp)
      if (receivedData.round !== undefined && receivedData.boss_hp !== undefined) {
        // === 變數定義 ===
        const currentRound = receivedData.round;
        const bossCurrentHp = receivedData.boss_hp;

        // === 使用變數的程式碼，現在位於正確的作用域內 ===
        console.log(`[ 第 ${currentRound} 回合 ]: Boss 剩餘血量 ${bossCurrentHp}`);

        if (bossCurrentHp <= 0) {
          // Boss 被擊敗
          console.log(`\n恭喜🎉🎉 ~~~ ${PLAYER_NAME} 攻擊成功，Boss 被擊敗 !!!`);
          client.end(); // 結束 MQTT 連線
        } else {
          // Boss 還活著，發動下一次攻擊
          console.log(`\n${PLAYER_NAME} 對 Boss 發起攻擊，造成 ${attack_value} 傷害`);
          const nextAttackAction = {
            to: 'Boss',
            from: PLAYER_NAME,
            damage: attack_value
          };
          client.publish('battle/action', JSON.stringify(nextAttackAction));
        }
        // === 使用變數的程式碼結束 ===

      } 
      // else: 如果收到的訊息不是 Boss 的狀態更新格式 (例如，是自己的攻擊回顯)，則忽略它。
      // 你也可以在這裡加個 console.log 來觀察收到了什麼非預期訊息：
      // else {
      //   console.log("收到非 Boss 狀態更新訊息:", receivedData);
      // }

    } catch (error) {
      // JSON 解析失敗或其他處理錯誤
      console.error("處理 'battle/action' 訊息時發生錯誤:", msg, error); 
    }
  }
  // === 請實作這裡(以上) ===
});