// Task control functions
// Path: controller\taskController.ts
// Used in routes\task.ts to handle the request from client about task

import { Request, Response } from 'express'
import { SubTask, Task } from '../model/task'
import { db } from '../controller/dbRepo'

// create task
export const create_task = (req: Request, res: Response) => {
    var task_name = req.body.task.name as string || ''
    var task_creator = req.body.task.register_id as number || 0
    var task_description = req.body.task.note as string || ''
    var ddl = new Date(req.body.task.deadline as string)
    var type = req.body.task.type as boolean || false
    var priorty = req.body.task.priority as number || 0
    var folder_id = req.body.belongs_folder_id as number || 0
    var group_id = req.body.group_id as number || 0
    var cycle = req.body.task.cycle as number || 0

    var task = new Task(
        0,
        task_creator,
        new Date(),
        task_name,
        task_description,
        type,
        priorty,
        ddl,
        group_id,
        folder_id,
        false,
        0,
        cycle,
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
            if (req.body.task.name !== undefined) {
                task.task_name = req.body.task.name
            }
            if (req.body.task.note !== undefined) {
                task.task_description = req.body.task.note
            }
            if (req.body.task.priority !== undefined) {
                task.task_priority = req.body.task.priority
            }
            if (req.body.task.type !== undefined) {
                task.task_type = req.body.task.type
            }
            if (req.body.task.deadline !== undefined) {
                task.task_ddl = new Date(req.body.task.deadline)
            }
            if (req.body.task.cycle !== undefined) {
                task.task_folder_id = req.body.belongs_folder_id
            }
            if (req.body.group_id !== undefined) {
                task.task_group_id = req.body.group_id
            }
            if (req.body.task.is_favor !== undefined) {
                task.task_isfavorite = req.body.is_favor
            }
            if (req.body.task.cycle !== undefined) {
                task.cycle = req.body.task.cycle
            }

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
    var task_id = req.body.task.task_id as number || -1
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
    var task_id = req.body.task.task_id
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
    var subtask_id = req.body.subtask.subtask_id
    var task_id = req.body.subtask.task_id
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
    var task_id = req.body.task.task_id
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

export function alter_subtask(req: Request, res: Response) {
    var task_id = req.body.task_id
    var subtask_id = req.body.subtask_id
    var subtask_name = req.body.content.subtask_name as string || ''

    db.getSubTaskByIds(task_id, subtask_id, (subtask: SubTask) => {
        if (subtask !== null) {
            subtask.subtask_name = subtask_name

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
                        message: 'failed: could not modify subtask',
                        data: {},
                    })
                }
            })
        } else {
            res.json({
                code: 400,
                message: 'failed: could not find subtask',
                data: {},
            })
        }
    })
}
