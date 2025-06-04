1. B

2. A

3. 在 client 與 server 的第 4 行，程式碼是：const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;

4. string 代表字串，等號後的數字是用來定義在資料序列化時辨識欄位（Protocol Buffers 的欄位 tag）

5. 如果尾號 123 的信件不存在，則 server 端會印出"查詢信件狀態 (尾碼 123): 信件不存在"，並回傳給 client 端："查詢信件狀態(尾號 123) 找不到該信件"

6. "咆嘯信已送達"

7. 如果使用底線命名為 "student_name" ，在 JavaScript 中會轉換成 "studentName"