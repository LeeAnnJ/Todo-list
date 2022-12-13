import Service from "../axios";

/**
 * 任务接口
 * @returns 
 */ 

async function getTaskById(){
    return await Service.requestService({
        url: '/task/getTaskById',
        method: 'get',
    })
}

async function getTaskByUserId(){
    return await Service.requestService({
        url: '/task/getTaskByUserId',
        method: 'get',
    })
}

async function modifyTask(){
    return await Service.requestService({
        url: '/task/modifyTask',
        method: 'post',
    })
}

async function deleteTask(){
    return await Service.requestService({
        url: '/task/deleteTask',
        method: 'post',
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