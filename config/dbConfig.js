"use strict";
// the class takes the connection string and the database name as parameters
// When develpoing, we use Mysql local server, so the connection string is "localhost"
// When deploying, we use MariaDB cloud server, so the connection string is the cloud server's IP address
// The database name is "to-do-list"
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
// You can use the following commands to create a user and grant privileges to the user
// CREATE USER 'TO-DO-LIST'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
// GRANT ALL PRIVILEGES ON *.* TO 'TO-DO-LIST'@'%';
exports.dbConfig = {
    development: {
        host: 'localhost',
        user: 'TO-DO-LIST',
        port: 3306,
        password: '123456',
        database: 'to-do-list',
    },
};
module.exports = exports.dbConfig;
