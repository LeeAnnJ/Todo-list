"use strict";
// Task control functions
// Path: controller\taskController.ts
// Used in routes\task.ts to handle the request from client about task
Object.defineProperty(exports, "__esModule", { value: true });
exports.mark_subtask_as_done = exports.mark_task_as_done = exports.delete_subtask_from_task = exports.add_subtask_to_task = exports.get_subtask_by_task_id = exports.delete_task = exports.modify_task = exports.get_task_by_user_id = exports.get_task_by_id = exports.create_task = void 0;
// create task
const create_task = (req, res) => {
    // TODO: create task
    res.send('create task');
};
exports.create_task = create_task;
// get task by id
const get_task_by_id = (req, res) => {
    // TODO: get task by id
    res.send('get task by id');
};
exports.get_task_by_id = get_task_by_id;
// get task by user id
const get_task_by_user_id = (req, res) => {
    // TODO: get task by user id
    res.send('get task by user id');
};
exports.get_task_by_user_id = get_task_by_user_id;
// modify task
const modify_task = (req, res) => {
    // TODO: modify task
    res.send('modify task');
};
exports.modify_task = modify_task;
// delete task
const delete_task = (req, res) => {
    // TODO: delete task
    res.send('delete task');
};
exports.delete_task = delete_task;
// get subtask by task id
const get_subtask_by_task_id = (req, res) => {
    // TODO: get subtask by task id
    res.send('get subtask by task id');
};
exports.get_subtask_by_task_id = get_subtask_by_task_id;
// add subtask to task
const add_subtask_to_task = (req, res) => {
    // TODO: add subtask to task
    res.send('add subtask to task');
};
exports.add_subtask_to_task = add_subtask_to_task;
// delete subtask from task
const delete_subtask_from_task = (req, res) => {
    // TODO: delete subtask from task
    res.send('delete subtask from task');
};
exports.delete_subtask_from_task = delete_subtask_from_task;
// mark task as done
const mark_task_as_done = (req, res) => {
    // TODO: mark task as done
    res.send('mark task as done');
};
exports.mark_task_as_done = mark_task_as_done;
// mark subtask as done
const mark_subtask_as_done = (req, res) => {
    // TODO: mark subtask as done
    res.send('mark subtask as done');
};
exports.mark_subtask_as_done = mark_subtask_as_done;
