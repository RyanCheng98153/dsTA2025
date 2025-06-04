1. B
2. A
3. 在 server.js 和 client.js 的第 4 行：const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost; 實際第一次被使用到算是在server的第 95 行跟client的第 6 行吧，其實我不太確定這個問法我該回到多詳細
4. string 代表資料型別是字串，後面的數字代表欄位編號，用於訊息序列化時識別欄位。
5. 會回傳一個error，server會寫信件不存在，client會寫找不到該信件，不會發光...
6. "咆嘯信已送達"
7. 底線命名會自動轉換為駝峰式命名(JS)，我常用的Python好像不會變就是了，但這個小知識很酷
