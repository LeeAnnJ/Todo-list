// 对应后端路径为/account的请求
import Service from "../axios";

/**
 * 登录接口
 * @returns 
 */ 
async function login(){
    return await Service.requestService({
        url: '/account/login',
        method: 'post',
    })
}

async function create(){
    return await Service.requestService({
        url: '/account/create',
        method: 'post',
    })
}

async function getUserById(){
    return await Service.requestService({
        url: '/account/getUserById',
        method: 'get',
    })
}

async function alterUser(){
    return await Service.requestService({
        url: '/account/alterUser',
        method: 'post',
    })
}

async function changeAvator(){
    return await Service.requestService({
        url: 'account/changeAvator',
        method: 'post',
    })
}

async function deleteUser(){
    return await Service.requestService({
        url: 'account/deleteUser',
        method: 'post',
    })
}

export default{
    login,
    create,
    getUserById,
    alterUser,
    changeAvator,
    deleteUser,
}