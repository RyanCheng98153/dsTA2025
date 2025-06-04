1. (B)
2. (A)
3. const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost; 。在proto的package owlpost;
4. 用來儲存後面的文字字串。在二進為序列化的過程，不會直接儲存名字，而是用數字代替，也順便減少了空間浪費。
5. track方:查詢信件狀態(尾號 xxx) 找不到該信件。 Server方:會寫(尾碼 undefined): 信件不存在
6. 查詢信件狀態(尾號 xx4)：咆嘯信已送達
7. 還是可以使用的。但可能導致不同程式的語言的命名的風格不同。   