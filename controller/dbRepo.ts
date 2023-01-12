// the database repository class
// this class is responsible for all database operations
// it is a singleton class
// In this project, we use the mysql database(when developing, we will use the mariaDB database when releasing)

// require the mysql module
import mysql from 'mysql'

// import the database configuration
// import { dbConfig } from '../config/dbConfig';
// var config = dbConfig.development;

const dbConfig = require('../config/dbConfig')

// const Account = require('../model/account');
// const {Group, GroupAccount} = require('../model/group');
// const Folder = require('../model/folder');
// const {Task, Subtask} = require('../model/task');
// const Message = require('../model/message');

var config = dbConfig.development

// import the entity classes
import { Account } from '../model/account'
import { Group, GroupAccount } from '../model/group'
import { Folder } from '../model/folder'
import { Task, SubTask } from '../model/task'
import { Message } from '../model/message'

// 7 tables in total

// the database repository class
class DbRepo {
    // the database connection
    private connection: mysql.Connection
    // the database repository instance
    private static instance: DbRepo

    // the constructor
    public constructor() {
        // create a database connection
        this.connection = mysql.createConnection({
            host: config.host,
            user: config.user,
            port: config.port,
            password: config.password,
            database: config.database,
        })
        // connect to the database
        this.connection.connect()
    }

    // get the database repository instance
    public static getInstance(): DbRepo {
        if (!this.instance) {
            this.instance = new DbRepo()
        }
        return this.instance
    }

    // create a database
    // 但是连接直接指定了数据库，所以这个方法不需要
    public createDatabase(): void {
        // create a database
        return undefined
    }

    // create a table
    // 数据库直接在navicat制定了，所以只作为启动时的备用
    public createTable(): void {
        return undefined
    }

    //////////////////////////// Account ////////////////////////////

    // login
    public login(user_name: string, passwd_hash: string, callback: Function) {
        console.log('login')
        var sql =
            "SELECT * FROM user_info WHERE user_name = '" +
            user_name +
            "' AND passwd_hash =  cast('" +
            passwd_hash +
            "' AS BINARY(255))"
        // login
        this.connection.query(sql, (err, result) => {
            if (err || result.length == 0) {
                callback(0)
            } else {
                callback(result[0].client_id)
            }
        })
    }

