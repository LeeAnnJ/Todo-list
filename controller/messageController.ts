import { Request, Response } from 'express'
import { Message } from '../model/message'
import { db } from '../controller/dbRepo'

// get message
export const get_message = (req: Request, res: Response) => {
    // res.send('get message');
    var client_id = req.body.client_id
    db.get_client_message(client_id, (message_list: Message[]) => {
        if (message_list.length !== 0) {
            // success
            res.json({
                code: 200,
                message: 'success',
                message_list,
            })
        } else {
            res.json({
                code: 400,
                message: 'fail',
                message_list: null,
            })
        }
    })
}

// get message by id
export const post_message = (req: Request, res: Response) => {
    res.send('get message by id')
}
