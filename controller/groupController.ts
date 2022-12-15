// group controller functions
// Path: controller\groupController.ts
// used in routes\group.ts to handle the request from client about group

import { Request, Response } from 'express'
import { Group, GroupAccount } from '../model/group'
import { db } from '../controller/dbRepo'

// create group
export const create_group = (req: Request, res: Response) => {
    res.send('create group')
    var group_name = req.body.group.group_name
    var group_description = req.body.group.group_description
    var group_creator = req.body.group.group_creator
    var group_create_time = new Date()
    var group = new Group(
        0,
        group_name,
        group_description,
        group_create_time,
        group_creator,
    )
    var group_account_id = db.createGroup(group)
    if (group_account_id !== 0) {
        // create group success
        res.json({
            code: 200,
            message: 'success',
            data: {
                group_id: group_account_id,
            },
        })
    }
}

// get group by id
export const get_group_by_id = (req: Request, res: Response) => {
    // var group = req.body.group;
    // res.send('get group by id');

    var group_id = req.body.group.group_id
    var group = db.getGroupById(group_id)
    if (group !== null) {
        // get group success
        res.json({
            code: 200,
            message: 'success',
            data: group,
        })
    }
}

// get the creater of group
export const get_task_owner_of_group = (req: Request, res: Response) => {
    // TODO: get task owner of group
    // res.send('get task owner of group');

    var group_id = req.body.group.group_id
    var task_owner = db.getGroupCreaterId(group_id)
    if (task_owner !== 0) {
        // get task owner success
        res.json({
            code: 200,
            message: 'success',
            data: {
                group_creater_id: task_owner,
            },
        })
    } else {
        // get task owner failed
        res.json({
            code: 500,
            message: 'failed',
            data: {},
        })
    }
}

// get the members of group
export const get_members_of_group = (req: Request, res: Response) => {
    // TODO: get members of group
    // res.send('get members of group');

    var group_id = req.body.group.group_id
    var members = db.getGroupMembers(group_id)
    if (members !== null) {
        // get members success
        res.json({
            code: 200,
            message: 'success',
            data: {
                members: members,
            },
        })
    } else {
        // get members failed
        res.json({
            code: 500,
            message: 'failed',
            data: {},
        })
    }
}

// get user's groups
export const get_user_groups = (req: Request, res: Response) => {
    // TODO: get user's groups
    // res.send('get user groups');

    var user_id = req.body.user.client_id
    var groups = db.getUserGroups(user_id)

    if (groups !== null) {
        // get user groups success
        res.json({
            code: 200,
            message: 'success',
            data: {
                groups: groups,
            },
        })
    } else {
        // get user groups failed
        res.json({
            code: 500,
            message: 'failed',
            data: {},
        })
    }
}

// add member to group
export const add_member_to_group = (req: Request, res: Response) => {
    // TODO: add member to group
    // res.send('add member to group');
    var group_id = req.body.group.group_id
    var member_id = req.body.group.member_id

    var isSucc = db.addMemberToGroup(group_id, member_id)
    if (isSucc) {
        // add member to group success
        res.json({
            code: 200,
            message: 'success',
        })
    } else {
        // add member to group failed
        res.json({
            code: 500,
            message: 'failed',
            data: {},
        })
    }
}

// remove member from group
export const remove_member_from_group = (req: Request, res: Response) => {
    // TODO: remove member from group
    // res.send('remove member from group');

    var group_id = req.body.group.group_id
    var member_id = req.body.group.member_id

    var isSucc = db.deleteMemberFromGroup(group_id, member_id)
    if (isSucc) {
        // remove member from group success
        res.json({
            code: 200,
            message: 'success',
        })
    } else {
        // remove member from group failed
        res.json({
            code: 500,
            message: 'failed',
            data: {},
        })
    }
}

// delete group
export const delete_group = (req: Request, res: Response) => {
    // TODO: delete group
    // res.send('delete group')
    var group_id = req.body.group.group_id
    var isSucc = db.deleteGroup(group_id)
    if (isSucc) {
        // delete group success
        res.json({
            code: 200,
            message: 'success',
        })
    } else {
        // delete group failed
        res.json({
            code: 500,
            message: 'failed',
            data: {},
        })
    }
}

// update group
export const alert_group_info = (req: Request, res: Response) => {
    // TODO: update group
    // res.send('update group')
    // var group_id = req.body.group.group_id
    var group = req.body.group

    var isSucc = db.alertGroupInfo(group)
    if (isSucc) {
        // update group success
        res.json({
            code: 200,
            message: 'success',
            data: {
                group,
            },
        })
    } else {
        // update group failed
        res.json({
            code: 500,
            message: 'failed',
            data: {},
        })
    }
}

// get tasks of group
export const get_tasks_of_group = (req: Request, res: Response) => {
    // TODO: get tasks of group -> about task.
    res.send('get tasks of group')

}
