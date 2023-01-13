import Service from "../axios";

/**
 * 获取账户对应的消息
 * @returns messages[{message_id,push_type,push_time,isread}]
 */
async function getMessage(client_id){
    return await Service.requestService({
        url: '/message/getMessage',
        method: 'get',
        params :{ 
            "client_id":client_id
        }
    })
}

/**
 * 修改消息的已读/未读状态
 */
async function postMessage(message_id,is_read){
    return await Service.requestService({
        url: '/message/getMessage',
        method: 'post',
        data:{
            message_id:message_id,
            is_read:is_read
        }
    })
}

export default {
    getMessage,
    postMessage,
}