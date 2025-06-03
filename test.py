import re

code = "// This is a test code [nl] console.log('Hello World'); // Another comment [nl] console.log('Test'); // Final comment [nl]"
code = re.sub(r'//.*?\[nl\]', '[nl]', code)

print(code)