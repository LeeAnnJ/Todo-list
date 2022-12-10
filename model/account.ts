// database table: user_account
// entity class: Account

export class Account {
    client_id: number;
    user_name: string;
    password_hash: string;
    avatar_path: string;
    register_time: Date;
    introduction: string;

    constructor(client_id: number, user_name: string, password_hash: string, avatar_path: string, register_time: Date, introduction: string) {
        this.client_id = client_id;
        this.user_name = user_name;
        this.password_hash = password_hash;
        this.avatar_path = avatar_path;
        this.register_time = register_time;
        this.introduction = introduction;
    }

    // get the client_id
    getClientId(): number {
        return this.client_id;
    }
    
}

module.exports = Account;
