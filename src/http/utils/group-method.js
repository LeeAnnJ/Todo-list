import { list } from 'postcss';
import Group from '../api/group.js'

async function MemberforDetail(group){
    let members = [];
    Group.getMembersByGroupId(group).then(
        res=> {
            let list = res.data.data.members;
            
            if(list.length>0){
                for(let i=0;i<list.length;i++){
                    members.push({
                        client_id: list[i].client_id,
                        avatar_path: "http://localhost:3000"+list[i].avatar_path,
                        user_name: list[i].user_name,
                        isowner: false
                    })
                }
                members[0].isowner = true;
                console.log("list:",members);
            }
        },
        err =>{
            console.log(err);
        }
    )
    return members;
}

async function JoinGroup(group_id,member_id){
    let req = {
        group_id: group_id,
        member_id: member_id
    }
    let result = false;
    await Group.addMemberToGroup(req).then(
        res=>{
            if(res.data.message=="success") result = true;
        },
        err => {
            console.log(err);
        }
    )
    return result;
}

export default {
    MemberforDetail,
    JoinGroup
}