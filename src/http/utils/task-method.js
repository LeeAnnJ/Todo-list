import Task from '../api/task.js';

function parseTime(time){
    if (time==null) return "暂无";
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
    console.log("task:",task);
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

/**
 * 获取今日任务
 */
async function getToday(client_id){
    var tasks=[];
    await Task.getTaskByUserId(client_id).then(
        res=>{
            let list = res.data.data;
            list = list.filter(lis=> {
                var today = new Date();
                today = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
                return ((lis.task_ddl!=null&&lis.task_ddl.startsWith(today)) || lis.task_isfavorite==1)
            });
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

/**
 * 获取有截止日期的任务
 */
async function getDDL(client_id){
    var tasks=[];
    await Task.getTaskByUserId(client_id).then(
        res=>{
            let list = res.data.data;
            list = list.filter(lis=> lis.task_ddl != null);
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

/**
 * 获取群组任务
 */
async function getGroupTask(client_id){
    var tasks=[];
    await Task.getTaskByUserId(client_id).then(
        res=>{
            let list = res.data.data;
            list = list.filter(lis=> lis.task_type == 1);
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

/**
 * 获取重要任务
 */
async function getImportant(client_id){
    var tasks=[];
    await Task.getTaskByUserId(client_id).then(
        res=>{
            let list = res.data.data;
            list = list.filter(lis=> lis.task_priority == 1);
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

/**
 * 获取周期性任务
 */
async function getPeriod(client_id){
    var tasks=[];
    await Task.getTaskByUserId(client_id).then(
        res=>{
            let list = res.data.data;
            list = list.filter(lis=> lis.cycle > 0);
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
    getAllTask,
    getToday,
    getDDL,
    getGroupTask,
    getImportant,
    getPeriod
}