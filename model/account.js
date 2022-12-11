"use strict";
// database table: user_account
// entity class: Account
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
class Account {
    constructor(client_id, user_name, password_hash, avatar_path, register_time, introduction) {
        this.client_id = client_id;
        this.user_name = user_name;
        this.password_hash = password_hash;
        this.avatar_path = avatar_path;
        this.register_time = register_time;
        this.introduction = introduction;
    }
    // get the client_id
    getClientId() {
        return this.client_id;
    }
}
exports.Account = Account;
module.exports = Account;
