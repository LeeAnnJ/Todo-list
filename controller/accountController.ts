// AccountController functions
// Path: controller\accountController.ts
// used in routes\index.ts to handle the request from client about account

import { Request, Response } from 'express'
import { Account } from '../model/account'
import { db } from '../controller/dbRepo'

// login
export const login = (req: Request, res: Response) => {
    // TODO: login
    // read the user name and password hash from request
    res.send('login')

    var user_name = req.body.user_name
    var passwd_hash = req.body.passwd_hash

    // check if the user name and password hash is correct
    db.login(user_name, passwd_hash, (acc_id: number) => {
        if (acc_id !== 0) {
            // success
            db.getUserById(acc_id, (acc_info: Account) => {
                res.json({
                    code: 200,
                    message: 'success',
                    client: {
                        acc_info,
                    },
                })
            })
        } else {
            res.json({
                code: 400,
                message: 'fail',
                client: null,
            })
        }
    })
}

// get account by id
export const get_account_by_id = (req: Request, res: Response) => {
    // res.send('get account by id')

    var client_id = parseInt(req.query["client_id"] as string)

    console.log(client_id)
    db.getUserById(client_id, (acc_info: Account) => {
        var resJson = JSON.stringify(acc_info)
        if (acc_info.client_id !== 0) {
            // success
            res.json({
                code: 200,
                message: 'success',
                client: {
                    acc_info,
                },
            })
        } else {
            res.json({
                code: 400,
                message: 'fail',
                client: null,
            })
        }
    })
}

// createcount
export const create_account = (req: Request, res: Response) => {
    // res.send('create account')
    const username = req.body.account.username
    const passwd_hash = req.body.account.passwd_hash
    const intro = req.body.account.introduction || ''

    // check if the username is already used
    db.checkUserName(username, (result: Boolean) => {
        if (!result) {
            res.json({
                code: 400,
                message: 'username already used',
                data: null,
            })
        } else {
            // create account
            var acc = new Account(0, username, passwd_hash, '', new Date(), intro)
            db.createAccount(acc, (acc_id: number) => {
                if (acc_id !== 0) {
                    res.json({
                        code: 200,
                        message: 'success',
                        data: {
                            client_id: acc_id,
                        },
                    })
                } else {
                    res.json({
                        code: 400,
                        message: 'fail',
                        data: null,
                    })
                }
            })
        }
    })
}

// alert user massage
export const alert_user = (req: Request, res: Response) => {
    // TODO: alert user
    // res.send('alert user')
    const client_id = req.body.client_id
    db.getUserById(client_id, (acc_now: Account) => {
        if (acc_now.client_id !== 0) {
            var new_user_name = req.body.content.new_user_name
            var new_password_hash = req.body.content.new_password_hash
            var new_avator = req.body.content.new_avator
            if (new_user_name !== '') {
                acc_now.user_name = new_user_name
            }
            if (new_password_hash !== '') {
                acc_now.password_hash = new_password_hash
            }
            if (new_avator !== '') {
                acc_now.avatar_path = new_avator
            }
            db.alertUserInfo(acc_now, (result: Boolean) => {
                if (result) {
                    res.json({
                        code: 200,
                        message: 'success',
                        data: null,
                    })
                } else {
                    res.json({
                        code: 400,
                        message: 'fail',
                        data: null,
                    })
                }
            })
        } else {
            res.json({
                code: 400,
                message: 'fail to find the user',
                data: null,
            })
        }
    })
}

// change user avator
export const change_avator = (req: Request, res: Response) => {
    // TODO: change avator
    // 涉及静态文件的上传 我再想想怎么搞
    // 还没搞懂头像怎么破
    res.send('change avator')
}

// delete user
export const delete_user = (req: Request, res: Response) => {
    // res.send('delete user');
    var client_id = req.body.client_id

    // delete user
    db.deleteAccount(client_id, (result: Boolean) => {
        if (result) {
            res.json({
                code: 200,
                message: 'success',
                data: null,
            })
        } else {
            res.json({
                code: 400,
                message: 'fail',
                data: null,
            })
        }
    })
}

// check user name
export const check_user_name = (req: Request, res: Response) => {
    var user_name = req.query['user_name'] as string
    db.checkUserName(user_name, (result: Boolean) => {
        if (result) {
            res.json({
                result: true,
            })
        } else {
            res.json({
                result: false,
            })
        }
    })
}
