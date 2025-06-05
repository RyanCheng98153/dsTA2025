import csv
import re
import difflib

import re

def normalize_code(code):
    # Normalize full-width colon
    code = code.replace('：', ':')

    # Remove comments from // to the first [nl]
    codelines = code.split('[nl]')
    code = ' '.join([line for line in codelines if not line.strip().startswith('//')])

    # Remove all semicolons
    code = code.replace(';', '')

    # Keep [nl] for now so we can split on it later
    lines = code.split('[nl]')

    cleaned_logs = []

    for line in lines:
        line = line.strip()
        # Match console.log with ' or " or ` (handle template strings)
        match = re.match(r"console\.log\((['\"`])(.*?)\1\)", line)
        if match:
            cleaned_logs.append(match.group(2))  # Extract content inside the quotes

    if cleaned_logs:
        cleaned_logs = [log.replace('\\n', '').replace('\n', '').replace(' ', '') for log in cleaned_logs]
        joined = ''.join(cleaned_logs)  # Remove newlines and spaces
        return f'console.log(`{joined}`)'  # Use backticks for template string with interpolation

    # If no logs matched, remove whitespace and return
    code = ''.join(code.split())
    code = code.replace('[nl]', '')
    code = code.replace('\n', '')
    code = code.replace('\\n', '')
    code = code.replace('"', "'")
    code = re.sub(r'const\s*\w+\s*=', 'constpayload=', code)
    code = re.sub(r'stringify\([^)]*\)', 'stringify(payload)', code)
    code = re.sub(r'\bmessage\b', 'msg', code)
    code = re.sub(r'\(\s*\w+\.round\b', '(roundInfo.round', code)
    code = re.sub(r'\(\s*\w+\.boss_hp\b', '(roundInfo.boss_hp', code)
    code = re.sub(r'\{\s*\w+\.round\b', '{roundInfo.round', code)
    code = re.sub(r'\{\s*\w+\.boss_hp\b', '{roundInfo.boss_hp', code)
    code = re.sub(r'`([^`]*)`', r'\1', code)
    code = re.sub(r'\$\{([^}]+)\}', r'\1', code)
    code = code.lower()
    # code = code.replace('{', '')
    # code = code.replace('}', '')

    # --- New part: sort dictionary keys in constpayload= {...} ---
    pattern = r'(constpayload=)\{([^}]+)\}'

    def sort_dict_keys(match):
        prefix = match.group(1)  # 'constpayload='
        dict_body = match.group(2)  # inside braces

        # Split key:value pairs by commas (simple split)
        pairs = [p.strip() for p in dict_body.split(',') if p.strip()]

        kv_list = []
        for pair in pairs:
            if ':' in pair:
                key, val = pair.split(':', 1)
                kv_list.append((key.strip(), val.strip()))
            else:
                kv_list.append((pair.strip(), ''))  # malformed fallback

        # Sort by key alphabetically
        kv_list.sort(key=lambda x: x[0])

        # Rebuild dictionary string
        sorted_dict_str = ','.join([f"{k}:{v}" for k, v in kv_list])

        return f"{prefix}{{{sorted_dict_str}}}"

    code = re.sub(pattern, sort_dict_keys, code)
    

    match = re.search(r'^.*?={', code)
    match = match.end() if match else -1
    if match >= 0 and match < 20:
        code = re.sub(r'^.*?={', 'constpayload={', code, count=1)

    return code

def check_logic_correctness(code):
    code = code.replace('[nl]', '').replace('\n', '').replace(' ', '')
    code = code.lower()
    return all([
        "if(topic==='battle/action')" in code or 'if(topic==="battle/action")' in code or 'if(topic==\'battle/action\')' in code or  'if(topic=="battle/action")' in code,
        'json.parse(msg)' in code,
        'round!==undefined' in code or 'round!=undefined' in code or "round!='undefined'" in code or 'round!="undefined"' in code,
        'boss_hp<=0' in code,
        # 'client.end()' in code
    ])
    
def normalize_spaces(s):
    # print(s.split())
    return ''.join(s.split())

def check_answers(csv_filename, result_filename):
    with open(csv_filename, newline='', encoding='utf-8') as csvfile:
        reader = list(csv.reader(csvfile))
        headers = reader[0]
        solution_row = reader[1][1:]  # Skip "solution"
        normalized_solution = [normalize_code(cell) for cell in solution_row]

        num_questions = len(normalized_solution)
        correct_counts = [0] * num_questions  # counts per column

        with open(result_filename, 'w', newline='', encoding='utf-8') as outfile:
            writer = csv.writer(outfile)
            writer.writerow(['name'] + headers[1:] + ['result'])
            writer.writerow(['solution'] + normalized_solution + [''])

            for row in reader[2:]:  # Student rows
                name = row[0]
                student_answers = row[1:]
                result = []

                for i, (stud_ans, sol) in enumerate(zip(student_answers, normalized_solution)):
                    norm_stud_ans = normalize_code(stud_ans)
                    # similarity = difflib.SequenceMatcher(None, norm_stud_ans, sol).ratio()
                    logic_correct = check_logic_correctness(norm_stud_ans)
                    
                    if sol in norm_stud_ans or (i == 2 and logic_correct):
                    # if similarity >= 0.9:
                        result.append("Correct")
                        correct_counts[i] += 1  # Increment count for this question
                    # Then in your logic:
                    elif (i == 1 
                        and norm_stud_ans == "client.publish('battle/action',json.stringify(payload))"
                        and all(part in normalize_spaces(sol) for part in ["from:player_name", "to:'boss'", "damage:attack_value"])):
                        result.append("Correct")
                        correct_counts[i] += 1
                    else:
                        result.append(norm_stud_ans)

                writer.writerow([name] + result + ['Checked'])

            # Write final row: counts of correct answers per question
            writer.writerow(['correctNum'] + correct_counts + [''])

# Example usage
check_answers("hw_mqtt.csv", "result_output.csv")
