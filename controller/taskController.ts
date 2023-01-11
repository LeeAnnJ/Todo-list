// Task control functions
// Path: controller\taskController.ts
// Used in routes\task.ts to handle the request from client about task

import { Request, Response } from 'express'
import { SubTask, Task } from '../model/task'
import { db } from '../controller/dbRepo'

// create task
export const create_task = (req: Request, res: Response) => {
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

    db.createTask(task, (task_id: number) => {
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
    })
}

// get task by id
export const get_task_by_id = (req: Request, res: Response) => {
    var task_id = parseInt(req.query['task_id'] as string)
    db.getTaskByTaskId(task_id, (task: Task) => {
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
    })
}

// get task by user id
export const get_task_by_user_id = (req: Request, res: Response) => {
    var user_id = parseInt(req.query['user_id'] as string)
    db.getTaskByUserId(user_id, (tasks: Task[]) => {
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
    })
}

// modify task
export const modify_task = (req: Request, res: Response) => {
    var task_id = req.body.task.task_id
    db.getTaskByTaskId(task_id, (task: Task) => {
        if (task !== null) {
            task.task_name = req.body.task.name
            task.task_description = req.body.task.note
            task.task_priority = req.body.task.priority
            task.task_type = req.body.task.type
            task.task_ddl = new Date(req.body.task.deadline)
            task.task_folder_id = req.body.belongs_folder_id
            task.task_group_id = req.body.group_id
            task.task_isfavorite = req.body.is_favor

            db.alertTaskInfo(task, (result: boolean) => {
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
            })
        } else {
            res.json({
                code: 400,
                message: 'failed: could not find task',
                data: {},
            })
        }
    })
}

// delete task
export const delete_task = (req: Request, res: Response) => {
    var task_id = req.body.task_id
    db.deleteTask(task_id, (result: boolean) => {
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
    })
}

// get subtask by task id
export const get_subtasks_by_task_id = (req: Request, res: Response) => {
    var task_id = parseInt(req.query['task_id'] as string)
    db.getSubTasksByTaskId(task_id, (subtasks: SubTask[]) => {
        if (subtasks !== null) {
            res.json({
                code: 200,
                message: 'success',
                data: subtasks,
            })
        } else {
            res.json({
                code: 400,
                message: 'failed',
                data: {},
            })
        }
    })
}

// add subtask to task
export const add_subtask_to_task = (req: Request, res: Response) => {
    var task_id = req.body.task_id
    var subtask_name = req.body.subtask.name

    var subtask = new SubTask(0, subtask_name, 0, task_id)

    db.addSubTask(subtask, (subtask_id: number) => {
        if (subtask_id !== -1) {
            // add subtask success
            res.json({
                code: 200,
                message: 'success',
                data: {
                    subtask_id: subtask_id,
                },
            })
        } else {
            // add subtask failed
            res.json({
                code: 400,
                message: 'failed',
                data: {},
            })
        }
    })
}

// delete subtask from task
export const delete_subtask_from_task = (req: Request, res: Response) => {
    var subtask_id = req.body.subtask_id
    var task_id = req.body.task_id
    db.deleteSubTask(task_id, subtask_id, (result: boolean) => {
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
    })
}

// mark task as done
export const mark_task_as_done = (req: Request, res: Response) => {
    var task_id = req.body.task_id
    db.getTaskByTaskId(task_id, (task: Task) => {
        task.task_status = 1
        db.alertTaskInfo(task, (result: boolean) => {
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
        })
    })
}

// mark subtask as done
export const mark_subtask_as_done = (req: Request, res: Response) => {
    var subtask_id = req.body.subtask.subtask_id
    var task_id = req.body.subtask.task_id
    db.getSubTaskByIds(task_id, subtask_id, (subtask: SubTask) => {
        subtask.subtask_status = 1
        db.alertSubTaskInfo(subtask, (result: boolean) => {
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
        })
    })
}
