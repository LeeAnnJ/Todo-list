"use strict";
// import http server and express
// 初始化一个express实例
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import http server and express
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
// http-errors
const http_errors_1 = __importDefault(require("http-errors"));
// cookie-parser
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// morgan
const morgan_1 = __importDefault(require("morgan"));
// path
const path_1 = __importDefault(require("path"));
// import routers
var indexRouter = require('./routes/index');
var accountRouter = require('./routes/account');
var taskRouter = require('./routes/task');
var messageRouter = require('./routes/message');
const app = (0, express_1.default)();
app.set('port', process.env.PORT || 3000);
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// allow cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
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
io.on('connection', (socket) => {
    console.log('客户端连接成功');
    // 监听客户端发送的消息
    socket.on('message', (data) => {
        console.log(data);
    });
});
// bind routers
app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use('/task', taskRouter);
app.use('/message', messageRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;
