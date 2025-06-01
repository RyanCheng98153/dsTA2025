1.B
2.A
3.const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;
4.string 表示字串型別；等號後的數字是欄位編號，用於序列化與相容性管理
5.若找不到信件，trackLetter 會回傳錯誤，內容含 grpc.status.NOT_FOUND 及 "找不到該信件"
6.若追蹤碼最後一碼為 4，信件狀態為 "咆嘯信已送達"
7.使用底線 _ 命名會導致編譯錯誤