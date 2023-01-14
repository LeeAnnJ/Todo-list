// 对应后端路径为/account的请求
import Service from "../axios";

/**
 * 登录接口
 */ 
async function login(username,password){
    return await Service.requestService({
        url: '/account/login',
        method: 'post',
        data:{
            user_name: username,
            passwd_hash: password,
        }
    })
}

/**
 * 成功返回数据：
 * ```json 
 * {"code":200,"message":"success","data":{"client_id":"xx"}}
 * ```  
 * 失败返回数据：
 * ```json
 * {"code":400,"message":"username already used","data":null}
 * ```
 */
async function create(req){
    return await Service.requestService({
        url: '/account/create',
        method: 'post',
        data:{
            account:{
                username: req.username,
                passwd_hash: req.passwd_hash,
                introduction: req.introduction,
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

async function alterUser(client_id,content){
    return await Service.requestService({
        url: '/account/alterUser',
        method: 'post',
        data:{
            client_id:client_id,
            content:{
                new_user_name:content.new_user_name,
                new_intro:content.introduction
            }
        }
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

async function getAvator(){
    return await Service.requestService({
        headers: {
            'Content-Type': 'multpart/form-data'
        },
        url:'/static/default.png',
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
    getAvator
}