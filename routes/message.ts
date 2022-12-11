import express from 'express';

const router = express.Router();
import * as message_controller from '../controller/messageController';

// 这部分的接口文档我没看懂……

// get message
router.get('/getMessage', message_controller.get_message);

// change message status
router.post('/postMessage', message_controller.post_message);

// FIXME:  消息的生成应该是后端逻辑的干活
