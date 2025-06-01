1. (B) HTTP/2
2. (A) 定義 API 介面與訊息格式
3. (1) proto 中的 package 在 server 中對應到的程式碼  第4行
const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;             //載入proto檔案，再通過 grpc.loadPackageDefinition 解析           

這樣就可以用下面那行程式碼把 OwlPost加到 gRPC 中，並指定去做 sendLetter 和 trackLetter 
server.addService(owlPostProto.OwlPost.service, { sendLetter, trackLetter });

(2) 在 client 中對應到的程式碼 第4行
const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;         //讓client端可以成功訪問server端的服務

之後調用 sendLetter 

client.sendLetter({ studentName: "Harry Potter" }, (err, response) => {
    if (!err) {
        console.log("霍格華茲錄取通知已寄出！");
        console.log(`學生: ${response.studentName}`);
        console.log(`學院: ${response.house}`);
        console.log(`追蹤碼: ${response.trackingId}`);
    } else {
        console.error(err.details);
    }
});

執行成功就會出現
PS C:\Users\angelachuang\Downloads\2025-newlab-remoting\student> node client.js
霍格華茲錄取通知已寄出！
學生: Harry Potter
學院: 拉文克勞
追蹤碼: 93a77539-3601-44d7-ac8e-bcdcfa116d72-695

(3) 在 proto 檔案中定義 package
package owlpost;  
這個 package 定義了命名空間，所有在這個檔案中定義的服務和 message 都會被放在 owlpost 。


4. proto 中的 string 是一種資料型別，用來定義訊息中的一個field，這個field會儲存一個文本的值。(像是名字、身分證字號及學號都可以用string表示)
等號後面接的數字代表的是 field number，他是唯一的，這些 field number 用來表示資料被序列化，這時 proto 會用這些 field number 來決定處理資料的順序，可以提高序列化與反序列化的效率。
5. trackLetter 如果找不到對應的信件時，會回傳"查詢信件狀態 (尾碼 XXX): 信件不存在"。
其中 "尾碼 XXX"就是執行 node track.js XXX 所要查詢狀態的信件，而  XXX 就是 node client.js 成功後會給的追蹤碼末三碼。尾碼若存在會正常顯示狀態，若不存在則會顯示"查詢信件狀態 (尾碼 XXX): 信件不存在。

"信件不存在"是使用 gRPC 錯誤碼來指示找不到信件;若找不到對應的信件， server 會執行以下程式碼並回傳。

callback({
    code: grpc.status.NOT_FOUND,    //////gRPC 錯誤代碼
    details: "找不到該信件"
});

//trackLetter 如果找不到對應的信件，輸入 node track.js 696 會顯示:
PS C:\Users\angelachuang\Downloads\2025-newlab-remoting\student> node track.js 696
查詢信件狀態(尾號 696) 找不到該信件

//trackLetter 如果找不到對應的信件，server 端會顯示:
查詢信件狀態 (尾碼 696): 信件不存在
6. 查詢信件的追蹤碼尾號為 4 的信件時，從以下程式碼知道伺服器會根據追蹤碼的最後一位數字來決定信件的狀態。
letters[tracking_id] = { 
    student: call.request.studentName, 
    house: house, 
    status: letter_status[tracking_id.slice(-1)],   //////tracking_id.slice(-1) 是指從追蹤碼的最尾端取出最後一個字符
};

再來看看貓頭鷹信件的所有狀態
const letter_status = [
    "正在進行魔法處理",                               /////letter_status[0]
    "正在等待鄧不力多的魔法指示", 
    "貓頭鷹迷路了",
    "貓頭鷹正在休息",
    "咆嘯信已送達",                                  /////letter_status[4]
    "信件被迫返回魔法部",
    "信件已被食死徒攔截",
    "信件仍待在隱形信箱中",
    "已送達學院，正在尋找正確的宿舍門牌",
    "已轉交給尼可勒梅的時間轉換器管理員"
];

陣列 letter_status 包含了 10 種不同的狀態，當tracking_id.slice(-1) 是 4 時，這對應到letter_status[4]，就是"咆嘯信已送達"。
(陣列是從0開始，所以letter_status[4]應該是第五個，就是"咆嘯信已送達")
7. 如果使用底線(underscore) ”_” 進行命名，生成的 gRPC client 端的 code 會把底線命名轉換為"駝峰式命名"，像是student_name 會被轉換為 studentName，而tracking_id 會被轉換為 trackingId；因此即便在 proto 檔案中使用了底線命名，最終在你的應用程式中可能還是會看到駝峰式命名。
















