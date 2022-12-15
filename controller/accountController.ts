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
    var acc_id = db.login(user_name, passwd_hash)
    if (acc_id !== 0) {
        // success
        var acc_info = db.getUserById(acc_id)
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
}

// get account by id
export const get_account_by_id = (req: Request, res: Response) => {
    // res.send('get account by id')
    var client_id = req.body.client_id
    var acc_info = db.getUserById(client_id)
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
}

// createcount
export const create_account = (req: Request, res: Response) => {
    // TODO: create account
    // res.send('create account')
    const username = req.body.username
    const passwd_hash = req.body.passwd_hash

    // check if the username is already used
    var nameUsed = db.checkUserName(username)
    if (nameUsed) {
        res.json({
            code: 400,
            message: 'username already used',
            data: null,
        })
    } else {
        // create account
        var acc = new Account(0, username, passwd_hash, '', new Date(), '')
        var acc_id = db.createAccount(acc)
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
    }
}

// alert user massage
export const alert_user = (req: Request, res: Response) => {
    // TODO: alert user
    // res.send('alert user')
    const client_id = req.body.client_id
    var acc_now = db.getUserById(client_id)
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

        // success
        res.json({
            code: 200,
            message: 'success',
            data: acc_now,
        })
    } else {
        res.json({
            code: 400,
            message: 'fail to find the user',
            data: null,
        })
    }
}

// change user avator
export const change_avator = (req: Request, res: Response) => {
    // TODO: change avator
    // 涉及静态文件的上传 我再想想怎么搞
    res.send('change avator')
}

// delete user
export const delete_user = (req: Request, res: Response) => {
    // res.send('delete user');
    var client_id = req.body.client_id

    // delete user
    var result = db.deleteAccount(client_id)
    if (result) {
        res.json({
            code: 200,
            message: 'success',
        })
    } else {
        res.json({
            code: 400,
            message: 'fail',
        })
    }
}

// check user name
export const check_user_name = (req: Request, res: Response) => {
    var user_name = req.body.user_name
    var result = db.checkUserName(user_name)
    if (result) {
        res.json({
            result: true,
        })
    } else {
        res.json({
            result: false,
        })
    }
}
