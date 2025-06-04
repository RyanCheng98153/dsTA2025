input_dir="./remoting_students"
for d in "$input_dir"/*/; do unzip -d "$d" "$d"*.zip; done
for d in "$input_dir"/*/; do 7z x "$d"*.7z -o"$d"; done
for d in "$input_dir"/*/; do unrar x "$d"*.rar "$d"; done
