const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// 定義允許的來源
const allowedOrigins = [
  'http://localhost:3000', // 本地前端
  'https://chat-client-six-kappa.vercel.app/',
  'chat-client-git-master-jieyus-projects-8588ac7f.vercel.app',
  'chat-client-f173h7ea2-jieyus-projects-8588ac7f.vercel.app' // 線上前端
];

// 設定 CORS
const corsOptions = {
  origin: (origin, callback) => {
    // 允許來自 allowedOrigins 的請求，或沒有 origin（例如直接訪問後端）
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
};

// 應用 CORS 到 Express
app.use(cors(corsOptions));

// 應用 CORS 到 Socket.IO
const io = new Server(server, {
  cors: corsOptions,
});

io.on('connection', (socket) => {
  console.log('使用者連線:', socket.id);
  socket.on('sendMessage', (data) => {
    io.emit('receiveMessage', data);
  });
  socket.on('disconnect', () => {
    console.log('使用者斷線:', socket.id);
  });
});

server.listen(3001, () => {
  console.log('後端運行於 http://localhost:3001');
});