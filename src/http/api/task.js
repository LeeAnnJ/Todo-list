import Service from "../axios";

async function createTask(req){
    return await Service.requestService({
        url: '/task/createTask',
        method: 'post',
        data: {
            task: req
        }
    })
}

/**
 * 根据任务id返回任务  
 * 返回数据：
 * ```json
 * "data": {
 *     "task_id":1,
 *     "task_creator":1,
 *     "task_create_time":"yyyy-mm-ddThh:mm:ss.xxxZ",
 *     "task_name":"xxx",
 *     "task_description":"xxxx",
 *     "task_type":0,
 *     "task_priority":0,
 *     "task_ddl":"yyyy-mm-ddThh:mm:ss.xxxZ",
 *     "task_group_id": 0,
 *     "task_isfavorite":"xxxx",
 *     "task_folder_id":1,
 *     "task_status":0,
 *     "subtasks_count":0,
 *     "cycle":0
 * }
 * ```
 */ 
async function getTaskById(taskid){
    return await Service.requestService({
        url: '/task/getTaskById',
        method: 'get',
        params: {
            "task_id": taskid
        }
    })
}

/**
 * 根据用户id获取所有任务  
 * 返回格式:
 * ```json
 * "data":[{},{},{}]
 * ```
 */
async function getTaskByUserId(client_id){
    return await Service.requestService({
        url: '/task/getTaskByUserId',
        method: 'get',
        params: {
            "user_id": client_id
        }
    })
}

async function modifyTask(req){
    return await Service.requestService({
        url: '/task/modifyTask',
        method: 'post',
        data: {
            task: req
        }
    })
}

async function deleteTask(task){
    return await Service.requestService({
        url: '/task/deleteTask',
        method: 'post',
        data: {
            task_id: task
        }
    })
}

async function getSubTaskByTaskId(){
    return await Service.requestService({
        url: '/task/getSubTaskByTaskId',
        method: 'get',
    })
}

async function addSubTaskToTask(){
    return await Service.requestService({
        url: '/task/addSubTaskToTask',
        method: 'post',
    })
}

async function deleteSubTaskFromTask(){
    return await Service.requestService({
        url: '/task/deleteSubTaskFromTask',
        method: 'post',
    })
}

async function markTaskAsDone(){
    return await Service.requestService({
        url: '/task/markTaskAsDone',
        method: 'post',
    })
}

async function markSubTaskAsDone(){
    return await Service.requestService({
        url: '/task/markSubTaskAsDone',
        method: 'post',
    })
}

export default{
    createTask,
    getTaskById,
    getTaskByUserId,
    modifyTask,
    deleteTask,
    getSubTaskByTaskId,
    addSubTaskToTask,
    deleteSubTaskFromTask,
    markTaskAsDone,
    markSubTaskAsDone,
}