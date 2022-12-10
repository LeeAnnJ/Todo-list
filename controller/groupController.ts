// group controller functions
// Path: controller\groupController.ts
// used in routes\group.ts to handle the request from client about group

import { Request, Response } from 'express';
import { Group, GroupAccount } from '../model/group';
import { db } from '../controller/dbRepo';

// create group
export const create_group = (req: Request, res: Response) => {
    // TODO: create group
    res.send('create group');
    var group_name = req.body.group.group_name;
    var group_description = req.body.group.group_description;
    var group_creator = req.body.group.group_creator;
    var group_create_time = new Date();
    var group = new Group(0, group_name, group_description, group_create_time, group_creator);
    var group_account_id = db.createGroup(group);
    if (group_account_id !== 0) {
        
    }
}

// get group by id
export const get_group_by_id = (req: Request, res: Response) => {
    // TODO: get group by id
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
