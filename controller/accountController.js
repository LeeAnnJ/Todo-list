"use strict";
// AccountController functions
// Path: controller\accountController.ts
// used in routes\index.ts to handle the request from client about account
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_user_name = exports.delete_user = exports.change_avator = exports.alert_user = exports.create_account = exports.get_account_by_id = exports.login = void 0;
const account_1 = require("../model/account");
const dbRepo_1 = require("../controller/dbRepo");
let fs = require('fs');
// login
const login = (req, res) => {
    var user_name = req.body.user_name || '';
    var passwd_hash = req.body.passwd_hash || '';
    // check if the user name and password hash is correct
    dbRepo_1.db.login(user_name, passwd_hash, (acc_id) => {
        if (acc_id !== 0) {
            // success
            dbRepo_1.db.getUserById(acc_id, (acc_info) => {
                res.json({
                    code: 200,
                    message: 'success',
                    client: {
                        acc_info,
                    },
                });
            });
        }
        else {
            res.json({
                code: 400,
                message: 'fail',
                client: null,
            });
        }
    });
};
exports.login = login;
// get account by id
const get_account_by_id = (req, res) => {
    // res.send('get account by id')
    var client_id = parseInt(req.query["client_id"]);
    console.log(client_id);
    dbRepo_1.db.getUserById(client_id, (acc_info) => {
        var resJson = JSON.stringify(acc_info);
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
    });
};
exports.get_account_by_id = get_account_by_id;
// createcount
const create_account = (req, res) => {
    // res.send('create account')
    const username = req.body.account.username;
    const passwd_hash = req.body.account.passwd_hash;
    const intro = req.body.account.introduction || '';
    // check if the username is already used
    dbRepo_1.db.checkUserName(username, (result) => {
        if (!result) {
            res.json({
                code: 400,
                message: 'username already used',
                data: null,
            });
        }
        else {
            // create account
            var acc = new account_1.Account(0, username, passwd_hash, '', new Date(), intro);
            dbRepo_1.db.createAccount(acc, (acc_id) => {
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
            });
        }
    });
};
exports.create_account = create_account;
// alert user massage
const alert_user = (req, res) => {
    const client_id = req.body.client_id;
    dbRepo_1.db.getUserById(client_id, (acc_now) => {
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
            dbRepo_1.db.alertUserInfo(acc_now, (result) => {
                if (result) {
                    res.json({
                        code: 200,
                        message: 'success',
                        data: null,
                    });
                }
                else {
                    res.json({
                        code: 400,
                        message: 'fail',
                        data: null,
                    });
                }
            });
        }
        else {
            res.json({
                code: 400,
                message: 'fail to find the user',
                data: null,
            });
        }
    });
};
exports.alert_user = alert_user;
// change user avator
const change_avator = (req, res) => {
    const multer = require('multer');
    const upload = multer({ dest: 'public/' });
    // upload the avator to the piblic folder
    // read the avator from the request
    var avator_file = req.body.avator_file;
    var client_id = req.body.client_id;
    // save the avator to the public folder
    var avator_path = 'public/' + client_id + '.jpg';
    fs.writeFile(avator_path, avator_file, (err) => {
        if (err) {
            res.json({
                code: 500,
                message: 'fail',
                data: null,
            });
        }
    });
    // change the avator path in the database
    dbRepo_1.db.changeAvatar(client_id, avator_path, (result) => {
        if (result) {
            res.json({
                code: 200,
                message: 'success',
                data: null,
            });
        }
        else {
            res.json({
                code: 400,
                message: 'fail',
                data: null,
            });
        }
    });
};
exports.change_avator = change_avator;
// delete user
const delete_user = (req, res) => {
    // res.send('delete user');
    var client_id = req.body.client_id;
    // delete user
    dbRepo_1.db.deleteAccount(client_id, (result) => {
        if (result) {
            res.json({
                code: 200,
                message: 'success',
                data: null,
            });
        }
        else {
            res.json({
                code: 400,
                message: 'fail',
                data: null,
            });
        }
    });
};
exports.delete_user = delete_user;
// check user name
const check_user_name = (req, res) => {
    var user_name = req.query['user_name'];
    dbRepo_1.db.checkUserName(user_name, (result) => {
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
    });
};
exports.check_user_name = check_user_name;
