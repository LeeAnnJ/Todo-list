"use strict";
// database table: user_folder
// entity class: Folder
Object.defineProperty(exports, "__esModule", { value: true });
exports.Folder = void 0;
class Folder {
    constructor(client_id, folder_id, folder_name, folder_description) {
        this.client_id = client_id;
        this.folder_id = folder_id;
        this.folder_name = folder_name;
        this.folder_description = folder_description;
    }
}
exports.Folder = Folder;
// module.exports = Folder;
