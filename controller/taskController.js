"use strict";
// Task control functions
// Path: controller\taskController.ts
// Used in routes\task.ts to handle the request from client about task
Object.defineProperty(exports, "__esModule", { value: true });
exports.mark_subtask_as_done = exports.mark_task_as_done = exports.delete_subtask_from_task = exports.add_subtask_to_task = exports.get_subtasks_by_task_id = exports.delete_task = exports.modify_task = exports.get_task_by_user_id = exports.get_task_by_id = exports.create_task = void 0;
const task_1 = require("../model/task");
const dbRepo_1 = require("../controller/dbRepo");
// create task
const create_task = (req, res) => {
    // TODO: create task
    // res.send('create task');
    var task_name = req.body.task.name;
    var task_creator = req.body.task.register_id;
    var task_description = req.body.task.note;
    var ddl = new Date(req.body.task.deadline);
    var type = req.body.task.type;
    var priorty = req.body.task.priority;
    var folder_id = req.body.belongs_folder_id;
    var group_id = req.body.group_id;
    var task = new task_1.Task(0, task_creator, task_name, task_description, type, priorty, ddl, group_id, folder_id);
    var task_id = dbRepo_1.db.createTask(task);
    if (task_id !== 0) {
        // create task success
        res.json({
            code: 200,
            message: 'success',
            data: {
                task_id: task_id,
            },
        });
    }
    else {
        // create task failed
        res.json({
            code: 400,
            message: 'failed',
            data: {},
        });
    }
};
exports.create_task = create_task;
// get task by id
const get_task_by_id = (req, res) => {
    // TODO: get task by id
    // res.send('get task by id');
    var task_id = req.body.task.task_id;
    var task = dbRepo_1.db.getTaskByTaskId(task_id);
    if (task !== null) {
        // get task success
        res.json({
            code: 200,
            message: 'success',
            data: task,
        });
    }
    else {
        // get task failed
        res.json({
            code: 400,
            message: 'failed',
            data: {},
        });
    }
};
exports.get_task_by_id = get_task_by_id;
// get task by user id
const get_task_by_user_id = (req, res) => {
    // TODO: get task by user id
    // res.send('get task by user id');
    var user_id = req.body.user.client_id;
    var tasks = dbRepo_1.db.getTaskByUserId(user_id);
    if (tasks !== null) {
        // get task success
        res.json({
            code: 200,
            message: 'success',
            data: tasks,
        });
    }
    else {
        // get task failed
        res.json({
            code: 400,
            message: 'failed',
            data: {},
        });
    }
};
exports.get_task_by_user_id = get_task_by_user_id;
// modify task
const modify_task = (req, res) => {
    // TODO: modify task
    // res.send('modify task');
    var task_id = req.body.task.task_id;
    var task = dbRepo_1.db.getTaskByTaskId(task_id);
    if (task !== null) {
        task.task_name = req.body.task.name;
        task.task_description = req.body.task.note;
        task.task_priority = req.body.task.priority;
        task.task_type = req.body.task.type;
        task.task_ddl = new Date(req.body.task.deadline);
        task.task_folder_id = req.body.belongs_folder_id;
        task.task_group_id = req.body.group_id;
        task.task_isfavorite = req.body.is_favor;
        var result = dbRepo_1.db.alertTaskInfo(task);
        if (result) {
            res.json({
                code: 200,
                message: 'success',
                data: {},
            });
        }
        else {
            res.json({
                code: 400,
                message: 'failed: could not modify task',
                data: {},
            });
        }
    }
    else {
        res.json({
            code: 400,
            message: 'failed: could not find task',
            data: {},
        });
    }
};
exports.modify_task = modify_task;
// delete task
const delete_task = (req, res) => {
    // TODO: delete task
    // res.send('delete task')
    var task_id = req.body.task.task_id;
    var result = dbRepo_1.db.deleteTask(task_id);
    if (result) {
        res.json({
            code: 200,
            message: 'success',
            data: {},
        });
    }
    else {
        res.json({
            code: 400,
            message: 'failed',
            data: {},
        });
    }
};
exports.delete_task = delete_task;
// get subtask by task id
const get_subtasks_by_task_id = (req, res) => {
    // TODO: get subtask by task id
    // res.send('get subtask by task id')
    var task_id = req.body.task.task_id;
    var subtasks = dbRepo_1.db.getSubTasksByTaskId(task_id);
};
exports.get_subtasks_by_task_id = get_subtasks_by_task_id;
// add subtask to task
const add_subtask_to_task = (req, res) => {
    // TODO: add subtask to task
    // res.send('add subtask to task')
    var task_id = req.body.task.task_id;
    var subtask_name = req.body.subtask.name;
    var description = req.body.subtask.description;
    // var subtask_creator = req.body.subtask.register_id
    var subtask = new task_1.SubTask(0, subtask_name, description, 0, task_id);
    var subtask_id = dbRepo_1.db.addSubTask(subtask);
    if (subtask_id !== -1) {
        // add subtask success
        res.json({
            code: 200,
            message: 'success',
            data: {
                subtask_id: subtask_id,
            },
        });
    }
    else {
        // add subtask failed
        res.json({
            code: 400,
            message: 'failed',
            data: {},
        });
    }
};
exports.add_subtask_to_task = add_subtask_to_task;
// delete subtask from task
const delete_subtask_from_task = (req, res) => {
    // TODO: delete subtask from task
    // res.send('delete subtask from task')
    var subtask_id = req.body.subtask.subtask_id;
    var task_id = req.body.subtask.task_id;
    var result = dbRepo_1.db.deleteSubTask(task_id, subtask_id);
    if (result) {
        res.json({
            code: 200,
            message: 'success',
            data: {},
        });
    }
    else {
        res.json({
            code: 400,
            message: 'failed',
            data: {},
        });
    }
};
exports.delete_subtask_from_task = delete_subtask_from_task;
// mark task as done
const mark_task_as_done = (req, res) => {
    // TODO: mark task as done
    // res.send('mark task as done')
    var task_id = req.body.task.task_id;
    var task = dbRepo_1.db.getTaskByTaskId(task_id);
    task.task_status = 1;
    var result = dbRepo_1.db.alertTaskInfo(task);
    if (result) {
        res.json({
            code: 200,
            message: 'success',
            data: {},
        });
    }
    else {
        res.json({
            code: 400,
            message: 'failed',
            data: {},
        });
    }
};
exports.mark_task_as_done = mark_task_as_done;
// mark subtask as done
const mark_subtask_as_done = (req, res) => {
    // TODO: mark subtask as done
    // res.send('mark subtask as done')
    var subtask_id = req.body.subtask.subtask_id;
    var task_id = req.body.subtask.task_id;
    var subtask = dbRepo_1.db.getSubTaskByIds(task_id, subtask_id);
    subtask.subtask_status = 1;
    var result = dbRepo_1.db.alertSubTaskInfo(subtask);
    if (result) {
        res.json({
            code: 200,
            message: 'success',
            data: {},
        });
    }
    else {
        res.json({
            code: 400,
            message: 'failed',
            data: {},
        });
    }
};
exports.mark_subtask_as_done = mark_subtask_as_done;
