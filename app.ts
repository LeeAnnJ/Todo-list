// import http server and express
// 初始化一个express实例
// 先用Mysql吧

import { createServer } from 'http';
import express from 'express';
import { Server, Socket } from 'socket.io';
// body-parser
import bodyParser from 'body-parser';

const app = express();

app.set('port', process.env.PORT || 3000);

// allow cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

// 监听端口
httpServer.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port') + '');
});

// 监听客户端连接
io.on('connection', (socket: Socket) => {
    console.log('客户端连接成功');
    // 监听客户端发送的消息
    socket.on('message', (data) => {
        console.log(data);
    });
});

// import router
// import router from './routes/index';

// use router
// app.use(router);
