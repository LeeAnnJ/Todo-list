"use strict";
// database table: message
// entity class: Message
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
class Message {
    constructor(message_id, message_sender, message_receiver, message_type, message_content, message_send_time, message_status) {
        this.message_id = message_id;
        this.message_sender = message_sender;
        this.message_receiver = message_receiver;
        this.message_type = message_type;
        this.message_content = message_content;
        this.message_send_time = message_send_time;
        this.message_status = message_status;
    }
    // to json string
    toJsonString() {
        return JSON.stringify(this);
    }
}
exports.Message = Message;
// module.exports = Message;
