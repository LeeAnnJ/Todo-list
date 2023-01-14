import { Request, Response } from 'express'
import { Message } from '../model/message'
import { db } from '../controller/dbRepo'

// get message
export const get_message = (req: Request, res: Response) => {
    var client_id = parseInt(req.query['client_id'] as string)
    db.get_client_message(client_id, (message_list: Message[]) => {
        // console.log(message_list);
        if (message_list.length !== 0) {
            // success
            res.json({
                code: 200,
                message: 'success',
                message_list: {
                    toJSON: () => message_list,
                },
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
    var message_id = req.body.message_id
    var is_read = req.body.is_read
    db.change_message_status(message_id, is_read, (result: boolean) => {
        if (result) {
            // success
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
    })
}
