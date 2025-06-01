1. B  
2. A  
3. server 和 client 的第 4 行：const owlPostProto = grpc.loadPackageDefinition(...).owlpost  
4. string 代表字串，數字是欄位編號，用來讓 Protobuf 序列化資料時能壓縮又對得起來  
5. 回傳 NOT_FOUND，client 會顯示「查詢信件狀態(尾號 XXX) 找不到該信件」  
6. 咆嘯信已送達  
7. 不會錯，但會被轉成 camelCase，例如 pickup_code → pickupCode