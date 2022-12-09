// Task control functions
// Path: controller\taskController.ts
// Used in routes\task.ts to handle the request from client about task

import { Request, Response } from 'express';
// import { Task } from '../model/task';

// create task
export const create_task = (req: Request, res: Response) => {
    // TODO: create task
    res.send('create task');
}

// get task by id
export const get_task_by_id = (req: Request, res: Response) => {
    // TODO: get task by id
    res.send('get task by id');
}

// get task by user id
export const get_task_by_user_id = (req: Request, res: Response) => {
    // TODO: get task by user id
    res.send('get task by user id');
}

// modify task
export const modify_task = (req: Request, res: Response) => {
    // TODO: modify task
    res.send('modify task');
}

// delete task
export const delete_task = (req: Request, res: Response) => {
    // TODO: delete task
    res.send('delete task');
}

// get subtask by task id
export const get_subtask_by_task_id = (req: Request, res: Response) => {
    // TODO: get subtask by task id
    res.send('get subtask by task id');
}

// add subtask to task
export const add_subtask_to_task = (req: Request, res: Response) => {
    // TODO: add subtask to task
    res.send('add subtask to task');
}

// delete subtask from task
export const delete_subtask_from_task = (req: Request, res: Response) => {
    // TODO: delete subtask from task
    res.send('delete subtask from task');
}