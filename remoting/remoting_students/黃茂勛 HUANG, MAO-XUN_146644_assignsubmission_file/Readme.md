1. B
2. A
3. client與sever中的第4行: "const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;"
4. string： 表示一個文字字串的資料型別，用來儲存文字資料。等號後的數字：為「欄位編號」（field number），在二進位序列化格式中用來唯一標識每個欄位，這些數字對應到每個欄位，並在序列化與反序列化時發揮關鍵作用。
5. 該函式會利用 gRPC 的錯誤機制來回傳一個錯誤物件 "{ code: grpc.status.NOT_FOUND, details: "找不到該信件"}"，並且使用 callback(error) 的方式來回傳錯誤，表示查詢失敗
6. "咆嘯信已送達"
7. 如果在型別命名時使用底線，雖然不會導致編譯錯誤，但生成程式碼時（例如 Java、Go 或 C++ 等語言的對應類型）會自動將這些名稱轉換成CamelCase命名，這可能導致在 proto 中定義的名稱與最終產生的程式碼中的名稱不一致，進而引起混淆或命名上的意外衝突。