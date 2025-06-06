import os
import csv

hw_dir = "./k6_students"
output_path = "hw_k6.csv"

# 固定輸出欄位
headers = ['name', 'basic', 'explode', 'ramping']

solutions = [
    'solution',
"""
  vus: 100,
  duration: '10s',
""".replace('\n', ' '),
"""
  vus: 5000,
  duration: '5s',
""".replace('\n', ' '),
"""
    { duration: '2s', target: 400 },
    { duration: '2s', target: 800 },
    { duration: '2s', target: 1200 },
    { duration: '2s', target: 1600 },
    { duration: '2s', target: 2000 },
    { duration: '2s', target: 2400 },
""".replace('\n', ' ')
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
            if "請實作以下內容" in line:
                read_flag = True
                current_block = []
                continue
            elif "請實作以上內容" in line:
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

        # --- basic.js ---
        basic_blocks = extract_code_blocks(os.path.join(full_path, 'client-basic.js'))
        row_data.append(basic_blocks[0] if len(basic_blocks) > 0 else '')

        # --- explode.js ---
        explode_blocks = extract_code_blocks(os.path.join(full_path, 'client-explode.js'))
        row_data.append(explode_blocks[0] if len(explode_blocks) > 0 else '')

        # --- ramping.js ---
        ramping_blocks = extract_code_blocks(os.path.join(full_path, 'client-ramping.js'))
        row_data.append(ramping_blocks[0] if len(ramping_blocks) > 0 else '')

        writer.writerow(row_data)
