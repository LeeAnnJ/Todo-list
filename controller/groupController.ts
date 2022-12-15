// group controller functions
// Path: controller\groupController.ts
// used in routes\group.ts to handle the request from client about group

import { Request, Response } from 'express';
import { Group, GroupAccount } from '../model/group';
import { db } from '../controller/dbRepo';

// create group
export const create_group = (req: Request, res: Response) => {
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
}

// get group by id
export const get_group_by_id = (req: Request, res: Response) => {
    // var group = req.body.group;

    res.send('get group by id');
}

// get the task owner of group
export const get_task_owner_of_group = (req: Request, res: Response) => {
    // TODO: get task owner of group
    res.send('get task owner of group');
}

// get the members of group
export const get_members_of_group = (req: Request, res: Response) => {
    // TODO: get members of group
    res.send('get members of group');
}

// get user's groups
export const get_user_groups = (req: Request, res: Response) => {
    // TODO: get user's groups
    res.send('get user groups');
}

// add member to group
export const add_member_to_group = (req: Request, res: Response) => {
    // TODO: add member to group
    res.send('add member to group');
}

// remove member from group
export const remove_member_from_group = (req: Request, res: Response) => {
    // TODO: remove member from group
    res.send('remove member from group');
}

// delete group
export const delete_group = (req: Request, res: Response) => {
    // TODO: delete group
    res.send('delete group');
}

// update group
export const update_group = (req: Request, res: Response) => {
    // TODO: update group

    res.send('update group');
}

// get tasks of group
export const get_tasks_of_group = (req: Request, res: Response) => {
    // TODO: get tasks of group
    res.send('get tasks of group');
}
