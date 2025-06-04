1. B
2. A
3. 第4⾏
4. string代表文字字串的資料型態，接數字是代表欄位的編號，protobuf傳輸時作為識別用
5. 在server會回傳"查詢信件狀態 (尾碼 {末三碼}): 信件不存在"，而在track會回傳err.details，顯示為"查詢信件狀態(尾號 {末三碼}) 找不到該信件"
6. "咆嘯信已送達"
7. 可以在proto使用底線命名，但在JavaScript呼叫時需要改成camelCase