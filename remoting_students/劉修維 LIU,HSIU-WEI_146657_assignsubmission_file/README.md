1. B
2. A
3. const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;
4. string是資料型別，代表這個欄位的值是字串，後面的數字叫做field number，每個欄位都要指定一個唯一的數字
5. ex : 跑node track.js 391，跑node track.js這個終端顯示 : 查詢信件狀態(尾號 391) 找不到該信件跑node server.js的終端顯示 : 查詢信件狀態 (尾碼 391): 信件不存在
6. "咆嘯信已送達"，因為status: letter_status[tracking_id.slice(-1)]，讓status為letter_status[tracking_id的最後一碼] = letter_status[4]
7. 技術上可以，但不建議使用，因為不同語言會依照語言的命名慣例自動轉換成不同形式，例如JavaScript/Node.js : student_name → studentName（camelCase）