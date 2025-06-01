1. B
2. A
3. 在 client 和 server 中對應到 const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;
4. string 代表資料型別，等號後的數字是 filed tag，代表訊息欄位的唯一編號，在 Protobuf 的二進位編碼中用來識別欄位。
5. 若是找不到信件，則會回傳 查詢信件狀態(尾號 005) 找不到該信件
6. 若是最後一碼為 4 ，其回傳 查詢信件狀態(尾號 034)：咆嘯信已送達
7. 在 js 中不會發生任何事，執行上也沒問題。