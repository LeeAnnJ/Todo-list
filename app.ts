// import http server and express
// 初始化一个express实例

// import http server and express
import { createServer } from 'http';
import express from 'express';
import { Server, Socket } from 'socket.io';
// http-errors
import createError from 'http-errors';
// body-parser
import bodyParser from 'body-parser';
// cookie-parser
import cookieParser from 'cookie-parser';
// morgan
import logger from 'morgan';
// path
import path from 'path'

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));

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

// http server
const httpServer = createServer(app);
// // socket.io server
// const io = new Server(httpServer, {
//     cors: {
//         origin: '*',
//         methods: ['GET', 'POST']
//     }
// });

// // 监听客户端连接
// io.on('connection', (socket: Socket) => {
//     console.log('客户端连接成功');
//     // 监听客户端发送的消息
//     socket.on('message', (data) => {
//         console.log(data);
//     });
// });

// listen on the port
httpServer.listen(3000, () => {
    console.log('listening on *:3000');
});

// // 监听客户端连接
// io.on('connection', (socket: Socket) => {
//     console.log('客户端连接成功');
//     // 监听客户端发送的消息
//     socket.on('message', (data) => {
//         console.log(data);
//     });
// });


// import routers
const indexRouter = require('./routes/index');
const accountRouter = require('./routes/account');
const taskRouter = require('./routes/task');
const messageRouter = require('./routes/message');
const groupRouter = require('./routes/group');
const folderRouter = require('./routes/folder');

// bind routers
app.use('/account', accountRouter);
app.use('/task', taskRouter);
app.use('/message', messageRouter);
app.use('/group', groupRouter);
app.use('/folder', folderRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {

    next(createError(404));
});

// error handler
app.use(function (err: any, req: any, res: any, next: any) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
});

module.exports = app;
