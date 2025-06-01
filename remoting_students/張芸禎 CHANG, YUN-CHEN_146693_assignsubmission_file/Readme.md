1.B
2.A
3.const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;
4.string代表欄位的數據類型，等號後面的數字（如 = 1）代表欄位編號(次序)
5.返回預設值的空訊息（例如 LetterResponse 中所有欄位為空）。透過 Status 返回錯誤碼（如 NOT_FOUND）
6.尾號 4 對應特定狀態（如「已送達」或「特殊處理」），需在 Server 端實作此規則。
7.語法沒錯，但在轉換成 JavaScript / TypeScript / Python 物件時，會被轉為 camelCase，例如：
    pickup_code → pickupCode
    student_name → studentName