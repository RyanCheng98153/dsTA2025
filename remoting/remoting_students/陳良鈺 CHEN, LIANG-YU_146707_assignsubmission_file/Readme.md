1.B
2.A
3.第四行，const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;
4.string 為資料型態，而後方的數字是編號(tag number)
5.查詢信件狀態 (尾碼 xxx): 信件不存在 
6.查詢信件狀態 (尾碼 114): 咆嘯信已送達
7.在某些語言中(像是javascript)，會自動將底線轉換為駝峰式命名，例如pickup_code會直接轉為pickupCode，因此在proto中直接用駝峰式命名的慣例比較好一點