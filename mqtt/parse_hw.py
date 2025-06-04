import os
import csv

hw_dir = "./mqtt_students"
target_file = "game.js"

for stud_dir in os.listdir(hw_dir):
    stud_name = stud_dir.split(' ')[0]
    # print(stud_dir)
    
    if not os.path.isdir(os.path.join(hw_dir, stud_dir)):
        continue
    
    stud_dir = hw_dir + "/" + stud_dir
    
    if stud_dir + target_file in os.listdir(stud_dir):
        continue
    
    need_move = False
    
    # for directory in stud_dir, if server.js is in the directory, then print it
    for directory in os.listdir(stud_dir):
        filename = os.path.join(stud_dir, directory, target_file)
        dirname = os.path.join(stud_dir, directory)
        if os.path.isfile(filename):
            need_move = True
            # print(f"Found {target_file} in {directory} for student {stud_name}")
        break
    
    if not need_move:
        continue
    
    if os.path.exists(dirname):
        print(f"Directory {dirname} exists.")
        
        # move the files in directory to the parent directory
        for filename in os.listdir(dirname):
            src = os.path.join(dirname, filename)
            dst = os.path.join(stud_dir, filename)
            os.rename(src, dst)
            print(f"Moved {src} to {dst}")
        