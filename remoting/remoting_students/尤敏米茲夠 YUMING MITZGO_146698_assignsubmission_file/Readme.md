1. B
2. A
3. 第3行
4. 代表該 field 的資料型別，數字代表 serialization 後對應 field 的相對位置
5. 會回傳"找不到該信件", gRPC 有內建的錯誤處理機制，對應到 grpc.status.NOT_FOUND，除了 NOT_FOUND，還有 UNKNOWN, INVALID_ARGUMENT 等等可以用
6. 查詢信件狀態(尾號 4) 找不到該信件
7. proto loader 對 javascript 默認本來就會把 snake_case 轉成 camelCase，但如果在protoLoader.loadSync 把 keepCase: true 就會報錯