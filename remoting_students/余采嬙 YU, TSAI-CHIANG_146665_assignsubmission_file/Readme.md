1. B
2. A
3. 第 4 行
4. 在 Protocol Buffers 中，string 是一種 data type（gRPC 是 strong datatype），表示欄位儲存字串。等號後有數字是欄位的 field tag，是 protobuf 序列化時用來識別欄位用的，message 傳送時的順序會根據欄位編號排序，且使用欄位號來代表欄位而非欄位名稱可減少資料大小，
5. server 會回傳“查詢信件狀態(尾號 ＸＸＸ) 找不到該信件”，並且不會顯示學生和學院資料。
6. "咆嘯信已送達"
7. 可順利編譯與使用不會錯誤，就算用 snake_case，server 和 client 等檔案程式裡依照 proto 命名即可成功，且 gRPC 跨語言支援性好，在產生程式碼時會根據語言自動轉換命名風格。
