import os
import csv

hw_dir = "./remoting_students"
output_path = "hw_remoting.csv"

# 固定輸出欄位
headers = ['name', 'server1', 'server2', 'client1', 'proto1', 'proto2', 'proto3']

def extract_code_blocks(filepath):
    """回傳檔案中所有被 ==== 請完成實作 (以下) ==== 和 ==== 請完成實作 (以上) ==== 包起來的區塊清單"""
    if not os.path.exists(filepath):
        return []

    with open(filepath, mode='r', encoding="utf-8") as file:
        code_blocks = []
        read_flag = False
        current_block = []

        for line in file:
            if "==== 請完成實作 (以下) ====" in line:
                read_flag = True
                current_block = []
                continue
            elif "==== 請完成實作 (以上) ====" in line:
                read_flag = False
                code_blocks.append('\n'.join(current_block).strip())
                continue

            if read_flag:
                current_block.append(line)

        return code_blocks

with open(output_path, mode='w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(headers)

    for stud_dir in os.listdir(hw_dir):
        full_path = os.path.join(hw_dir, stud_dir)
        if not os.path.isdir(full_path):
            continue

        stud_name = stud_dir.split(' ')[0]
        row_data = [stud_name]

        # --- server.js ---
        server_blocks = extract_code_blocks(os.path.join(full_path, 'server.js'))
        while len(server_blocks) < 2:
            server_blocks.append('')
        row_data.extend(server_blocks[:2])

        # --- client.js ---
        client_blocks = extract_code_blocks(os.path.join(full_path, 'client.js'))
        row_data.append(client_blocks[0] if len(client_blocks) > 0 else '')

        # --- owl_post.proto ---
        proto_blocks = extract_code_blocks(os.path.join(full_path, 'owl_post.proto'))
        while len(proto_blocks) < 3:
            proto_blocks.append('')
        row_data.extend(proto_blocks[:3])

        writer.writerow(row_data)
