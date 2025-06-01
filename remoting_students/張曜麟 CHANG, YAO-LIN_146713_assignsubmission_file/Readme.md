1. B
2. A
3. // 建立 gRPC 伺服器
    const server = new grpc.Server();
    server.addService(owlPostProto.OwlPost.service, { sendLetter, trackLetter });
4. string 代表資料格式是字串；等號後面接的數字只是代表其順序。
5. 會顯示"查詢信件狀態(尾號 xxx) 找不到該信件"，尾號 xxx 會隨著搜尋的尾號變化。
6. 會顯示"咆嘯信已送達"
7. RPC 方法與訊息類型官方建議用 CamelCase（例如 sendLetter），欄位名稱建議用 lower_snake_case（例如 tracking_id），
   使用底線命名不會導致編譯錯誤，但它會在不同語言的生成程式碼中觸發自動命名轉換，
   可能引起混淆或錯誤存取的問題，導致發生呼叫不到正確方法或找不到屬性的狀況。