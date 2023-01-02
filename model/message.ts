// database table: message
// entity class: Message

export class Message {
    message_id: number;
    message_sender: number;
    message_receiver: number;
    message_type: number;
    message_content: string;
    message_send_time: Date;
    message_status: number;

    constructor(message_id: number, message_sender: number, message_receiver: number, message_type: number, message_content: string, message_send_time: Date, message_status: number) {
        this.message_id = message_id;
        this.message_sender = message_sender;
        this.message_receiver = message_receiver;
        this.message_type = message_type;
        this.message_content = message_content;
        this.message_send_time = message_send_time;
        this.message_status = message_status;
    }

}

// module.exports = Message;