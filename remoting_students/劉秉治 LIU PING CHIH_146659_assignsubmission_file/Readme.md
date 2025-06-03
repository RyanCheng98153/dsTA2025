1. B
2. A
3. 在此次的作業中，.proto的package皆對應第4行程式，以內容為「const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;」的方式被設定。
4. (1) proto中的string代表server和client傳輸該欄位資料的型別是字串。(2) string的欄位名稱後等號接的數字代表該欄位對於Protocol Buffers在傳輸資料時，用來序列化資料的唯一識別碼。
5. trackLetter 如果找不到對應的信件時，在server.js的介面會顯示「查詢信件狀態 (尾碼 xxx): 信件不存在」，並回傳「找不到該信件」，則track.js的介面就會顯示「查詢信件狀態(尾號 xxx) 找不到該信件」。
6. 在執行 track.js 的時候，若查看信件追蹤碼尾號(最後一碼)為 4 的信件追蹤，信件狀態會寫「查詢信件狀態(尾號 xx4)：咆嘯信已送達」。
7. 有嘗試過將「底線(underscore) ”_”」放在「message」的命名和「string」欄位的命名，發現程式還是可以正常運作，不會發生什麼事。