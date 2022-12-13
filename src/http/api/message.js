import Service from "../axios";

/**
 * 获取账户对应的消息
 * @returns messages[{message_id,push_type,push_time,isread}]
 */
async function getMessage(){
    return await Service.requestService({
        url: '/message/getMessage',
        method: 'get',
    })
}

/**
 * 修改消息的已读/未读状态
 */
async function postMessage(){
    return await Service.requestService({
        url: '/message/getMessage',
        method: 'post'
    })
}

export default {
    getMessage,
    postMessage,
}