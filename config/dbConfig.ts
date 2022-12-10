// the class takes the connection string and the database name as parameters
// When develpoing, we use Mysql local server, so the connection string is "localhost"
// When deploying, we use MariaDB cloud server, so the connection string is the cloud server's IP address
// The database name is "to-do-list"

export const dbConfig = {
    development: {
        host: "localhost",
        user: "root",
        port: 3306,
        password: "357480",
        database: "to-do-list",
    },
    production: {
        host: "localhost",
        user: "root",
        port: 3306,
        password: "357480",
        database: "to-do-list",
    }
}

module.exports = dbConfig;
