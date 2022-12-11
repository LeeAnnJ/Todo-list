"use strict";
// group controller functions
// Path: controller\groupController.ts
// used in routes\group.ts to handle the request from client about group
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_tasks_of_group = exports.update_group = exports.delete_group = exports.remove_member_from_group = exports.add_member_to_group = exports.get_user_groups = exports.get_members_of_group = exports.get_task_owner_of_group = exports.get_group_by_id = exports.create_group = void 0;
// create group
const create_group = (req, res) => {
    res.send('create group');
    // TODO: create group
    // var group_name = req.body.group.group_name;
    // var group_description = req.body.group.group_description;
    // var group_creator = req.body.group.group_creator;
    // var group_create_time = new Date();
    // var group = new Group(0, group_name, group_description, group_create_time, group_creator);
    // var group_account_id = db.createGroup(group);
    // if (group_account_id !== 0) {
    //     // create group success
    //     res.json({
    //         "code": 200,
    //         "message": "success",
    //         "data": {
    //             "group_id": group_account_id
    //         }
    //     })
    // }
};
exports.create_group = create_group;
// get group by id
const get_group_by_id = (req, res) => {
    // var group = req.body.group;
    res.send('get group by id');
};
exports.get_group_by_id = get_group_by_id;
// get the task owner of group
const get_task_owner_of_group = (req, res) => {
    // TODO: get task owner of group
    res.send('get task owner of group');
};
exports.get_task_owner_of_group = get_task_owner_of_group;
// get the members of group
const get_members_of_group = (req, res) => {
    // TODO: get members of group
    res.send('get members of group');
};
exports.get_members_of_group = get_members_of_group;
// get user's groups
const get_user_groups = (req, res) => {
    // TODO: get user's groups
    res.send('get user groups');
};
exports.get_user_groups = get_user_groups;
// add member to group
const add_member_to_group = (req, res) => {
    // TODO: add member to group
    res.send('add member to group');
};
exports.add_member_to_group = add_member_to_group;
// remove member from group
const remove_member_from_group = (req, res) => {
    // TODO: remove member from group
    res.send('remove member from group');
};
exports.remove_member_from_group = remove_member_from_group;
// delete group
const delete_group = (req, res) => {
    // TODO: delete group
    res.send('delete group');
};
exports.delete_group = delete_group;
// update group
const update_group = (req, res) => {
    // TODO: update group
    res.send('update group');
};
exports.update_group = update_group;
// get tasks of group
const get_tasks_of_group = (req, res) => {
    // TODO: get tasks of group
    res.send('get tasks of group');
};
exports.get_tasks_of_group = get_tasks_of_group;
