// gRPC 的 JavaScript 實作，用來建立 gRPC client/server
const grpc = require('@grpc/grpc-js');

// 用來讀取 .proto 檔案，解析裡面定義的 service、message
const protoLoader = require('@grpc/proto-loader');

// 讀取並解析 owl_post.proto 這個檔案
const packageDefinition = protoLoader.loadSync('owl_post.proto', {});

// 這是 .proto 裡面 package 的名字（例如：package owlpost;），用來存取定義好的 service。
const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;

// OwlPost 是 .proto 裡定義的 service 名稱（例如：service OwlPost { ... })
// 'localhost:50051'：server 的位置和 port
const client = new owlPostProto.OwlPost('localhost:50051', grpc.credentials.createInsecure());

// 使用 argument 傳入學生姓名
const pickup_code = process.argv[2];

// 查詢信件狀態
client.trackLetter({ pickupCode: pickup_code }, (err, response) => {
    if (!err) {

        // 此部分不用實作
        // 但需要透過觀察此檔案，來完成 proto 檔案中的實作

        console.log(`查詢信件狀態(尾號 ${pickup_code})：${response.status}\n學生: ${response.studentName}\n學院: ${response.house}\n`);

    } else {
        console.error(`查詢信件狀態(尾號 ${pickup_code}) ${err.details}`);
    }
});