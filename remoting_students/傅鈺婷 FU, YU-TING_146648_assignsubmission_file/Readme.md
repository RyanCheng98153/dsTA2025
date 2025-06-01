1. B
2. A
3. const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost; -> 對應到.proto 檔中的 package owlpost;）
4. string代表資料型別是字串，後面的數字代表每個欄位的編號
5. 回傳錯誤訊息"找不到該信件"
6. "咆嘯信已送達"
7. 在JavaScript讀取的時候會被轉為駝峰式（student_name會變成studentName），所以如果用 response.student_name 會讀不到，要用 response.studentName