1. B
2. A
3. const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;
4. string 是資料型別，代表文字字串，等號後的數字是 field number欄位順序
5. callback({
    code: grpc.status.NOT_FOUND,
    details: "找不到該信件"
});
Client 端收到時會在 err 中取得錯誤訊息，可以從 err.details 顯示 "找不到該信件"
6."咆嘯信已送達"
7. 不會報錯