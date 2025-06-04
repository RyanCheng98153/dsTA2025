1. B
2. A
3. const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;
4. string 表示欄位的資料型別是字串; 等號後面的數字是 protobuf 的欄位編號，用來在序列化資料時辨識欄位順序與內容。
5. 如果查不到信件，
   client 會顯示："查詢信件狀態(尾號 xxx) 找不到該信件" ;
   server terminal 則會印出："查詢信件狀態 (尾碼 xxx): 信件不存在"。
   這代表 server 是用 gRPC 的錯誤處理方式，回傳一個 NOT_FOUND 的錯誤，所以在 client 那邊會直接跳進錯誤處理。
   算是一個有特別變化的情況，不是單純顯示查不到，而是用錯誤機制來處理。
6. 咆嘯信已送達
7. 可以正常使用，但在轉譯成 JavaScript 時會自動轉為 camelCase 命名。
