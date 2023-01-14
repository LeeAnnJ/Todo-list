import Service from "../axios";

async function createTaskList(list){
    return await Service.requestService({
        url: '/folder/createTaskList',
        method: 'post',
        data: {
            folder: list
        },
    })
}

async function alterTaskList(){
    return await Service.requestService({
        url: '/folder/alterTaskList',
        method: 'post',
        data: '',
    })
}

async function moveTaskList(){
    return await Service.requestService({
        url: '/folder/moveTaskList',
        method: 'post',
        data: '',
    })
}

async function deleteTaskList(client,folder){
    return await Service.requestService({
        url: '/folder/deleteTaskList',
        method: 'post',
        data: {
            client_id: client,
            folder_id: folder
        },
    })
}

/**
 * 根据用户id返回任务列表
 * ```json
 * 
 * ```
 */
async function getUserTaskLists(user){
    return await Service.requestService({
        url: '/folder/getUserTaskLists',
        method: 'get',
        params: {
            "client_id": user
        },
    })
}

export default{
    createTaskList,
    alterTaskList,
    moveTaskList,
    deleteTaskList,
    getUserTaskLists
}