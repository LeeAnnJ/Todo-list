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
        data:{
            account:{
                username:"张三",
                passwd_hash:"F6860DFD05EE2D65375B1E83E81DF9F48890ABB278E81C3CB6C9E5BE9FDE8FB3",
                introduction:"测试介绍",
            }
        }
    })
}

async function getUserById(client_id){
    console.log( client_id);
    return await Service.requestService({
        url: '/account/getUserById',
        method: 'get',
        params :{ 
            "client_id":client_id
        }
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

async function checkUserName(user_name){
    return await Service.requestService({
        url: 'account/checkUserName',
        method: 'get',
        params: {
            "user_name": user_name
        },
    })
}

export default{
    login,
    create,
    getUserById,
    alterUser,
    changeAvator,
    deleteUser,
    checkUserName,
}