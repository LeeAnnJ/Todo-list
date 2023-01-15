import Service from "../axios";
/*
group

*/

async function getGroupById(){
    return await Service.requestService({
        url: '/group/getGroupById',
        method: 'get',
    })
}


async function getGroupsByUserId(){
    return await Service.requestService({
        url: '/group/getGroupsByUserId',
        method: 'get',
    })
}


async function createGroup(){
    return await Service.requestService({
        url: '/group/createGroup',
        method: 'post',
    })
}


async function deleteGroup(){
    return await Service.requestService({
        url: '/group/deleteGroup',
        method: 'post',
    })
}


async function getMembersByGroupId(group_id){
    return await Service.requestService({
        url: '/group/getMembersByGroupId',
        method: 'get',
        params: {
            "group_id": group_id
        }
    })
}


async function addMemberToGroup(req){
    return await Service.requestService({
        url: '/group/addMemberToGroup',
        method: 'post',
        data: req
    })
}


async function deleteMemberFromGroup(){
    return await Service.requestService({
        url: '/group/deleteMemberFromGroup',
        method: 'post',
    })
}

async function updateGroupInfo(){
    return await Service.requestService({
        url: '/group/updateGroupInfo',
        method: 'post',
    })
}


async function getTasksByGroupId(){
    return await Service.requestService({
        url: '/group/getTasksByGroupId',
        method: 'get',
    })
}


export default {
    getGroupById,
    getGroupsByUserId,
    createGroup,
    deleteGroup,
    getMembersByGroupId,
    addMemberToGroup,
    deleteMemberFromGroup,
    getMembersByGroupId,
    updateGroupInfo,
    getTasksByGroupId
}