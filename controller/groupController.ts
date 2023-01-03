// group controller functions
// Path: controller\groupController.ts
// used in routes\group.ts to handle the request from client about group

import { Request, Response } from 'express'
import { Group, GroupAccount } from '../model/group'
import { db } from '../controller/dbRepo'
import { Task } from '../model/task'

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
    db.createGroup(group, (group_account_id: number) => {
        if (group_account_id !== 0) {
            // create group success
            res.json({
                code: 200,
                message: 'success',
                data: {
                    group_id: group_account_id,
                },
            })
        } else {
            // create group fail
            res.json({
                code: 400,
                message: 'fail',
                data: null,
            })
        }
    })
}

// get group by id
export const get_group_by_id = (req: Request, res: Response) => {
    // var group = req.body.group;

    var group_id = req.body.group.group_id
    db.getGroupById(group_id, (group: Group) => {
        if (group !== null) {
            // get group success
            res.json({
                code: 200,
                message: 'success',
                data: group,
            })
        } else {
            // get group failed
            res.json({
                code: 400,
                message: 'failed',
                data: null,
            })
        }
    })
}

// get the task owner of group
export const get_task_owner_of_group = (req: Request, res: Response) => {
    // TODO: get task owner of group
    // res.send('get task owner of group');

    var group_id = req.body.group.group_id
    db.getGroupCreaterId(group_id, (task_owner: number) => {
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
                code: 400,
                message: 'failed',
                data: {},
            })
        }
    })
}

// get the members of group
export const get_members_of_group = (req: Request, res: Response) => {
    // res.send('get members of group');

    var group_id = req.body.group.group_id
    db.getGroupMembers(group_id, (members: number[]) => {
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
                code: 400,
                message: 'failed',
                data: {},
            })
        }
    })
}

// get user's groups
export const get_user_groups = (req: Request, res: Response) => {
    // res.send('get user groups');

    var user_id = req.body.user.client_id
    db.getUserGroups(user_id, (groups: GroupAccount[]) => {
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
                code: 400,
                message: 'failed',
                data: {},
            })
        }
    })
}

// add member to group
export const add_member_to_group = (req: Request, res: Response) => {
    // TODO: add member to group
    // res.send('add member to group');
    var group_id = req.body.group.group_id
    var member_id = req.body.group.member_id

    db.addMemberToGroup(group_id, member_id, (isSucc: Boolean) => {
        if (isSucc) {
            // add member to group success
            res.json({
                code: 200,
                message: 'success',
            })
        } else {
            // add member to group failed
            res.json({
                code: 400,
                message: 'failed',
                data: {},
            })
        }
    })
}

// remove member from group
export const remove_member_from_group = (req: Request, res: Response) => {
    // TODO: remove member from group
    // res.send('remove member from group');

    var group_id = req.body.group.group_id
    var member_id = req.body.group.member_id

    db.deleteMemberFromGroup(group_id, member_id, (isSucc: Boolean) => {
        if (isSucc) {
            // remove member from group success
            res.json({
                code: 200,
                message: 'success',
            })
        } else {
            // remove member from group failed
            res.json({
                code: 400,
                message: 'failed',
                data: {},
            })
        }
    })
}

// delete group
export const delete_group = (req: Request, res: Response) => {
    // TODO: delete group
    // res.send('delete group')
    var group_id = req.body.group.group_id
    db.deleteGroup(group_id, (isSucc: Boolean) => {
        if (isSucc) {
            // delete group success
            res.json({
                code: 200,
                message: 'success',
            })
        } else {
            // delete group failed
            res.json({
                code: 400,
                message: 'failed',
                data: {},
            })
        }
    })
}

// update group
export const update_group = (req: Request, res: Response) => {
    // TODO: update group
    var group = req.body.group

    db.alertGroupInfo(group, (isSucc: Boolean) => {
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
                code: 400,
                message: 'failed',
                data: {},
            })
        }
    })
}

// get tasks of group
export const get_tasks_of_group = (req: Request, res: Response) => {
    // TODO: get tasks of group -> about task.
    // res.send('get tasks of group')

    var group_id = req.body.group.group_id
    var tasks = db.getGroupTasks(group_id, (tasks: Task[]) => {
        if (tasks !== null) {
            // get tasks success
            res.json({
                code: 200,
                message: 'success',
                data: {
                    tasks: tasks,
                },
            })
        } else {
            // get tasks failed
            res.json({
                code: 500,
                message: 'failed',
                data: {},
            })
        }
    })
}

// alert 
