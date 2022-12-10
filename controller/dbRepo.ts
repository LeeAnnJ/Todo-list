// the database repository class
// this class is responsible for all database operations
// it is a singleton class
// In this project, we use the mysql database(when developing, we will use the mariaDB database when releasing)

// import the mysql module
import mysql from 'mysql';
// import the database configuration
import { dbConfig } from '../config/dbconfig';
var config = dbConfig.development;
// import the entity classes
import { Account } from '../model/account';
import { Group, GroupAccount } from '../model/group';
import { Folder } from '../model/folder';
import { Task, SubTask } from '../model/task';

// the database repository class
export class DbRepo {
    // the database connection
    private connection: mysql.Connection;
    // the database repository instance
    private static instance: DbRepo;

    // the constructor
    private constructor() {
        // create a database connection
        this.connection = mysql.createConnection({
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
    public static getInstance(): DbRepo {
        if (!this.instance) {
            this.instance = new DbRepo();
        }
        return this.instance;
    }

    // create a database
    // 但是连接直接指定了数据库，所以这个方法不需要
    public createDatabase(): void {
        // create a database
        this.connection.query('CREATE DATABASE IF NOT EXISTS ' + config.database, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log('Database created');
        });
    }

    // create a table
    // 数据库直接在navicat制定了，所以只作为启动时的备用
    public createTable(): void {
        // TODO: create tables
    }

    //////////////////////////// Account ////////////////////////////

    // login
    public login(user_name: string, passwd_hash: string) {
        // login
        this.connection.query('SELECT * FROM user_info WHERE user_name = \'' + mysql.escape(user_name) + '\' AND passwd_hash = \'' + mysql.escape(passwd_hash) + '\'', (err, result) => {
            if (err) {
                console.log(err);
                // return err;
                return null;
            }
            console.log(result);
            // return client_id
            return result.client_id;
        });
    }

    // create a user account
    public createAccount(account: Account): number {
        var values = {
            client_id: account.client_id,
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
                console.log('Account created');
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
    public getUserById(client_id: number): Account {
        var sql = 'SELECT * FROM user_info WHERE client_id = ' + client_id;
        var res = new Account(0, '', '', '', new Date(), '');
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res = new Account(result.client_id, result.user_name, result.passwd_hash, result.avatar_path, result.register_time, result.introduction);
                console.log(result);
            }
        });
        return res;
    }

    // alert user info(by client_id)
    public alertUserInfo(acc_new: Account): boolean {
        var sql = 'UPDATE user_info SET user_name = \'' + acc_new.user_name + '\', passwd_hash = \'' + acc_new.password_hash + '\', avatar_path = \'' + acc_new.avatar_path + '\', introduction = \'' + acc_new.introduction + '\' WHERE client_id = ' + acc_new.client_id;
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return false;
            } else {
                return true;
            }
        });
        return false;
    }

    // change user avatar
    public changeAvatar(client_id: number, avatar_path: string): boolean {
        var sql = 'UPDATE user_info SET avatar_path = \'' + avatar_path + '\' WHERE client_id = ' + client_id;
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return false;
            } else {
                return true;
            }
        });
        return false;
    }

    // delete a user account
    public deleteAccount(client_id: number): boolean {
        var sql = 'DELETE FROM user_info WHERE client_id = ' + client_id;
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return false;
            } else {
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
    public checkUserName(user_name: string): boolean {
        var sql = 'SELECT * FROM user_info WHERE user_name = \'' + user_name + '\'';
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return true;
            } else {
                if (result.length == 0) {
                    return false;
                } else {
                    return true;
                }
            }
        });
        return true;
    }

    //////////////////////////// Group ////////////////////////////

    // create a group
    public createGroup(group: Group): number {
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
            } else {
                console.log('Group created');
                // return group_id
                sql = 'SELECT group_id FROM group_info WHERE group_name = \'' + values.group_name + '\' AND group_creator = ' + values.group_creator;
                this.connection.query(sql, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    return result.group_id;
                });
            }
        });
        return 0;
    };

    // get group by id
    public getGroupById(group_id: number): Group {
        var sql = 'SELECT * FROM group_info WHERE group_id = ' + group_id;
        var res = new Group(0, '', '', new Date(), 0);
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res = new Group(result.group_id, result.group_name, result.group_description, result.group_creator, result.group_create_time);
                console.log(result);
            }
        });
        return res;
    }

    // 

}
