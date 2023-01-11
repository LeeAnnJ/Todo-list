// folder controller funstions
// Path: controller\folderController.ts


import { Request, Response } from 'express'
import { Folder } from '../model/folder'
import { db } from '../controller/dbRepo'

// get floders of a user
export const get_user_folders = (req: Request, res: Response) => {
    const client_id = parseInt(req.query["client_id"] as string)
    db.getUserFolders(client_id, (folders: Folder[]) => {
        res.json({
            code: 200,
            message: 'success',
            data: {
                folders,
            },
        })
    });
}

// create a folder
export const create_folder = (req: Request, res: Response) => {
    const folder_name = req.body.folder.folder_name
    const folder_description = req.body.folder.folder_description || ''
    const folder_creator = req.body.folder.folder_creator

    const folder = new Folder(folder_creator, 0, folder_name, folder_description)

    db.createFolder(folder, (folder_id: number) => {
        if (folder_id !== 0) {
            // create folder success
            res.json({
                code: 200,
                message: 'success',
                data: {
                    folder_id,
                },
            })
        } else {
            // create folder failed
            res.json({
                code: 400,
                message: 'failed',
                data: {},
            })
        }
    })
}

// alter a folder
export const alert_folder = (req: Request, res: Response) => {
    const folder_id = parseInt(req.body.folder.folder_id as string)
    // const folder_name = req.body.folder.folder_name
    // const folder_description = req.body.folder.folder_description || ''

    db.getFolderInfo(folder_id, (folder: Folder) => {
        if (folder !== null) {
            // get folder info success
            const folder_name = req.body.folder.folder_name || folder.folder_name
            const folder_description = req.body.folder.folder_description || folder.folder_description
            const folder_creator = folder.client_id
            const new_folder = new Folder(folder_creator, folder_id, folder_name, folder_description)
            db.alertFolderInfo(new_folder, (result: boolean) => {
                if (result) {
                    // alter folder success
                    res.json({
                        code: 200,
                        message: 'success',
                        data: {},
                    })
                } else {
                    // alter folder failed
                    res.json({
                        code: 400,
                        message: 'failed',
                        data: {},
                    })
                }
            })
        } else {
            // get folder info failed
            res.json({
                code: 400,
                message: 'failed',
                data: {},
            })
        }
    })
}

// move task list to a folder
// TODO: 这个放在task里面写吧

// delete a folder
export const delete_folder = (req: Request, res: Response) => {
    const folder_id = parseInt(req.body.folder.folder_id as string)
    db.deleteFolder(folder_id, (result: boolean) => {
        if (result) {
            // delete folder success
            res.json({
                code: 200,
                message: 'success',
                data: {},
            })
        } else {
            // delete folder failed
            res.json({
                code: 400,
                message: 'failed',
                data: {},
            })
        }
    })
}
