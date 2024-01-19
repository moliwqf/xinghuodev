// node.js使用websocket开发服务
const PORT = 3000;
// 1. 安装nodejs-websocket包 yarn nodejs-websocket

// 2. 导入nodejs-websocket包
const ws = require('nodejs-websocket');

// 3. 创建一个server
// 每次只要有用户连接，函数就会被执行，会给当前连接的用户创建一个connect对象
const server = ws.createServer(connect => {
    console.log('有用户连接上来了');
    // 每当接收到用户传递过来的数据，这个text事件就会被触发
    connect.on('text', (data) => {
        console.log("接受到了用户的数据", data);
        // 给用户一个响应的数据
        // 对用户发送过来的数据进行处理
        connect.send(data.toUpperCase() + "~~~~!!");
    });
    // websocket关闭连接时
    connect.on('close', () => {
        console.log('连接断开了');
    });
    // 注册error事件，处理用户的错误信息, 防止服务崩溃退出
    connect.on('error', () => {
        console.log('用户连接异常');
    })
});

// 4. 监听3000端口
server.listen(PORT, () => {
    console.log('websocket 服务启动成功了， 监听了端口' + PORT);
});