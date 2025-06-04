1. B
2. A
3. 在 server 和 client 端皆是透過 `const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;` 來設定
4. `string` 代表資料的資料型態，後面的數字代表的是「次序」，用來判別是哪個欄位。
5. 會回傳 `查詢信件狀態(尾號 <輸入的尾號>) 找不到該信件`，而在 server 端顯示的是 `查詢信件狀態 (尾碼 <輸入的尾號>): 信件不存在`，兩者皆為紅字的錯誤訊息。
6. "咆嘯信已送達"
7. 假設 .proto 中某一欄位名稱設定為 `student_name`，在程式碼中(例如 client.js)，我們無法透過 `student_name` 來存取該欄位，而是需要使用 `studentName` 來操作。表示 Protocol Buffers 會根據 JavaScript 的命名習慣(Camel Case) 進行轉換。
