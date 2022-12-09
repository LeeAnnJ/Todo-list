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
import path from 'path';

// import routers
var indexRouter = require('./routes/index');
var accountRouter = require('./routes/account');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

// bind routers
app.use('/', indexRouter);
app.use('/account', accountRouter);

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
    res.render('error');
});

module.exports = app;
