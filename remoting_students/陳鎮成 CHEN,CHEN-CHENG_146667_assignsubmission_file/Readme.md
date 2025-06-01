1.(B)
2.(A)
3.
const packageDefinition = protoLoader.loadSync('owl_post.proto', {});
const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;
4.
string表示後面接的是文字，就是JS的string，數字代表欄位編號，用來傳輸用
5.假設你查詢不存在的尾號215，會得到一個error，他會寫查詢信件狀態(尾號 215) 找不到該信件
6.咆嘯信已送達
7.不會怎麼樣，對應的變數記得也要改就好