    // create a user account
    public createAccount(account: Account, callback: Function) {
        var values = {
            user_name: account.user_name,
            passwd_hash: account.password_hash,
            register_time: account.register_time,
        }
        var sql =
            "INSERT INTO user_info (user_name, passwd_hash, register_time, intro) VALUES ('" +
            values.user_name +
            "', '" +
            values.passwd_hash +
            "', NOW(), '" +
            account.introduction +
            "')"
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                callback(0)
            } else {
                // console.log('Account created');
                // return client_id
                sql =
                    "SELECT * FROM user_info WHERE user_name = '" + values.user_name + "'"
                this.connection.query(sql, (err, result) => {
                    if (err) {
                        console.log(err)
                        callback(0)
                    }
                    callback(result[0].client_id)
                })
            }
        })
        // return 0;
    }

    // get user by id
    public getUserById(client_id: number, callback: Function) {
        var sql = 'SELECT * FROM user_info WHERE client_id = ' + client_id
        const date = new Date()
        var res = new Account(0, '', '', '', date, '')
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                result = result[0]
                res = new Account(
                    result.client_id,
                    result.user_name,
                    result.passwd_hash,
                    result.avatar_path,
                    result.register_time,
                    result.intro,
                )
                console.log(result)
            }
            callback(res)
        })
    }

    // alert user info(by client_id)
    public alertUserInfo(acc_new: Account, callback: Function) {
        var sql =
            "UPDATE user_info SET user_name = '" +
            acc_new.user_name +
            "', passwd_hash = '" +
            acc_new.password_hash +
            "', avatar_path = '" +
            acc_new.avatar_path +
            "', intro = '" +
            acc_new.introduction +
            "' WHERE client_id = " +
            acc_new.client_id
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                callback(false)
            } else {
                callback(true)
            }
        })
    }

    // change user avatar
    public changeAvatar(
        client_id: number,
        avatar_path: string,
        callback: Function,
    ) {
        var sql =
            "UPDATE user_info SET avatar_path = '" +
            avatar_path +
            "' WHERE client_id = " +
            client_id
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                callback(false)
            } else {
                callback(true)
            }
        })
    }

    // delete a user account
    public deleteAccount(client_id: number, callback: Function) {
        var sql = 'DELETE FROM user_info WHERE client_id = ' + client_id
        this.connection.query(sql, async (err, result) => {
            if (err) {
                console.log(err)
                callback(false)
            } else {
                callback(true)
            }
        })
    }

    /**
     * check if the user name is already used
     * @param user_name user name.
     * @returns if the user name is already used or something wrong happened when checking , return true, else return false.
     */
    public checkUserName(user_name: string, callback: Function) {
        var sql = "SELECT * FROM user_info WHERE user_name = '" + user_name + "'"
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                if (result.length > 0) {
                    callback(false)
                } else {
                    callback(true)
                }
            }
        })
    }

    //////////////////////////// Group ////////////////////////////

    // create a group
    public createGroup(group: Group, callback: Function) {
        var values = {
            group_name: group.group_name,
            group_description: group.group_description,
            group_creator: group.group_creator,
            group_create_time: group.group_create_time,
        }
        // FIXME: use Transaction to add the group and the creater to the group
        var sql =
            'INSERT INTO group_info (group_name, group_description, group_creator, group_create_time) VALUES (' +
            values.group_name +
            ', ' +
            values.group_description +
            ', ' +
            values.group_creator +
            ', ' +
            values.group_create_time +
            ')'
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                callback(0)
            } else {
                sql =
                    "SELECT group_id FROM group_info WHERE group_name = '" +
                    values.group_name +
                    "' AND group_creator = " +
                    values.group_creator
                this.connection.query(sql, (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    callback(result[0].group_id)
                    sql =
                        'INSERT INTO group_member (group_id, client_id) VALUES (' +
                        result[0].group_id +
                        ', ' +
                        values.group_creator +
                        ')'
                    this.connection.query(sql, (err, result) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                })
            }
        })
    }

    // get group by id
    public getGroupById(group_id: number, callback: Function) {
        var sql = 'SELECT * FROM group_info WHERE group_id = ' + group_id
        var res = new Group(0, '', '', new Date(), 0)
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                result = result[0]
                res = new Group(
                    result.group_id,
                    result.group_name,
                    result.group_description,
                    result.group_creator,
                    result.group_create_time,
                )
                console.log(result)
            }
            callback(res)
        })
    }

    // get members of a group
    public getGroupMembers(group_id: number, callback: Function) {
        // get owner
        var sql = 'SELECT * FROM group_member WHERE group_id = ' + group_id
        var res: Account[] = []
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                callback(res)
            } else {
                for (var i = 0; i < result.length; i++) {
                    this.getUserById(result[i].client_id, (acc: Account) => {
                        res.push(acc)
                    })
                }

                // change the group creater to the first member
                sql = "SELECT founder_id as creater FROM group_info WHERE group_id = " + group_id
                this.connection.query(sql, (err, result) => {

                    if (err) {
                        console.log(err)
                    } else {
                        var creater_id = result[0].creater
                        for (var i = 0; i < res.length; i++) {
                            if (res[i].client_id == creater_id) {
                                var temp = res[0]
                                res[0] = res[i]
                                res[i] = temp
                                break
                            }
                        }
                    }
                })
                callback(res)
            }
        })
    }

    // get group creater
    public getGroupCreaterId(group_id: number, callback: Function) {
        var sql = 'SELECT creater_id FROM group_info WHERE group_id = ' + group_id
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                callback(0)
            } else {
                callback(result[0].creater_id)
            }
        })
    }

    // alert group info(by group_id)
    public alertGroupInfo(group_new: Group, callback: Function) {
        var sql =
            "UPDATE group_info SET group_name = '" +
            group_new.group_name +
            "', group_description = '" +
            group_new.group_description +
            "' WHERE group_id = " +
            group_new.group_id
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                callback(false)
            } else {
                callback(true)
            }
        })
    }

    // get groups of a user
    public getUserGroups(client_id: number, callback: Function) {
        var sql = 'SELECT * FROM group_member WHERE client_id = ' + client_id
        var res: Group[] = []
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                for (var i = 0; i < result.length; i++) {
                    this.getGroupById(result[i].group_id, (group: Group) => {
                        res.push(group)
                    })
                }
            }
            callback(res)
        })
    }

    // add a member to a group
    // FIXME: change the number of members in group_info
    // Maybe we should use a Transaction to do this
    // Mysql: START TRANSACTION; INSERT INTO group_member (group_id, client_id) VALUES (1, 1); UPDATE group_info SET group_member_num = group_member_num + 1 WHERE group_id = 1; COMMIT;
    public addMemberToGroup(
        group_id: number,
        client_id: number,
        callback: Function,
    ) {
        var values = {
            group_id: group_id,
            client_id: client_id,
        }
        // var sql = 'INSERT INTO group_member (group_id, client_id) VALUES (' + values.group_id + ', ' + values.client_id + ')';
        var sql =
            'START TRANSACTION; INSERT INTO group_member (group_id, client_id) VALUES ( ' +
            values.group_id +
            ', ' +
            values.client_id +
            '); UPDATE group_info SET group_member_num = group_member_num + 1 WHERE group_id = ' +
            values.group_id +
            '; COMMIT;'
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                callback(false)
            } else {
                callback(true)
            }
        })
    }

    // delete a member from a group
    // FIXME: change the number of members in group_info
    // Maybe we should use a Transaction to do this
    // Mysql: START TRANSACTION; DELETE FROM group_member WHERE group_id = 1 AND client_id = 1; UPDATE group_info SET group_member_num = group_member_num - 1 WHERE group_id = 1; COMMIT;
    public deleteMemberFromGroup(
        group_id: number,
        client_id: number,
        callback: Function,
    ) {
        // FIXME: Check if the user is the creater of the group
        var sql =
            'START TRANSACTION; DELETE FROM group_member WHERE group_id = ' +
            group_id +
            ' AND client_id = ' +
            client_id +
            '; UPDATE group_info SET group_member_num = group_member_num - 1 WHERE group_id = ' +
            group_id +
            '; COMMIT;'
        // var sql = 'DELETE FROM group_member WHERE group_id = ' + group_id + ' AND client_id = ' + client_id;
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                callback(false)
            } else {
                // FIXME: change the number of members in group_info
                callback(true)
            }
        })
    }

    // delete a group
    public deleteGroup(group_id: number, callback: Function) {
        var sql = 'DELETE FROM group_info WHERE group_id = ' + group_id
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                callback(false)
            } else {
                callback(true)
            }
        })
    }

    //////////////////////////// Folder ////////////////////////////
    // get folders of a user
    public getUserFolders(client_id: number, callback: Function) {
        var sql = 'SELECT * FROM folder_info WHERE client_id = ' + client_id
        var res: Folder[] = []
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                for (var i = 0; i < result.length; i++) {
                    res.push(
                        new Folder(
                            result[i].folder_id,
                            result[i].folder_name,
                            result[i].folder_description,
                            result[i].folder_creator,
                        ),
                    )
                }
            }
            callback(res)
        })
    }

    // create a folder
    // FIXME: use a transaction to do this
    public createFolder(folder: Folder, callback: Function) {
        var values = {
            client_id: folder.client_id,
            folder_id: folder.folder_id,
            folder_name: folder.folder_name,
            folder_description: folder.folder_description,
        }
        var sql =
            'INSERT INTO folder_info (client_id, folder_name, folder_description) VALUES (' +
            values.client_id +
            ', ' +
            values.folder_name +
            ', ' +
            values.folder_description +
            ')'
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                callback(0)
            } else {
                console.log('Folder created')
                // return folder_id
                sql =
                    "SELECT folder_id FROM folder_info WHERE folder_name = '" +
                    values.folder_name +
                    "' AND client_id = " +
                    values.client_id
                this.connection.query(sql, (err, result) => {
                    if (err) {
                        console.log(err)
                        callback(0)
                    } else {
                        callback(result[0].folder_id)
                    }
                })
            }
        })
    }

    // get folder info by folder_id
    public getFolderInfo(folder_id: number, callback: Function) {
        var sql = 'SELECT * FROM folder_info WHERE folder_id = ' + folder_id
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                callback(null)
            } else {
                var folder = new Folder(
                    result[0].folder_id,
                    result[0].folder_name,
                    result[0].folder_description,
                    result[0].folder_creator,
                )
                callback(folder)
            }
        })
    }

    // alert folder info(by client_i and folder_id)
    public alertFolderInfo(folder_new: Folder, callback: Function) {
        var sql =
            "UPDATE folder_info SET folder_name = '" +
            folder_new.folder_name +
            "', folder_description = '" +
            folder_new.folder_description +
            "' WHERE folder_id = " +
            folder_new.folder_id +
            ' AND client_id = ' +
            folder_new.client_id
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                callback(false)
            } else {
                callback(true)
            }
        })
    }

    // delete a folder
    public deleteFolder(folder_id: number, callback: Function) {
        var sql = 'DELETE FROM folder_info WHERE folder_id = ' + folder_id
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                callback(false)
            } else {
                callback(true)
            }
        })
    }

    // get tasks of a folder
    public getFolderTasks(folder_id: number, callback: Function) {
        var sql =
            'SELECT * FROM task_info WHERE task_folder = ' +
            folder_id +
            ' AND task_group = 0'
        var res: Task[] = []
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                for (var i = 0; i < result.length; i++) {
                    res.push(
                        new Task(
                            result[i].task_id,
                            result[i].register_id,
                            result[i].create_time,
                            result[i].name,
                            result[i].type,
                            result[i].priority,
                            result[i].deadline,
                            result[i].group_belonging,
                            result[i].belongs_folder_id,
                            result[i].note,
                            result[i].status,
                        ),
                    )
                }
            }
            callback(res)
        })
    }

    //////////////////////////// Task ////////////////////////////

    // get tasks of a user
    public getUserTasks(client_id: number, callback: Function) {
        var sql = 'SELECT * FROM task_info WHERE client_id = ' + client_id
        var res: Task[] = []
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                for (var i = 0; i < result.length; i++) {
                    res.push(
                        new Task(
                            result[i].task_id,
                            result[i].register_id,
                            result[i].name,
                            result[i].note,
                            result[i].type,
                            result[i].priority,
                            result[i].deadline,
                            result[i].group_belonging,
                            result[i].belongs_folder_id,
                            result[i].status,
                        ),
                    )
                }
            }
            callback(res)
        })
    }

    // create a task
    public createTask(task: Task, callback: Function) {
        var values = {
            client_id: task.task_creator,
            task_id: task.task_id,
            task_name: task.task_name,
            task_type: task.task_type,
            task_description: task.task_description,
            task_group: task.task_group_id,
            task_folder: task.task_folder_id,
            task_deadline: task.task_ddl,
            task_priority: task.task_priority,
            task_status: task.task_status,
        }
        var sql =
            'INSERT INTO task_info SET (register_id, create_time, name, type, priorty, deadline, group_belonging, note, is_favor, `status`) VALUES (' +
            values.client_id +
            ', NOW(), "' +
            values.task_name +
            '", ' +
            values.task_type +
            ', ' +
            values.task_priority +
            ', "' +
            values.task_deadline +
            '", ' +
            values.task_group +
            ', "' +
            values.task_description +
            '", 0, ' +
            values.task_status +
            ')'
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                callback(0)
            } else {
                sql =
                    "SELECT task_id FROM task_info WHERE task_name = '" +
                    values.task_name +
                    "' AND client_id = " +
                    values.client_id
                this.connection.query(sql, (err, result) => {
                    if (err) {
                        console.log(err)
                        callback(0)
                    } else {
                        callback(result[0].task_id)
                    }
                })
            }
        })
    }

    // get task by user_id
    public getTaskByUserId(client_id: number, callback: Function) {
        var sql = 'SELECT * FROM task_info WHERE client_id = ' + client_id
        var res: Task[] = []
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                for (var i = 0; i < result.length; i++) {
                    res.push(
                        new Task(
                            result[i].task_id,
                            result[i].register_id,
                            result[i].create_time,
                            result[i].name,
                            result[i].type,
                            result[i].priority,
                            result[i].deadline,
                            result[i].group_belonging,
                            result[i].belongs_folder_id,
                            result[i].note,
                            result[i].status,
                        ),
                    )
                }
            }
            callback(res)
        })
    }

    // get task by task_id
    public getTaskByTaskId(task_id: number, callback: Function) {
        var sql = 'SELECT * FROM task_info WHERE task_id = ' + task_id
        this.connection.query(sql, (err, result) => {
            var res: Task = new Task(0, 0, '', '', false, 0, new Date(), 0)
            if (err) {
                console.log(err)
            } else {
                res = new Task(
                    result[0].task_id,
                    result[0].register_id,
                    result[0].create_time,
                    result[0].name,
                    result[0].type,
                    result[0].priority,
                    result[0].deadline,
                    result[0].group_belonging,
                    result[0].belongs_folder_id,
                    result[0].note,
                    result[0].status,
                )
            }
            callback(res)
        })
    }

    // alert task info
    public alertTaskInfo(task_new: Task, callback: Function) {
        var sql = 'UPDATE task_info SET '
        if (task_new.task_name != '') {
            sql += 'name = "' + task_new.task_name + '", '
        }
        sql += 'type = ' + task_new.task_type + ', '
        if (task_new.task_priority != -1) {
            sql += 'priority = ' + task_new.task_priority + ', '
        }
        if (task_new.task_ddl != null) {
            sql += 'deadline = "' + task_new.task_ddl + '", '
        }
        if (task_new.task_group_id != -1) {
            sql += 'group_belonging = ' + task_new.task_group_id + ', '
        }
        if (task_new.task_folder_id != -1) {
            sql += 'belongs_folder_id = ' + task_new.task_folder_id + ', '
        }
        if (task_new.task_description != '') {
            sql += 'note = "' + task_new.task_description + '", '
        }
        if (task_new.task_status != -1) {
            sql += 'status = ' + task_new.task_status + ', '
        }
        // remove the last ', '
        sql = sql.substring(0, sql.length - 2)
        sql += ' WHERE task_id = ' + task_new.task_id

        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                callback(false)
            } else {
                callback(true)
            }
        })
    }

    // delete a task
    public deleteTask(task_id: number, callback: Function) {
        var sql = 'DELETE FROM task_info WHERE task_id = ' + task_id
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                callback(false)
            } else {
                callback(true)
            }
        })
    }

    // get tasks of a group
    public getGroupTasks(group_id: number, callback: Function) {
        var sql = 'SELECT * FROM task_info WHERE group_brlonging = ' + group_id
        var res: Task[] = []
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                for (var i = 0; i < result.length; i++) {
                    res.push(
                        new Task(
                            result[i].task_id,
                            result[i].register_id,
                            result[i].create_time,
                            result[i].name,
                            result[i].type,
                            result[i].priority,
                            result[i].deadline,
                            result[i].group_belonging,
                            result[i].belongs_folder_id,
                            result[i].note,
                            result[i].status,
                        ),
                    )
                }
            }
            callback(res)
        })
    }

    // get sub tasks of a task
    public getSubTasksByTaskId(task_id: number, callback: Function) {
        var sql = 'SELECT * FROM task_info WHERE task_id = ' + task_id
        var res: SubTask[] = []
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                for (var i = 0; i < result.length; i++) {
                    res.push(
                        new SubTask(
                            result[i].subtask_id,
                            result[i].name,
                            result[i].status,
                            result[i].task_id,
                        ),
                    )
                }
            }
            callback(res)
        })
    }

    public getSubTaskByIds(
        task_id: number,
        subtask_id: number,
        callback: Function,
    ) {
        var sql =
            'SELECT * FROM subtask_info WHERE task_id = ' +
            task_id +
            ' AND subtask_id = ' +
            subtask_id
        var res: SubTask = new SubTask(0, '', 0, 0)
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res = new SubTask(
                    result[0].subtask_id,
                    result[0].name,
                    result[0].status,
                    result[0].task_id,
                )
            }
            callback(res)
        })
    }

    // add a sub task
    public addSubTask(subtask: SubTask, callback: Function) {
        // get the number of sub tasks for this task
        var sql = "SELECT COUNT(*) AS 'count' FROM subtask_info WHERE task_id = " + subtask.subtask_task_id
        var count = 0
        this.connection.query(sql, (err, result) => {
            if (err) {
                callback(0)
            }
            else {
                count = result[0].count

                sql =
                    "INSERT INTO subtask_info (subtask_id, name, status, task_id) VALUES ('" +
                    (count + 1).toString + "', '" +
                    subtask.subtask_name +
                    "', " +
                    subtask.subtask_status +
                    ', ' +
                    subtask.subtask_task_id +
                    ')'
                
                this.connection.query(sql, (err, result) => {
                    if (err) {
                        console.log(err)
                        callback(0)
                    } else {
                        callback(count + 1)
                    }
                })
            }
        })
    }

    // delete a sub task
    public deleteSubTask(
        task_id: number,
        subtask_id: number,
        callback: Function,
    ) {
        var sql =
            'DELETE FROM subtask_info WHERE subtask_id = ' +
            subtask_id +
            ' AND task_id = ' +
            task_id +
            ''
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                callback(false)
            } else {
                callback(true)
            }
        })
    }

    // alert sub task info
    public alertSubTaskInfo(subtask_new: SubTask, callback: Function) {
        var sql =
            "UPDATE subtask_info SET name = '" +
            subtask_new.subtask_name +
            "', status = " +
            subtask_new.subtask_status +
            ' WHERE subtask_id = ' +
            subtask_new.subtask_id +
            ' AND task_id = ' +
            subtask_new.subtask_task_id
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                callback(false)
            } else {
                callback(true)
            }
        })
    }

    //////////////////////////// Message ////////////////////////////

    public get_client_message(client_id: number, callback: Function) {
        var sql = 'SELECT * FROM message_info WHERE client_id = ' + client_id
        var res: Message[] = []
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                for (var i = 0; i < result.length; i++) {
                    res.push(
                        new Message(
                            result[i].message_id,
                            result[i].message_sender,
                            result[i].message_receiver,
                            result[i].message_type,
                            result[i].message_content,
                            result[i].send_time,
                            result.message_status,
                        ),
                    )
                }
            }
            callback(res)
        })
    }

    public get_message_by_id(message_id: number, callback: Function) {
        var sql = 'SELECT * FROM message_info WHERE message_id = ' + message_id
        var res: Message = new Message(0, 0, 0, 0, '', new Date(), 0)
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res = new Message(
                    result[0].message_id,
                    result[0].sender_id,
                    result[0].client_id,
                    result[0].push_type,
                    result[0].content,
                    result[0].push_time_time,
                    result[0].is_read,
                )
            }
            callback(res)
        })
    }


    public add_message(message: Message, callback: Function) {
        var sql =
            "INSERT INTO message (sender_id, client_id, push_type, content, push_time, is_read) VALUES (" +
            message.message_sender + ", " +
            message.message_receiver + ", " +
            message.message_type + ", '" +
            message.message_content + "', '" +
            message.message_send_time + "', " +
            message.message_status + ")"
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                callback(0)
            } else {
                sql = "SELECT * FROM message WHERE sender_id = " + message.message_sender + " AND client_id = " + message.message_receiver + " AND push_type = " + message.message_type + " AND content = '" + message.message_content + "' AND push_time = '" + message.message_send_time + "' AND is_read = " + message.message_status
                // callback
                this.connection.query(sql, (err, result) => {
                    if (err) {
                        console.log(err)
                        callback(0)
                    } else {
                        callback(result[0].message_id)
                    }
                })
            }
        })
    }

    public change_message_status(message_id: number, is_read: number, callback: Function) {
        var sql = "UPDATE message SET is_read = " + is_read + " WHERE message_id = " + message_id
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                callback(false)
            } else {
                callback(true)
            }
        })
    }
}

export const db = new DbRepo()
