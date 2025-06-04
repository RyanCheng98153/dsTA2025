1.(B)
2.(A)
3.const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;
4.string 是datatype,等號後的數字是field tag，也就是唯一標識欄位，而非賦值操作。
5.查詢信件狀態(尾號 ) 找不到該信件。其特殊之處在於它使用了gRPC的錯誤處理系統，而非僅僅返回一個JavaScript錯誤。
6.咆嘯信已送達
7.依然可以正常運作