1. B
2. A
3. const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost; 其中後面的.owlpost 的部分
4. string 是一種文字資料型態，等號後的數字是 field number，用來標記序列化順序
5. 若找不到信件，會回傳錯誤訊息：NOT_FOUND，並顯示「找不到該信件」，server 端會記錄 log，印出"查詢信件狀態 (尾碼 XXX): 信件不存在"
6. "咆嘯信已送達"
7. 會被轉換成駝峰式命名，如: tracking_id -> trackingId，若 server 或 client 端沒有使用駝峰式命名會出錯
