import Task from '../api/task.js';

function parseTime(time){
    if (time==null) return '';
    return time.slice(0,19).replace("T"," ");
}

/**
 * 按升序排列任务项
 * @returns 
 */
function sortTask(a,b){
    return a.task_id - b.task_id;
}

/**
 * 将任务转换为主界面需要的格式
 * @param {从getTaskByUserId拿到的任务} item 
 * @returns 
 */
function convertKeyByUser(item){
    console.log("item:",item);
    var task = {
        task_id: item.task_id,
        done: item.task_status>0? true:false,
        content: {
            name: item.task_name,
            register_id: item.task_creator,
            create_time: parseTime(item.task_create_time),
            priority: item.task_priority>0? true:false,
            deadline: parseTime(item.task_ddl),
            circul: item.cycle,
            is_favor: item.task_isfavorite>0? true:false,
            belongs_folder_id: item.task_folder_id
        },
    };
    return task;
}

/**
 * 获取适配主界面的所有任务
 * @param {用户账号} client_id
 */
async function getAllTask(client_id){
    var tasks=[];
    await Task.getTaskByUserId(client_id).then(
        res=>{
            let list = res.data.data;
            console.log("tasks:",list.length)
            if(list.length>0){
                for(let i=0;i<list.length;i++){
                    tasks.push(convertKeyByUser(list[i]));
                }
                tasks.sort(sortTask);
            }
        },
        error=>{
            console.log(error);
            return [];
        }
    )
    return tasks;
}

export default{
    getAllTask
}