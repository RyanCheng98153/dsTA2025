import os
import csv

hw_dir = "./remoting_students"
readme_csv_path = "hw_remoting_readme_answers.csv"

with open(readme_csv_path, mode='w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    # 標頭欄位：name, q1 ~ q7
    headers = ['name'] + [f'q{i}' for i in range(1, 8)]
    writer.writerow(headers)

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
                lines = [line.strip() for line in f.readlines() if line.strip()]
                # 只保留前 7 答，少的補空字串
                while len(lines) < 7:
                    lines.append('')
                answers = lines[:7]

        writer.writerow([stud_name] + answers)
