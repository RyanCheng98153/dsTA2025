1. B
2. A
3. 在 server 對應到的是 `const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;` ，在這裡載入 package；在 client 中對應到的也是 `const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;`。
4. 代表這個欄位的資料型態是 string。等號後接的數字是欄位名稱的識別碼，可以節省傳輸。
5. 找不到對應信件時會回傳錯誤 code：grpc.status.NOT_FOUND 和 detail：找不到該信件。反之，如果找到時是回傳找到的信件資訊。
6. 咆嘯信已送達
7. 改成底線命名（snakecase）不會有任合問題，不過在 javascript 的程式碼仍然要用 camelCase。舉例來說，proto 中定義為 student_name，在 javascript 中要用 studentName。