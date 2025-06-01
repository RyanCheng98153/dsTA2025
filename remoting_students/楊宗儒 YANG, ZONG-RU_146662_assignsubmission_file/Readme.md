1. B
2. A
3. server.js與client.js中的const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;，代表load namespace中所有packages後找package=owlpost。
4. string代表以Protocol Buffer方式Encoding的Message中Tag的Type欄位；數字代表解碼次序，decoding時可以透過map .proto檔案來還原變數名稱
5. server端: 查詢信件狀態 (尾碼 pickup_code): 信件不存在；client端: 查詢信件狀態(尾號 pickup_code) 找不到該信件
6. 咆嘯信已送達
7. 當在proto檔中用"_"進行變數命名時，若是 string ho_use = 1，不論是client端還是server端的js檔皆要用hoUse才能抓到。結論:可以使用，但要注意不同語言的慣用命名風格