export const date_to_mysql = (date: Date):String => {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 19).replace('T', ' ');
}
