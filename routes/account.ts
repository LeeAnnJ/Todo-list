// the routers about account is difined here

import express from 'express';

// import account controller
import * as acc_controller from '../controller/accountController';

const router = express.Router();

// login
router.post('/login', acc_controller.login);

// createAccount
router.post('/create', acc_controller.create_account);

// getUserById
router.get('/getUserById', acc_controller.get_account_by_id);

// alertUser
router.post('/alertUser', acc_controller.alert_user);

// changeUserAvator
router.post('/changeAvatar', acc_controller.change_avator);

// get avator直接交给静态文件处理 就不写路由了
// 但是要对应的传递blob数据 不知道静态文件能不能处理blob数据
// router.get('/getAvator', acc_controller.get_avator);

// delete user
router.post('/deleteUser', acc_controller.delete_user);

// check user name
router.get('/checkUserName', acc_controller.check_user_name);

module.exports = router;