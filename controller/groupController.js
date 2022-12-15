"use strict";
// group controller functions
// Path: controller\groupController.ts
// used in routes\group.ts to handle the request from client about group
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_tasks_of_group = exports.alert_group_info = exports.delete_group = exports.remove_member_from_group = exports.add_member_to_group = exports.get_user_groups = exports.get_members_of_group = exports.get_task_owner_of_group = exports.get_group_by_id = exports.create_group = void 0;
const group_1 = require("../model/group");
const dbRepo_1 = require("../controller/dbRepo");
// create group
const create_group = (req, res) => {
    res.send('create group');
    var group_name = req.body.group.group_name;
    var group_description = req.body.group.group_description;
    var group_creator = req.body.group.group_creator;
    var group_create_time = new Date();
    var group = new group_1.Group(0, group_name, group_description, group_create_time, group_creator);
    var group_account_id = dbRepo_1.db.createGroup(group);
    if (group_account_id !== 0) {
        // create group success
        res.json({
            code: 200,
            message: 'success',
            data: {
                group_id: group_account_id,
            },
        });
    }
};
exports.create_group = create_group;
// get group by id
const get_group_by_id = (req, res) => {
    // var group = req.body.group;
    // res.send('get group by id');
    var group_id = req.body.group.group_id;
    var group = dbRepo_1.db.getGroupById(group_id);
    if (group !== null) {
        // get group success
        res.json({
            code: 200,
            message: 'success',
            data: group,
        });
    }
};
exports.get_group_by_id = get_group_by_id;
// get the creater of group
const get_task_owner_of_group = (req, res) => {
    // TODO: get task owner of group
    // res.send('get task owner of group');
    var group_id = req.body.group.group_id;
    var task_owner = dbRepo_1.db.getGroupCreaterId(group_id);
    if (task_owner !== 0) {
        // get task owner success
        res.json({
            code: 200,
            message: 'success',
            data: {
                group_creater_id: task_owner,
            },
        });
    }
    else {
        // get task owner failed
        res.json({
            code: 500,
            message: 'failed',
            data: {},
        });
    }
};
exports.get_task_owner_of_group = get_task_owner_of_group;
// get the members of group
const get_members_of_group = (req, res) => {
    // TODO: get members of group
    // res.send('get members of group');
    var group_id = req.body.group.group_id;
    var members = dbRepo_1.db.getGroupMembers(group_id);
    if (members !== null) {
        // get members success
        res.json({
            code: 200,
            message: 'success',
            data: {
                members: members,
            },
        });
    }
    else {
        // get members failed
        res.json({
            code: 500,
            message: 'failed',
            data: {},
        });
    }
};
exports.get_members_of_group = get_members_of_group;
// get user's groups
const get_user_groups = (req, res) => {
    // TODO: get user's groups
    // res.send('get user groups');
    var user_id = req.body.user.client_id;
    var groups = dbRepo_1.db.getUserGroups(user_id);
    if (groups !== null) {
        // get user groups success
        res.json({
            code: 200,
            message: 'success',
            data: {
                groups: groups,
            },
        });
    }
    else {
        // get user groups failed
        res.json({
            code: 500,
            message: 'failed',
            data: {},
        });
    }
};
exports.get_user_groups = get_user_groups;
// add member to group
const add_member_to_group = (req, res) => {
    // TODO: add member to group
    // res.send('add member to group');
    var group_id = req.body.group.group_id;
    var member_id = req.body.group.member_id;
    var isSucc = dbRepo_1.db.addMemberToGroup(group_id, member_id);
    if (isSucc) {
        // add member to group success
        res.json({
            code: 200,
            message: 'success',
        });
    }
    else {
        // add member to group failed
        res.json({
            code: 500,
            message: 'failed',
            data: {},
        });
    }
};
exports.add_member_to_group = add_member_to_group;
// remove member from group
const remove_member_from_group = (req, res) => {
    // TODO: remove member from group
    // res.send('remove member from group');
    var group_id = req.body.group.group_id;
    var member_id = req.body.group.member_id;
    var isSucc = dbRepo_1.db.deleteMemberFromGroup(group_id, member_id);
    if (isSucc) {
        // remove member from group success
        res.json({
            code: 200,
            message: 'success',
        });
    }
    else {
        // remove member from group failed
        res.json({
            code: 500,
            message: 'failed',
            data: {},
        });
    }
};
exports.remove_member_from_group = remove_member_from_group;
// delete group
const delete_group = (req, res) => {
    // TODO: delete group
    // res.send('delete group')
    var group_id = req.body.group.group_id;
    var isSucc = dbRepo_1.db.deleteGroup(group_id);
    if (isSucc) {
        // delete group success
        res.json({
            code: 200,
            message: 'success',
        });
    }
    else {
        // delete group failed
        res.json({
            code: 500,
            message: 'failed',
            data: {},
        });
    }
};
exports.delete_group = delete_group;
// update group
const alert_group_info = (req, res) => {
    // TODO: update group
    // res.send('update group')
    // var group_id = req.body.group.group_id
    var group = req.body.group;
    var isSucc = dbRepo_1.db.alertGroupInfo(group);
    if (isSucc) {
        // update group success
        res.json({
            code: 200,
            message: 'success',
            data: {
                group,
            },
        });
    }
    else {
        // update group failed
        res.json({
            code: 500,
            message: 'failed',
            data: {},
        });
    }
};
exports.alert_group_info = alert_group_info;
// get tasks of group
const get_tasks_of_group = (req, res) => {
    // TODO: get tasks of group -> about task.
    res.send('get tasks of group');
};
exports.get_tasks_of_group = get_tasks_of_group;
