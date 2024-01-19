const ws = require('nodejs-websocket');

// 记录连接数
let count = 0;
const server = ws.createServer(conn => {
    console.log('new connect');
    count++;
    conn.userName = `用户${count}`;
    broadcast(`${conn.userName}进入了聊天室`);
    // 1. 告诉所有用户有人加入了聊天室
    conn.on('text', (msg) => {
        // 2. 告诉所有用户，发送的消息内容是什么
        broadcast(`${conn.userName}发送了消息：${msg}`)
    });
    conn.on('close', (data) => {
        count--;
        // 3. 告诉所有用户，有人离开了聊天室
        broadcast(`${conn.userName}离开了聊天室`)
    });
    conn.on('error', (data) => {
        console.log('错误:');
    })
});

function broadcast(msg) {
    server.connections.forEach(item => {
        item.send(msg, () => {});
    })
}

server.listen(3000, () => {
    console.log('启动成功');
})

