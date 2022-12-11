import { Request, Response } from 'express';
import { Message } from '../model/message';
import { db } from '../controller/dbRepo';

// get message
export const get_message = (req: Request, res: Response) => {
    res.send('get message');
}

// get message by id
export const post_message = (req: Request, res: Response) => {
    res.send('get message by id');
}

