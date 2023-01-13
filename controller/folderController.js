"use strict";
// folder controller funstions
// Path: controller\folderController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_folder = exports.alert_folder = exports.create_folder = exports.get_user_folders = void 0;
const folder_1 = require("../model/folder");
const dbRepo_1 = require("../controller/dbRepo");
// get floders of a user
const get_user_folders = (req, res) => {
    const client_id = parseInt(req.query['client_id']);
    dbRepo_1.db.getUserFolders(client_id, (folders) => {
        res.json({
            code: 200,
            message: 'success',
            data: {
                folders,
            },
        });
    });
};
exports.get_user_folders = get_user_folders;
// create a folder
const create_folder = (req, res) => {
    const folder_name = req.body.folder.folder_name;
    const folder_description = req.body.folder.folder_description || '';
    const folder_creator = req.body.folder.folder_creator;
    const folder = new folder_1.Folder(folder_creator, 0, folder_name, folder_description);
    dbRepo_1.db.createFolder(folder, (folder_id) => {
        if (folder_id !== 0) {
            // create folder success
            res.json({
                code: 200,
                message: 'success',
                data: {
                    folder_id,
                },
            });
        }
        else {
            // create folder failed
            res.json({
                code: 400,
                message: 'failed',
                data: {},
            });
        }
    });
};
exports.create_folder = create_folder;
// alter a folder
const alert_folder = (req, res) => {
    const folder_id = parseInt(req.body.folder.folder_id);
    dbRepo_1.db.getFolderInfo(folder_id, (folder) => {
        if (folder !== null) {
            // get folder info success
            const folder_name = req.body.folder.folder_name || folder.folder_name;
            const folder_description = req.body.folder.folder_description || folder.folder_description;
            const folder_creator = folder.client_id;
            const new_folder = new folder_1.Folder(folder_creator, folder_id, folder_name, folder_description);
            dbRepo_1.db.alertFolderInfo(new_folder, (result) => {
                if (result) {
                    // alter folder success
                    res.json({
                        code: 200,
                        message: 'success',
                        data: {},
                    });
                }
                else {
                    // alter folder failed
                    res.json({
                        code: 400,
                        message: 'failed',
                        data: {},
                    });
                }
            });
        }
        else {
            // get folder info failed
            res.json({
                code: 400,
                message: 'failed',
                data: {},
            });
        }
    });
};
exports.alert_folder = alert_folder;
// move task list to a folder
// TODO: 这个放在task里面写吧
// delete a folder
const delete_folder = (req, res) => {
    const folder_id = parseInt(req.body.folder_id);
    dbRepo_1.db.deleteFolder(folder_id, (result) => {
        if (result) {
            // delete folder success
            res.json({
                code: 200,
                message: 'success',
                data: {},
            });
        }
        else {
            // delete folder failed
            res.json({
                code: 400,
                message: 'failed',
                data: {},
            });
        }
    });
};
exports.delete_folder = delete_folder;
