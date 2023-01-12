"use strict";
// Task control functions
// Path: controller\taskController.ts
// Used in routes\task.ts to handle the request from client about task
Object.defineProperty(exports, "__esModule", { value: true });
exports.alter_subtask = exports.mark_subtask_as_done = exports.mark_task_as_done = exports.delete_subtask_from_task = exports.add_subtask_to_task = exports.get_subtasks_by_task_id = exports.delete_task = exports.modify_task = exports.get_task_by_user_id = exports.get_task_by_id = exports.create_task = void 0;
const task_1 = require("../model/task");
const dbRepo_1 = require("../controller/dbRepo");
// create task
const create_task = (req, res) => {
    var task_name = req.body.task.name || '';
    var task_creator = req.body.task.register_id || 0;
    var task_description = req.body.task.note || '';
    var ddl = new Date(req.body.task.deadline);
    var type = req.body.task.type || false;
    var priorty = req.body.task.priority || 0;
    var folder_id = req.body.belongs_folder_id || 0;
    var group_id = req.body.group_id || 0;
    var cycle = req.body.task.cycle || 0;
    var task = new task_1.Task(0, task_creator, task_name, task_description, type, priorty, ddl, group_id, folder_id, false, 0, cycle);
    dbRepo_1.db.createTask(task, (task_id) => {
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
    });
};
exports.create_task = create_task;
// get task by id
const get_task_by_id = (req, res) => {
    var task_id = parseInt(req.query['task_id']);
    dbRepo_1.db.getTaskByTaskId(task_id, (task) => {
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
    });
};
exports.get_task_by_id = get_task_by_id;
// get task by user id
const get_task_by_user_id = (req, res) => {
    var user_id = parseInt(req.query['user_id']);
    dbRepo_1.db.getTaskByUserId(user_id, (tasks) => {
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
    });
};
exports.get_task_by_user_id = get_task_by_user_id;
// modify task
const modify_task = (req, res) => {
    var task_id = req.body.task.task_id;
    dbRepo_1.db.getTaskByTaskId(task_id, (task) => {
        if (task !== null) {
            if (req.body.task.name !== undefined) {
                task.task_name = req.body.task.name;
            }
            if (req.body.task.note !== undefined) {
                task.task_description = req.body.task.note;
            }
            if (req.body.task.priority !== undefined) {
                task.task_priority = req.body.task.priority;
            }
            if (req.body.task.type !== undefined) {
                task.task_type = req.body.task.type;
            }
            if (req.body.task.deadline !== undefined) {
                task.task_ddl = new Date(req.body.task.deadline);
            }
            if (req.body.task.cycle !== undefined) {
                task.task_folder_id = req.body.belongs_folder_id;
            }
            if (req.body.group_id !== undefined) {
                task.task_group_id = req.body.group_id;
            }
            if (req.body.task.is_favor !== undefined) {
                task.task_isfavorite = req.body.is_favor;
            }
            if (req.body.task.cycle !== undefined) {
                task.cycle = req.body.task.cycle;
            }
            dbRepo_1.db.alertTaskInfo(task, (result) => {
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
            });
        }
        else {
            res.json({
                code: 400,
                message: 'failed: could not find task',
                data: {},
            });
        }
    });
};
exports.modify_task = modify_task;
// delete task
const delete_task = (req, res) => {
    var task_id = req.body.task.task_id || -1;
    dbRepo_1.db.deleteTask(task_id, (result) => {
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
    });
};
exports.delete_task = delete_task;
// get subtask by task id
const get_subtasks_by_task_id = (req, res) => {
    var task_id = parseInt(req.query['task_id']);
    dbRepo_1.db.getSubTasksByTaskId(task_id, (subtasks) => {
        if (subtasks !== null) {
            res.json({
                code: 200,
                message: 'success',
                data: subtasks,
            });
        }
        else {
            res.json({
                code: 400,
                message: 'failed',
                data: {},
            });
        }
    });
};
exports.get_subtasks_by_task_id = get_subtasks_by_task_id;
// add subtask to task
const add_subtask_to_task = (req, res) => {
    var task_id = req.body.task.task_id;
    var subtask_name = req.body.subtask.name;
    var subtask = new task_1.SubTask(0, subtask_name, 0, task_id);
    dbRepo_1.db.addSubTask(subtask, (subtask_id) => {
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
    });
};
exports.add_subtask_to_task = add_subtask_to_task;
// delete subtask from task
const delete_subtask_from_task = (req, res) => {
    var subtask_id = req.body.subtask.subtask_id;
    var task_id = req.body.subtask.task_id;
    dbRepo_1.db.deleteSubTask(task_id, subtask_id, (result) => {
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
    });
};
exports.delete_subtask_from_task = delete_subtask_from_task;
// mark task as done
const mark_task_as_done = (req, res) => {
    var task_id = req.body.task.task_id;
    dbRepo_1.db.getTaskByTaskId(task_id, (task) => {
        task.task_status = 1;
        dbRepo_1.db.alertTaskInfo(task, (result) => {
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
        });
    });
};
exports.mark_task_as_done = mark_task_as_done;
// mark subtask as done
const mark_subtask_as_done = (req, res) => {
    var subtask_id = req.body.subtask.subtask_id;
    var task_id = req.body.subtask.task_id;
    dbRepo_1.db.getSubTaskByIds(task_id, subtask_id, (subtask) => {
        subtask.subtask_status = 1;
        dbRepo_1.db.alertSubTaskInfo(subtask, (result) => {
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
        });
    });
};
exports.mark_subtask_as_done = mark_subtask_as_done;
function alter_subtask(req, res) {
    var task_id = req.body.task_id;
    var subtask_id = req.body.subtask_id;
    var subtask_name = req.body.content.subtask_name || '';
    dbRepo_1.db.getSubTaskByIds(task_id, subtask_id, (subtask) => {
        if (subtask !== null) {
            subtask.subtask_name = subtask_name;
            dbRepo_1.db.alertSubTaskInfo(subtask, (result) => {
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
                        message: 'failed: could not modify subtask',
                        data: {},
                    });
                }
            });
        }
        else {
            res.json({
                code: 400,
                message: 'failed: could not find subtask',
                data: {},
            });
        }
    });
}
exports.alter_subtask = alter_subtask;
