import Service from "../axios";

async function createTaskList(){
    return await Service.requestService({
        url: '/folder/createTaskList',
        method: 'post',
        data: '',
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

async function deleteTaskList(){
    return await Service.requestService({
        url: '/folder/deleteTaskList',
        method: 'post',
        data: '',
    })
}

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