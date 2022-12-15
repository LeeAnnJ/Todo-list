"use strict";
// the routers about task is difined here
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import task controller
const task_controller = __importStar(require("../controller/taskController"));
const router = express_1.default.Router();
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
