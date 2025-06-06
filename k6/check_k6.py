import csv
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
    return code


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
                    if norm_stud_ans == sol:
                        result.append("Correct")
                        correct_counts[i] += 1
                    else:
                        result.append(norm_stud_ans)
                        # result.append(stud_ans)  # Output original answer if wrong

                writer.writerow([name] + result + ['Checked'])
                
            writer.writerow(['CorrectNum'] + correct_counts + [''])

# Example usage
check_answers("hw_k6.csv", "result_output.csv")
