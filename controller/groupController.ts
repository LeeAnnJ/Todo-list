// group controller functions
// Path: controller\groupController.ts
// used in routes\group.ts to handle the request from client about group

import { Request, Response } from 'express';
import { Group, GroupAccount } from '../model/group';

// create group
export const create_group = (req: Request, res: Response) => {
    // TODO: create group
    res.send('create group');
}

// get group by id
export const get_group_by_id = (req: Request, res: Response) => {
    // TODO: get group by id
    res.send('get group by id');
}

// get owner of group
export const get_owner_of_group = (req: Request, res: Response) => {
    // TODO: get owner of group
    res.send('get owner of group');
}

// get the task owner of group
export const get_task_owner_of_group = (req: Request, res: Response) => {
    // TODO: get task owner of group
    res.send('get task owner of group');
}

