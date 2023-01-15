import Account from '../api/account.js';

async function getSimpleInfo(user){
    let account = {
        user_name: "user_name",
        avatar_path: "avatar_path"
    }
    await Account.getUserById(user).then(
        res => {
            let data = res.data.client.acc_info;
            account.user_name = data.user_name;
            account.avatar_path = "http://localhost:3000"+data.avatar_path;
        }
    )
    return account;
}

export default {
    getSimpleInfo
}