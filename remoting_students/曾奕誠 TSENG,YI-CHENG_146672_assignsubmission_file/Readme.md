(B) HTTP/2
(A) 定義 API 介面與訊息格式
4
string 是一種 資料型別，代表 UTF-8 編碼的字串。等號後面的數字是 tag number，用於訊息序列化時區分欄位
通常會回傳一個 特定的錯誤訊息 或 空的狀態資料。
若實作中有使用 gRPC 的錯誤處理機制（例如 NOT_FOUND），就會：回傳 status code = NOT_FOUND 附帶錯誤訊息（如：Letter not found）在客戶端收到時，會觸發 error callback，這是一個跟 HTTP 相似但更嚴謹的錯誤傳遞方式
信件不存在