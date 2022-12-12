// 对应后端路径为/account的请求
import Service from "../axios";

async function getUserById(){
    return await Service.requestService({
        url: '/account/getUserById',
        method: 'get',
    })
}

async function create(){
    return await Service.requestService({
        url: '/account/create',
        method: 'post',
    })
}

export default{
    getUserById,
    create
}