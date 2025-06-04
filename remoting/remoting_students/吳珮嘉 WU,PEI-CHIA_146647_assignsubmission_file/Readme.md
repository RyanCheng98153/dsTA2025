1. B
2. A
3. 會對應到client和server中的第4行(const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;)。
4. string代表資料型別是文字，等號後面接數字是代表欄位的編號，它的作用是在二進制格式中，用來識別欄位。
5. 當trackLetter找不到對應的信件時，server會呼叫callback({code: grpc.status.NOT_FOUND, details: "找不到該信件"})，並印出"查詢信件狀態 (尾碼 ${pickup_code}): 信件不存在"的error訊息，然後client端(track.js)收到後會進入 err 分支，顯示錯誤訊息"查詢信件狀態(尾號 ${pickup_code}) 找不到該信件"，error的訊息都會變成紅色的。
6. "咆嘯信已送達"
7. 在JS中會變成Camel case，為了符合JS使用習慣，@grpc/proto-loader會自動轉換成Camel case。