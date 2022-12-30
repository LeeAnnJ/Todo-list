"use strict";
// the database repository class
// this class is responsible for all database operations
// it is a singleton class
// In this project, we use the mysql database(when developing, we will use the mariaDB database when releasing)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// require the mysql module
const mysql_1 = __importDefault(require("mysql"));
// import the database configuration
// import { dbConfig } from '../config/dbConfig';
// var config = dbConfig.development;
const dbConfig = require('../config/dbConfig');
var config = dbConfig.development;
// import the entity classes
const account_1 = require("../model/account");
const group_1 = require("../model/group");
const folder_1 = require("../model/folder");
const task_1 = require("../model/task");
const message_1 = require("../model/message");
// 7 tables in total
// the database repository class
class DbRepo {
    // the constructor
    constructor() {
        // create a database connection
        this.connection = mysql_1.default.createConnection({
            host: config.host,
            user: config.user,
            port: config.port,
            password: config.password,
            database: config.database
        });
        // connect to the database
        this.connection.connect();
    }
    // get the database repository instance
    static getInstance() {
        if (!this.instance) {
            this.instance = new DbRepo();
        }
        return this.instance;
    }
    // create a database
    // 但是连接直接指定了数据库，所以这个方法不需要
    createDatabase() {
        // create a database
        return undefined;
    }
    // create a table
    // 数据库直接在navicat制定了，所以只作为启动时的备用
    createTable() {
        // TODO: create tables
        return undefined;
    }
    //////////////////////////// Account ////////////////////////////
    // login
    login(user_name, passwd_hash) {
        // login
        this.connection.query('SELECT * FROM user_info WHERE user_name = \'' + mysql_1.default.escape(user_name) + '\' AND passwd_hash = \'' + mysql_1.default.escape(passwd_hash) + '\'', (err, result) => {
            if (err) {
                // console.log(err);
                return 0;
            }
            // console.log(result);
            return result.client_id;
        });
        return 0;
    }
    // create a user account
    createAccount(account) {
        var values = {
            user_name: account.user_name,
            passwd_hash: account.password_hash,
            register_time: account.register_time
        };
        var sql = 'INSERT INTO user_info (user_name, passwd_hash, register_time) VALUES (\'' + values.user_name + '\', \'' + values.passwd_hash + '\', \'' + values.register_time + '\')';
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                // console.log('Account created');
                // return client_id
                sql = 'SELECT client_id FROM user_info WHERE user_name = \'' + values.user_name + '\' AND passwd_hash = \'' + values.passwd_hash + '\'';
                this.connection.query(sql, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    return result.client_id;
                });
            }
        });
        return 0;
    }
    // get user by id
    getUserById(client_id) {
        var sql = 'SELECT * FROM user_info WHERE client_id = ' + client_id;
        var res = new account_1.Account(0, '', '', '', new Date(), '');
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res = new account_1.Account(result.client_id, result.user_name, result.passwd_hash, result.avatar_path, result.register_time, result.intro);
                console.log(result);
            }
        });
        return res;
    }
    // alert user info(by client_id)
    alertUserInfo(acc_new) {
        var sql = 'UPDATE user_info SET user_name = \'' + acc_new.user_name + '\', passwd_hash = \'' + acc_new.password_hash + '\', avatar_path = \'' + acc_new.avatar_path + '\', intro = \'' + acc_new.introduction + '\' WHERE client_id = ' + acc_new.client_id;
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return false;
            }
            else {
                return true;
            }
        });
        return false;
    }
    // change user avatar
    changeAvatar(client_id, avatar_path) {
        var sql = 'UPDATE user_info SET avatar_path = \'' + avatar_path + '\' WHERE client_id = ' + client_id;
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return false;
            }
            else {
                return true;
            }
        });
        return false;
    }
    // delete a user account
    deleteAccount(client_id) {
        var sql = 'DELETE FROM user_info WHERE client_id = ' + client_id;
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return false;
            }
            else {
                return true;
            }
        });
        return false;
    }
    /**
     * check if the user name is already used
     * @param user_name user name.
     * @returns if the user name is already used or something wrong happened when checking , return true, else return false.
     */
    checkUserName(user_name) {
        var sql = 'SELECT * FROM user_info WHERE user_name = \'' + user_name + '\'';
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return true;
            }
            else {
                if (result.length == 0) {
                    return false;
                }
                else {
                    return true;
                }
            }
        });
        return true;
    }
    //////////////////////////// Group ////////////////////////////
    // create a group
    createGroup(group) {
        var values = {
            group_name: group.group_name,
            group_description: group.group_description,
            group_creator: group.group_creator,
            group_create_time: group.group_create_time
        };
        var sql = 'INSERT INTO group_info (group_name, group_description, group_creator, group_create_time) VALUES (' + values.group_name + ', ' + values.group_description + ', ' + values.group_creator + ', ' + values.group_create_time + ')';
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Group created');
                // return group_id
                sql = 'SELECT group_id FROM group_info WHERE group_name = \'' + values.group_name + '\' AND group_creator = ' + values.group_creator;
                this.connection.query(sql, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    // TODO: Add the creater to the group
                    return result.group_id;
                });
            }
        });
        return 0;
    }
    ;
    // get group by id
    getGroupById(group_id) {
        var sql = 'SELECT * FROM group_info WHERE group_id = ' + group_id;
        var res = new group_1.Group(0, '', '', new Date(), 0);
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res = new group_1.Group(result.group_id, result.group_name, result.group_description, result.group_creator, result.group_create_time);
                console.log(result);
            }
        });
        return res;
    }
    // get members of a group
    getGroupMembers(group_id) {
        var sql = 'SELECT * FROM group_member WHERE group_id = ' + group_id;
        var res = [];
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                for (var i = 0; i < result.length; i++) {
                    res.push(this.getUserById(result[i].client_id));
                }
                console.log(result);
            }
        });
        return res;
    }
    // get group creater
    getGroupCreaterId(group_id) {
        var sql = 'SELECT creater_id FROM group_info WHERE group_id = ' + group_id;
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                return result;
            }
        });
        return 0;
    }
    // alert group info(by group_id)
    alertGroupInfo(group_new) {
        var sql = 'UPDATE group_info SET group_name = \'' + group_new.group_name + '\', group_description = \'' + group_new.group_description + '\' WHERE group_id = ' + group_new.group_id;
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return false;
            }
            else {
                return true;
            }
        });
        return false;
    }
    // get groups of a user
    getUserGroups(client_id) {
        var sql = 'SELECT * FROM group_member WHERE client_id = ' + client_id;
        var res = [];
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                for (var i = 0; i < result.length; i++) {
                    res.push(this.getGroupById(result[i].group_id));
                }
                // console.log(result);
            }
        });
        return res;
    }
    // add a member to a group
    // FIXME: change the number of members in group_info
    // Maybe we should use a Transaction to do this
    // Mysql: START TRANSACTION; INSERT INTO group_member (group_id, client_id) VALUES (1, 1); UPDATE group_info SET group_member_num = group_member_num + 1 WHERE group_id = 1; COMMIT;
    addMemberToGroup(group_id, client_id) {
        var values = {
            group_id: group_id,
            client_id: client_id
        };
        // var sql = 'INSERT INTO group_member (group_id, client_id) VALUES (' + values.group_id + ', ' + values.client_id + ')';
        var sql = 'START TRANSACTION; INSERT INTO group_member (group_id, client_id) VALUES ( ' + values.group_id + ', ' + values.client_id + '); UPDATE group_info SET group_member_num = group_member_num + 1 WHERE group_id = ' + values.group_id + '; COMMIT;';
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return false;
            }
            else {
                return true;
            }
        });
        return false;
    }
    // delete a member from a group
    // FIXME: change the number of members in group_info
    // Maybe we should use a Transaction to do this
    // Mysql: START TRANSACTION; DELETE FROM group_member WHERE group_id = 1 AND client_id = 1; UPDATE group_info SET group_member_num = group_member_num - 1 WHERE group_id = 1; COMMIT;
    deleteMemberFromGroup(group_id, client_id) {
        // FIXME: Check if the user is the creater of the group
        var sql = 'START TRANSACTION; DELETE FROM group_member WHERE group_id = ' + group_id + ' AND client_id = ' + client_id + '; UPDATE group_info SET group_member_num = group_member_num - 1 WHERE group_id = ' + group_id + '; COMMIT;';
        // var sql = 'DELETE FROM group_member WHERE group_id = ' + group_id + ' AND client_id = ' + client_id;
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return false;
            }
            else {
                // FIXME: change the number of members in group_info
                return true;
            }
        });
        return false;
    }
    // delete a group
    deleteGroup(group_id) {
        var sql = 'DELETE FROM group_info WHERE group_id = ' + group_id;
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return false;
            }
            else {
                return true;
            }
        });
        return false;
    }
    //////////////////////////// Folder ////////////////////////////
    // get folders of a user
    getUserFolders(client_id) {
        var sql = 'SELECT * FROM folder_info WHERE client_id = ' + client_id;
        var res = [];
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                for (var i = 0; i < result.length; i++) {
                    res.push(new folder_1.Folder(result[i].folder_id, result[i].folder_name, result[i].folder_description, result[i].folder_creator));
                }
                console.log(result);
            }
        });
        return res;
    }
    // create a folder
    createFolder(folder) {
        var values = {
            client_id: folder.client_id,
            folder_id: folder.folder_id,
            folder_name: folder.folder_name,
            folder_description: folder.folder_description,
        };
        var sql = 'INSERT INTO folder_info (client_id, folder_name, folder_description) VALUES (' + values.client_id + ', ' + values.folder_name + ', ' + values.folder_description + ')';
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Folder created');
                // return folder_id
                sql = 'SELECT folder_id FROM folder_info WHERE folder_name = \'' + values.folder_name + '\' AND client_id = ' + values.client_id;
                this.connection.query(sql, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    return result.folder_id;
                });
            }
        });
        return 0;
    }
    // alert folder info(by client_i and folder_id)
    alertFolderInfo(folder_new) {
        var sql = 'UPDATE folder_info SET folder_name = \'' + folder_new.folder_name + '\', folder_description = \'' + folder_new.folder_description + '\' WHERE folder_id = ' + folder_new.folder_id + ' AND client_id = ' + folder_new.client_id;
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return false;
            }
            else {
                return true;
            }
        });
        return false;
    }
    // delete a folder
    deleteFolder(folder_id) {
        var sql = 'DELETE FROM folder_info WHERE folder_id = ' + folder_id;
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return false;
            }
            else {
                return true;
            }
        });
        return false;
    }
    // get tasks of a folder
    getFolderTasks(folder_id) {
        var sql = 'SELECT * FROM task_info WHERE task_folder = ' + folder_id + ' AND task_group = 0';
        var res = [];
        return res;
    }
    //////////////////////////// Task ////////////////////////////
    // get tasks of a user
    getUserTasks(client_id) {
        var sql = 'SELECT * FROM task_info WHERE client_id = ' + client_id;
        var res = [];
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                for (var i = 0; i < result.length; i++) {
                    // TODO: task constructor
                    // res.push(new Task(result[i].task_id, result[i].task_name, result[i].task_description, result[i].task_creator, result[i].task_group, result[i].task_folder, result[i].task_deadline, result[i].task_priority, result[i].task_status));
                }
            }
        });
        return res;
    }
    // create a task
    createTask(task) {
        var values = {
            client_id: task.task_creator,
            task_id: task.task_id,
            task_name: task.task_name,
            task_description: task.task_description,
            task_group: task.task_group_id,
            task_folder: task.task_folder_id,
            task_deadline: task.task_ddl,
            task_priority: task.task_priority,
            task_status: task.task_status
        };
        var sql = 'INSERT INTO task_info (client_id, task_name, task_description, task_group, task_folder, task_deadline, task_priority, task_status) VALUES (' + values.client_id + ', ' + values.task_name + ', ' + values.task_description + ', ' + values.task_group + ', ' + values.task_folder + ', ' + values.task_deadline + ', ' + values.task_priority + ', ' + values.task_status + ')';
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Task created');
                // return task_id
                sql = 'SELECT task_id FROM task_info WHERE task_name = \'' + values.task_name + '\' AND client_id = ' + values.client_id;
                this.connection.query(sql, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    return result.task_id;
                });
            }
        });
        return 0;
    }
    // get task by user_id
    getTaskByUserId(client_id) {
        var sql = 'SELECT * FROM task_info WHERE client_id = ' + client_id;
        var res = [];
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                for (var i = 0; i < result.length; i++) {
                    // TODO: task constructor
                    // res.push(new Task(result[i].task_id, result[i].task_name, result[i].task_description, result[i].task_creator, result[i].task_group, result[i].task_folder, result[i].task_deadline, result[i].task_priority, result[i].task_status));
                }
            }
        });
        return res;
    }
    // get task by task_id
    getTaskByTaskId(task_id) {
        var sql = 'SELECT * FROM task_info WHERE task_id = ' + task_id;
        var res = new task_1.Task(0, 0, "", "", false, 0, new Date, 0);
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
            }
        });
        return res;
    }
    // alert task info
    alertTaskInfo(task_new) {
        var sql = 'UPDATE task_info SET task_name = \'' + task_new.task_name + '\', task_description = \'' + task_new.task_description + '\', task_group = ' + task_new.task_group_id + ', task_folder = ' + task_new.task_folder_id + ', task_deadline = ' + task_new.task_ddl + ', task_priority = ' + task_new.task_priority + ', task_status = ' + task_new.task_status + ' WHERE task_id = ' + task_new.task_id;
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return false;
            }
            else {
                return true;
            }
        });
        return false;
    }
    // delete a task
    deleteTask(task_id) {
        var sql = 'DELETE FROM task_info WHERE task_id = ' + task_id;
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return false;
            }
            else {
                return true;
            }
        });
        return false;
    }
    // get tasks of a group
    getGroupTasks(group_id) {
        var sql = 'SELECT * FROM task_info WHERE task_group = ' + group_id;
        var res = [];
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                for (var i = 0; i < result.length; i++) {
                    // TODO: task constructor
                }
            }
        });
        return res;
    }
    // get sub tasks of a task
    getSubTasksByTaskId(task_id) {
        var sql = 'SELECT * FROM task_info WHERE task_group = ' + task_id;
        var res = [];
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                for (var i = 0; i < result.length; i++) {
                    // res.push(new SubTask(result[i].subtask_id, result[i].subtask_name, result[i].subtask_description, result[i].subtask_status, result[i].subtask_task_id));
                }
            }
        });
        return res;
    }
    getSubTaskByIds(task_id, subtask_id) {
        var sql = 'SELECT * FROM subtask_info WHERE subtask_task_id = ' + task_id + ' AND subtask_id = ' + subtask_id;
        var res = new task_1.SubTask(0, "", "", 0, 0);
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                // res = new SubTask(result[0].subtask_id, result[0].subtask_name, result[0].subtask_description, result[0].subtask_status, result[0].subtask_task_id);
            }
        });
        return res;
    }
    // add a sub task
    addSubTask(subtask) {
        var sql = 'INSERT INTO subtask_info (subtask_name, subtask_description, subtask_status, subtask_task_id) VALUES (\'' + subtask.subtask_name + '\', \'' + subtask.subtask_description + '\', ' + subtask.subtask_status + ', ' + subtask.subtask_task_id + ')';
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                // return false;
            }
            else {
                // return true;
                sql = 'SELECT subtask_id FROM subtask_info WHERE subtask_name = \'' + subtask.subtask_name + '\' AND subtask_task_id = ' + subtask.subtask_task_id;
                this.connection.query(sql, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        return result.subtask_id;
                    }
                });
            }
        });
        return -1;
    }
    // delete a sub task
    deleteSubTask(task_id, subtask_id) {
        var sql = 'DELETE FROM subtask_info WHERE subtask_id = ' + subtask_id + ' AND task_id = ' + task_id + '';
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return false;
            }
            else {
                return true;
            }
        });
        return false;
    }
    // alert sub task info
    alertSubTaskInfo(subtask_new) {
        var sql = 'UPDATE subtask_info SET subtask_name = \'' + subtask_new.subtask_name + '\', subtask_description = \'' + subtask_new.subtask_description + '\', subtask_status = ' + subtask_new.subtask_status + ' WHERE subtask_id = ' + subtask_new.subtask_id + ' AND subtask_task_id = ' + subtask_new.subtask_task_id;
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return false;
            }
            else {
                return true;
            }
        });
        return false;
    }
    //////////////////////////// Message ////////////////////////////
    get_client_message(client_id) {
        var sql = 'SELECT * FROM message_info WHERE client_id = ' + client_id;
        var res = [];
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                for (var i = 0; i < result.length; i++) {
                    res.push(new message_1.Message(result[i].message_id, result[i].message_sender, result[i].message_receiver, result[i].message_type, result[i].message_content, result[i].send_time, result.message_status));
                }
            }
        });
        return res;
    }
}
exports.db = new DbRepo();
