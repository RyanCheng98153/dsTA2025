1. B
2. A
3. 第4行
4. string 代表字串; 因爲 protocol buffers 在序列化時識別欄位，壓縮資料和解析。
5. 會回傳“查詢信件狀態(尾號 xxx) 找不到該信件”，沒什麼特別變化
6. “咆嘯信已送達”
7. 不會發生任何事，proto-loader會自動將pickup_code改成pickupCode，在.js檔案中，依然可以正常使用pickupCode變數名稱跑動運行。(`snake_case` → `camelCase`)
