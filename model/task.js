"use strict";
// database table: user_task
// entity class: Task
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubTask = exports.Task = void 0;
class Task {
    constructor(task_id, task_creator, task_create_time, task_name, task_description, task_type, task_priority, task_ddl, task_group_id, task_note, task_isfavorite, task_folder_id, task_status) {
        this.task_id = task_id;
        this.task_creator = task_creator;
        this.task_create_time = task_create_time;
        this.task_name = task_name;
        this.task_description = task_description;
        this.task_type = task_type;
        this.task_priority = task_priority;
        this.task_ddl = task_ddl;
        this.task_group_id = task_group_id;
        this.task_note = task_note;
        this.task_isfavorite = task_isfavorite;
        this.task_folder_id = task_folder_id;
        this.task_status = task_status;
        this.subtasks_count = 0;
        this.subtasks = [];
    }
}
exports.Task = Task;
// subtask
class SubTask {
    constructor(subtask_id, subtask_name, subtask_description, subtask_status, subtask_task_id) {
        this.subtask_id = subtask_id;
        this.subtask_name = subtask_name;
        this.subtask_description = subtask_description;
        this.subtask_status = subtask_status;
        this.subtask_task_id = subtask_task_id;
    }
}
exports.SubTask = SubTask;
module.exports = { Task, SubTask };
