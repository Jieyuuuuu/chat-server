const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// 创建Express应用
const app = express();
const server = http.createServer(app);

// 设置CORS，允许前端连接
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// 监听连接事件
io.on('connection', (socket) => {
  console.log('新用户连接，ID:', socket.id);
  
  // 监听发送消息事件
  socket.on('sendMessage', (message) => {
    console.log('收到消息:', message);
    // 广播消息给所有客户端
    io.emit('receiveMessage', message);
  });
  
  // 监听断开连接事件
  socket.on('disconnect', () => {
    console.log('用户断开连接，ID:', socket.id);
  });
});

// 启动服务器，监听3001端口
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
}); 