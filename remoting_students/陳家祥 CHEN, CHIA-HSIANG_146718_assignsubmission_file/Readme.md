1. B
2. A
3. 第 4 ⾏ (const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;)，這行程式碼的「.owlpost」 就是 owl_post.proto 中 「package owlpost」; 的對應。
4. string 代表這個欄位的資料是「文字字串」，後面的數字是欄位的 Tag number，是唯一且不重複的欄位 ID，Protobuf 壓縮、傳輸資料時，便是以此編號來辨識欄位。
5. Server 會回傳錯誤代碼 5 (代表 NOT_FOUND) ，以及錯誤訊息 "找不到該信件"。因此，track.js 會印出 "查詢信件狀態(尾號 734) 找不到該信件"。
6. "咆嘯信已送達"
7. 沒什麼變化，gRPC stub 會自動轉換成該語言慣用的命名格式。
