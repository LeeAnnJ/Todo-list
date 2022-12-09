// AccountController functions
// Path: controller\accountController.ts
// used in routes\index.ts to handle the request from client about account

import { Request, Response } from 'express';
import { Account } from '../model/account';

// login
export const login = (req: Request, res: Response) => {
    // TODO: login
    res.send('login');
}

// get account by id
export const get_account_by_id = (req: Request, res: Response) => {
    // TODO: get account by id
    res.send('get account by id');
}

// createcount
export const create_account = (req: Request, res: Response) => {
    // TODO: create account
    res.send('create account');
}

// alert user massage
export const alert_user = (req: Request, res: Response) => {
    // TODO: alert user
    res.send('alert user');
}

// change user avator
export const change_avator = (req: Request, res: Response) => {
    // TODO: change avator
    res.send('change avator');
}

// delete user
export const delete_user = (req: Request, res: Response) => {
    // TODO: delete user
    res.send('delete user');
}
