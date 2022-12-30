"use strict";
// the routers about account is difined here
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import account controller
const acc_controller = __importStar(require("../controller/accountController"));
const router = express_1.default.Router();
// login
router.post('/login', acc_controller.login);
// createAccount
router.post('/create', acc_controller.create_account);
// getUserById
router.get('/getUserById', acc_controller.get_account_by_id);
// alertUser
router.post('/alertUser', acc_controller.alert_user);
// changeUserAvator
router.post('/changeAvator', acc_controller.change_avator);
// get avator直接交给静态文件处理 就不写路由了
// 但是要对应的传递blob数据 不知道静态文件能不能处理blob数据
// router.get('/getAvator', acc_controller.get_avator);
// delete user
router.post('/deleteUser', acc_controller.delete_user);
// check user name
router.get('/checkUserName', acc_controller.check_user_name);
module.exports = router;
