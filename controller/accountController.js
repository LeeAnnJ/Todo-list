"use strict";
// AccountController functions
// Path: controller\accountController.ts
// used in routes\index.ts to handle the request from client about account
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_user_name = exports.delete_user = exports.change_avator = exports.alert_user = exports.create_account = exports.get_account_by_id = exports.login = void 0;
const account_1 = require("../model/account");
const dbRepo_1 = require("../controller/dbRepo");
// login
const login = (req, res) => {
    // TODO: login
    // read the user name and password hash from request
    res.send('login');
    var user_name = req.body.user_name;
    var passwd_hash = req.body.passwd_hash;
    // check if the user name and password hash is correct
    var acc_id = dbRepo_1.db.login(user_name, passwd_hash);
    if (acc_id !== 0) {
        // success
        var acc_info = dbRepo_1.db.getUserById(acc_id);
        res.json({
            code: 200,
            message: 'success',
            client: {
                acc_info,
            },
        });
    }
    else {
        res.json({
            code: 400,
            message: 'fail',
            client: null,
        });
    }
};
exports.login = login;
// get account by id
const get_account_by_id = (req, res) => {
    // res.send('get account by id')
    console.log('get account by id');
    var client_id = req.body.client_id;
    var acc_info = dbRepo_1.db.getUserById(client_id);
    console.log(acc_info);
    if (acc_info.client_id !== 0) {
        // success
        res.json({
            code: 200,
            message: 'success',
            client: {
                acc_info,
            },
        });
    }
    else {
        res.json({
            code: 400,
            message: 'fail',
            client: null,
        });
    }
};
exports.get_account_by_id = get_account_by_id;
// createcount
const create_account = (req, res) => {
    // TODO: create account
    // res.send('create account')
    const username = req.body.username;
    const passwd_hash = req.body.passwd_hash;
    // check if the username is already used
    var nameUsed = dbRepo_1.db.checkUserName(username);
    if (nameUsed) {
        res.json({
            code: 400,
            message: 'username already used',
            data: null,
        });
    }
    else {
        // create account
        var acc = new account_1.Account(0, username, passwd_hash, '', new Date(), '');
        var acc_id = dbRepo_1.db.createAccount(acc);
        if (acc_id !== 0) {
            res.json({
                code: 200,
                message: 'success',
                data: {
                    client_id: acc_id,
                },
            });
        }
        else {
            res.json({
                code: 400,
                message: 'fail',
                data: null,
            });
        }
    }
};
exports.create_account = create_account;
// alert user massage
const alert_user = (req, res) => {
    // TODO: alert user
    // res.send('alert user')
    const client_id = req.body.client_id;
    var acc_now = dbRepo_1.db.getUserById(client_id);
    if (acc_now.client_id !== 0) {
        var new_user_name = req.body.content.new_user_name;
        var new_password_hash = req.body.content.new_password_hash;
        var new_avator = req.body.content.new_avator;
        if (new_user_name !== '') {
            acc_now.user_name = new_user_name;
        }
        if (new_password_hash !== '') {
            acc_now.password_hash = new_password_hash;
        }
        if (new_avator !== '') {
            acc_now.avatar_path = new_avator;
        }
        // success
        res.json({
            code: 200,
            message: 'success',
            data: acc_now,
        });
    }
    else {
        res.json({
            code: 400,
            message: 'fail to find the user',
            data: null,
        });
    }
};
exports.alert_user = alert_user;
// change user avator
const change_avator = (req, res) => {
    // TODO: change avator
    // 涉及静态文件的上传 我再想想怎么搞
    // 还没搞懂头像怎么破
    res.send('change avator');
};
exports.change_avator = change_avator;
// delete user
const delete_user = (req, res) => {
    // res.send('delete user');
    var client_id = req.body.client_id;
    // delete user
    var result = dbRepo_1.db.deleteAccount(client_id);
    if (result) {
        res.json({
            code: 200,
            message: 'success',
        });
    }
    else {
        res.json({
            code: 400,
            message: 'fail',
        });
    }
};
exports.delete_user = delete_user;
// check user name
const check_user_name = (req, res) => {
    var user_name = req.body.user_name;
    var result = dbRepo_1.db.checkUserName(user_name);
    if (result) {
        res.json({
            result: true,
        });
    }
    else {
        res.json({
            result: false,
        });
    }
};
exports.check_user_name = check_user_name;
