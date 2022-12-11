"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post_message = exports.get_message = void 0;
// get message
const get_message = (req, res) => {
    res.send('get message');
};
exports.get_message = get_message;
// get message by id
const post_message = (req, res) => {
    res.send('get message by id');
};
exports.post_message = post_message;
