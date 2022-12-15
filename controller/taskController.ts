// Task control functions
// Path: controller\taskController.ts
// Used in routes\task.ts to handle the request from client about task

import { Request, Response } from 'express'
import { Task } from '../model/task'
import { db } from '../controller/dbRepo'

// create task
export const create_task = (req: Request, res: Response) => {
    // TODO: create task
    // res.send('create task');
    var task_name = req.body.task.name
    var task_creator = req.body.task.register_id
    var task_description = req.body.task.note
    var ddl = new Date(req.body.task.deadline)
    var type = req.body.task.type
    var priorty = req.body.task.priority
    var folder_id = req.body.belongs_folder_id
    var group_id = req.body.group_id

    var task = new Task(
        0,
        task_creator,
        task_name,
        task_description,
        type,
        priorty,
        ddl,
        group_id,
        folder_id,
    )

    var task_id = db.createTask(task)
    if (task_id !== 0) {
        // create task success
        res.json({
            code: 200,
            message: 'success',
            data: {
                task_id: task_id,
            },
        })
    } else {
        // create task failed
        res.json({
            code: 400,
            message: 'failed',
            data: {},
        })
    }
}

// get task by id
export const get_task_by_id = (req: Request, res: Response) => {
    // TODO: get task by id
    // res.send('get task by id');

    var task_id = req.body.task.task_id
    var task = db.getTaskByTaskId(task_id)

    if (task !== null) {
        // get task success
        res.json({
            code: 200,
            message: 'success',
            data: task,
        })
    } else {
        // get task failed
        res.json({
            code: 400,
            message: 'failed',
            data: {},
        })
    }
}

// get task by user id
export const get_task_by_user_id = (req: Request, res: Response) => {
    // TODO: get task by user id
    // res.send('get task by user id');

    var user_id = req.body.user.client_id
    var tasks = db.getTaskByUserId(user_id)

    if (tasks !== null) {
        // get task success
        res.json({
            code: 200,
            message: 'success',
            data: tasks,
        })
    } else {
        // get task failed
        res.json({
            code: 400,
            message: 'failed',
            data: {},
        })
    }
}

// modify task
export const modify_task = (req: Request, res: Response) => {
    // TODO: modify task
    // res.send('modify task');

    var task_id = req.body.task.task_id
    var task = db.getTaskByTaskId(task_id)

    if (task !== null) {
        task.task_name = req.body.task.name
        task.task_description = req.body.task.note
        task.task_priority = req.body.task.priority
        task.task_type = req.body.task.type
        task.task_ddl = new Date(req.body.task.deadline)
        task.task_folder_id = req.body.belongs_folder_id
        task.task_group_id = req.body.group_id
        task.task_isfavorite = req.body.is_favor

        var result = db.alertTaskInfo(task)

        if (result) {
            res.json({
                code: 200,
                message: 'success',
                data: {},
            })
        } else {
            res.json({
                code: 400,
                message: 'failed: could not modify task',
                data: {},
            })
        }
    } else {
        res.json({
            code: 400,
            message: 'failed: could not find task',
            data: {},
        })
    }
}

// delete task
export const delete_task = (req: Request, res: Response) => {
    // TODO: delete task
    // res.send('delete task')

    var task_id = req.body.task.task_id
    var result = db.deleteTask(task_id)

    if (result) {
        res.json({
            code: 200,
            message: 'success',
            data: {},
        })
    } else {
        res.json({
            code: 400,
            message: 'failed',
            data: {},
        })
    }
}

// get subtask by task id
export const get_subtasks_by_task_id = (req: Request, res: Response) => {
    // TODO: get subtask by task id
    // res.send('get subtask by task id')

    var task_id = req.body.task.task_id
    var subtasks = db.getSubTasksByTaskId(task_id)

}

export const get_subtask_by_task_ids = (req: Request, res: Response) => {
    // TODO: get subtask by task ids
    res.send('get subtask by task ids')
}

// add subtask to task
export const add_subtask_to_task = (req: Request, res: Response) => {
    // TODO: add subtask to task
    res.send('add subtask to task')
}

// delete subtask from task
export const delete_subtask_from_task = (req: Request, res: Response) => {
    // TODO: delete subtask from task
    res.send('delete subtask from task')
}

// mark task as done
export const mark_task_as_done = (req: Request, res: Response) => {
    // TODO: mark task as done
    res.send('mark task as done')
}

// mark subtask as done
export const mark_subtask_as_done = (req: Request, res: Response) => {
    // TODO: mark subtask as done
    res.send('mark subtask as done')
}
