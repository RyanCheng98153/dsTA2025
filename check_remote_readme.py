import csv
import re

def normalize_code(code):
    code = code.replace('：', ':')
    code = re.sub(r'//.*?\[nl\]', '[nl]', code)
    code = code.replace(';', '')
    lines = code.split('[nl]')
    cleaned_logs = []

    for line in lines:
        line = line.strip()
        match = re.match(r"console\.log\((['\"`])(.*?)\1\)", line)
        if match:
            cleaned_logs.append(match.group(2))

    if cleaned_logs:
        cleaned_logs = [log.replace('\\n', '').replace('\n', '').replace(' ', '') for log in cleaned_logs]
        joined = ''.join(cleaned_logs)
        return f'console.log(`{joined}`)'

    code = ''.join(code.split())
    code = code.replace('[nl]', '')
    code = code.replace('\n', '')
    return code

def check_answers(csv_filename, result_filename):
    with open(csv_filename, newline='', encoding='utf-8') as csvfile:
        reader = list(csv.reader(csvfile))
        headers = reader[0]
        solution_row = reader[1][1:]  # Skip "solution"

        # 用 | 分割每個欄位的多個答案，並正規化
        normalized_solution_groups = []
        for cell in solution_row:
            possible_answers = [normalize_code(ans.strip()) for ans in cell.split('|')]
            normalized_solution_groups.append(possible_answers)

        with open(result_filename, 'w', newline='', encoding='utf-8') as outfile:
            writer = csv.writer(outfile)
            writer.writerow(['name'] + headers[1:] + ['result'])
            writer.writerow(['solution'] + solution_row + [''])

            for row in reader[2:]:
                name = row[0]
                student_answers = row[1:]
                result = []

                for stud_ans, sol_group in zip(student_answers, normalized_solution_groups):
                    norm_stud_ans = normalize_code(stud_ans)
                    # 判斷學生答案是否包含任何一個標準答案
                    if any(sol in norm_stud_ans for sol in sol_group):
                        result.append("Correct")
                    else:
                        result.append(norm_stud_ans)

                writer.writerow([name] + result + ['Checked'])

# Example usage
check_answers("hw_remoting_readme_answer.csv", "result_output_readme.csv")
