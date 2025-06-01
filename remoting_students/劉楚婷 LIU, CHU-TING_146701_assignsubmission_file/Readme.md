1. B
2. A
3. 對應到 server 和 client 的第4行，const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;
4. string 表示數據類型是字串，等號後面接的數字是設置 field number
5. 會回傳「查詢信件狀態(尾號 xxx) 找不到該信件」。xxx會是查詢的號碼
6. 咆嘯信已送達
7. 將 proto 中的命名使用底線，並且在 server、client、trace 相對應的變數設置成有底線、與 proto 命名相符的版本，還是有正常運作