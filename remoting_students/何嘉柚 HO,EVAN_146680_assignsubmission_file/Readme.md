1. B
2. A
3. 對應到 server 與 client 的第四行: const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;
4. string代表後面接的欄位的資料類型是字串，後面接的數字代表Field Number，用來序列/反序列化。
5. 查詢信件狀態(尾號 xxx) 找不到該信件  =>  callback func: code: grpc.status.NOT_FOUND, details: "找不到該信件"
6. 查詢信件狀態 (尾碼 xx4): 咆嘯信已送達
7. 底線會被自動轉成camelCase