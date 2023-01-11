// the routers about folder is difined here

import express from 'express';

// import folder controller
import * as folder_controller from '../controller/folderController';

const router = express.Router();

// // get tasklist by folder id
// router.get('/getTaskList', folder_controller.);

// get user folders
router.get('/getUserTaskLists', folder_controller.get_user_folders);

// create folder
router.post('/createTaskList', folder_controller.create_folder);

// alert folder
router.post('/alertTaskList', folder_controller.alert_folder);

// delete folder
router.post('/deleteTaskList', folder_controller.delete_folder);

module.exports = router;
