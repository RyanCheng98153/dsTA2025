import os
import csv
import re

hw_dir = "./remoting_students"
readme_csv_path = "hw_remoting_readme_answer.csv"

solutions = [
    'B',
    'A',
    '四|4|constowlPostProto=grpc.loadPackageDefinition(packageDefinition).owlpost',
    '編號|field number|tag|欄位|序|Tag',
    '找不到|不存在',
    '咆嘯信已送達|"咆哮信已送達"',
    '沒|可以|camelcase|camelCase|Camelcase|CamelCase|駝峰式|pickupCode|不|底線|能執行|可行|合法|undefined|可能',
]

def parse_answers_from_content(content):
    # 把所有行合併成一個字串
    combined = '\n'.join(content)

    # 嘗試根據 1. 2. 3. ... 分段
    pattern = r'(?:^|\n)([1-7])\.\s*(.*?)\s*(?=\n[1-7]\.|$)'
    matches = re.findall(pattern, combined, re.DOTALL)

    if matches and len(matches) >= 1:
        # 如果有標號分段
        result = [''] * 7
        for num_str, ans in matches:
            index = int(num_str) - 1
            result[index] = ans.strip()
        return result
    else:
        # 如果沒有標號，就使用前 7 行
        lines = [line.strip() for line in content if line.strip()]
        while len(lines) < 7:
            lines.append('')
        return lines[:7]

with open(readme_csv_path, mode='w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    headers = ['name'] + [f'q{i}' for i in range(1, 8)]
    writer.writerow(headers)
    writer.writerow(['solution'] + solutions)

    for stud_dir in os.listdir(hw_dir):
        full_path = os.path.join(hw_dir, stud_dir)
        if not os.path.isdir(full_path):
            continue

        stud_name = stud_dir.split(' ')[0]
        readme_path = os.path.join(full_path, 'Readme.md')

        if not os.path.exists(readme_path):
            print(f"⚠️ {stud_name} is missing Readme.md")
            answers = [''] * 7
        else:
            with open(readme_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
                answers = parse_answers_from_content(lines)

        writer.writerow([stud_name] + answers)
