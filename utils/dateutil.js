"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.date_to_mysql = void 0;
const date_to_mysql = (date) => {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 19).replace('T', ' ');
};
exports.date_to_mysql = date_to_mysql;
