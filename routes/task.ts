// the routers about task is difined here

import express from 'express';

// import task controller
import * as task_controller from '../controller/taskController';

const router = express.Router();

//get task by id
router.get('/getTaskById', task_controller.get_task_by_id);

// get tasks by user id
router.get('/getTaskByUserId', task_controller.get_task_by_user_id);

// modify task
router.post('/modifyTask', task_controller.modify_task);

// delete task
router.post('/deleteTask', task_controller.delete_task);

// get subtasks by task id
router.get('/getSubTaskByTaskId', task_controller.get_subtasks_by_task_id);

// get subtask by task id and subtask id
router.get('/getSubTaskByIds', task_controller.get_subtask_by_task_ids);

// add subtask to task
router.post('/addSubTaskToTask', task_controller.add_subtask_to_task);

// delete subtask from task
router.post('/deleteSubTaskFromTask', task_controller.delete_subtask_from_task);

// mark task as done
router.post('/markTaskAsDone', task_controller.mark_task_as_done);

// mark subtask as done
router.post('/markSubTaskAsDone', task_controller.mark_subtask_as_done);

module.exports = router;