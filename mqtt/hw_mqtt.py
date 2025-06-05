import os
import csv

hw_dir = "./mqtt_students"
output_path = "hw_mqtt.csv"

# 固定輸出欄位
headers = ['name', 'player1', 'player2', 'player3']

solutions = [
    "solution",
"""
  client.subscribe('battle/action');
  client.subscribe('battle/online');
""".replace('\n', '[nl]'),
"""
    const payload = {
      from: PLAYER_NAME,
      to: 'Boss',
      damage: attack_value
    };
    client.publish('battle/action', JSON.stringify(payload));
""".replace('\n', '[nl]'),
"""
  if (topic === 'battle/action') {
    
    const roundInfo = JSON.parse(msg);
    if (roundInfo.round !== undefined) {
      console.log(`[ 回合 ${roundInfo.round} ]: Boss 剩餘血量 ${roundInfo.boss_hp}\n`);
      // 根據回合數和血量決定是否結束遊戲或繼續
      if (roundInfo.boss_hp <= 0) {
        console.log(`恭喜🎉🎉 ~~~ ${PLAYER_NAME} 攻擊成功，Boss 被擊敗 !!!`);
      }
      client.end(); // 結束 MQTT 連線
    }
  }
""".replace('\n', '[nl]'),
]

def extract_code_blocks(filepath):
    """回傳檔案中所有被 ==== 請完成實作 (以下) ==== 和 ==== 請完成實作 (以上) ==== 包起來的區塊清單"""
    if not os.path.exists(filepath):
        return []

    with open(filepath, mode='r', encoding="utf-8") as file:
        code_blocks = []
        read_flag = False
        current_block = []

        for line in file:
            if "=== 請實作這裡(以下) ===" in line:
                read_flag = True
                current_block = []
                continue
            elif "=== 請實作這裡(以上) ===" in line:
                read_flag = False
                code_blocks.append('[nl]'.join(current_block).strip())
                continue

            if read_flag:
                current_block.append(line)

        return code_blocks

with open(output_path, mode='w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(headers)
    writer.writerow(solutions)

    for stud_dir in os.listdir(hw_dir):
        full_path = os.path.join(hw_dir, stud_dir)
        if not os.path.isdir(full_path):
            continue

        stud_name = stud_dir.split(' ')[0]
        row_data = [stud_name]

        # --- player.js ---
        player_blocks = extract_code_blocks(os.path.join(full_path, 'player.js'))
        while len(player_blocks) < 3:
            player_blocks.append('')
        row_data.extend(player_blocks[:3])

        writer.writerow(row_data)
