1. B
2. A
3. const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;在server跟client都一樣
4. string 是字串/文字的資料類型；等號後數字是標籤，用來將資料轉換成二進位格式（序列化）。
5. 會回傳錯誤訊息 "查詢信件狀態(尾號 xxx) 找不到該信件"，在 console "查詢信件狀態 (尾碼 xxx): 信件不存在"
6. 咆嘯信已送達
7. 將response改成有'_',response結果：
查詢信件狀態(尾號 016):undefined
學生: undefined
學院: undefined
可能是因為在JavaScript是Camel Case,轉換間會出現問題