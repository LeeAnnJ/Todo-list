// the routers about task is difined here

import { Router } from 'express';
import { createServer } from 'http';
import express from 'express';
import { Server, Socket } from 'socket.io';

// import task controller
import * as task_controller from '../controller/taskController';

const router = express.Router();

//get task by id
router.get('/getTaskById', task_controller.get_task_by_id);

// get task by user id
router.get('/getTaskByUserId', task_controller.get_task_by_user_id);

// modify task
router.post('/modifyTask', task_controller.modify_task);

// delete task
router.post('/deleteTask', task_controller.delete_task);

// get subtask by task id
router.get('/getSubTaskByTaskId', task_controller.get_subtask_by_task_id);

// add subtask to task
router.post('/addSubTaskToTask', task_controller.add_subtask_to_task);

// delete subtask from task
router.post('/deleteSubTaskFromTask', task_controller.delete_subtask_from_task);

