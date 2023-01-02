"use strict";
// the class takes the connection string and the database name as parameters
// When develpoing, we use Mysql local server, so the connection string is "localhost"
// When deploying, we use MariaDB cloud server, so the connection string is the cloud server's IP address
// The database name is "to-do-list"
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
exports.dbConfig = {
    development: {
        host: 'localhost',
        user: 'root',
        port: 3306,
        password: 'sysu',
        database: 'to-do-list',
    },
};
module.exports = exports.dbConfig;
