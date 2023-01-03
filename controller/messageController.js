"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post_message = exports.get_message = void 0;
const dbRepo_1 = require("../controller/dbRepo");
// get message
const get_message = (req, res) => {
    // res.send('get message');
    var client_id = req.body.client_id;
    dbRepo_1.db.get_client_message(client_id, (message_list) => {
        if (message_list.length !== 0) {
            // success
            res.json({
                code: 200,
                message: 'success',
                message_list,
            });
        }
        else {
            res.json({
                code: 400,
                message: 'fail',
                message_list: null,
            });
        }
    });
};
exports.get_message = get_message;
// get message by id
const post_message = (req, res) => {
    res.send('get message by id');
};
exports.post_message = post_message;