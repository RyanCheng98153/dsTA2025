# for d in */; do unzip -d "$d" "$d"*.zip; done
for d in */; do 7z x "$d"*.7z -o"$d"; done
# for d in */; do unrar x "$d"*.rar "$d"; done