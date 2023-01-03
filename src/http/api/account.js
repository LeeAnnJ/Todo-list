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
            "account":{
                "user_name":"123",
                "password_hash":"223",
                "introduction":"balabala",
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
        data: {
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