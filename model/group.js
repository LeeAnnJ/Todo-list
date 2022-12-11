"use strict";
// database table: group
// entity class: Group
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupAccount = exports.Group = void 0;
class Group {
    constructor(group_id, group_name, group_description, group_create_time, group_creator) {
        this.group_id = group_id;
        this.group_name = group_name;
        this.group_description = group_description;
        this.group_create_time = group_create_time;
        this.group_creator = group_creator;
        this.members_number = 1;
    }
    // get the group_id
    getGroupId() {
        return this.group_id;
    }
}
exports.Group = Group;
// relationship between group and account
class GroupAccount {
    constructor(group_id, client_id) {
        this.group_id = group_id;
        this.client_id = client_id;
    }
}
exports.GroupAccount = GroupAccount;
module.exports = { Group, GroupAccount };
