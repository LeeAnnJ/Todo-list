import Task from '../api/task.js';

const cycle=["暂无","每周一","每周二","每周三","每周四","每周五","每周六","每周日"];

function parseTime(time){
    if (time==null) return "暂无";
    var date = new Date(time);
	let monthString = date.getMonth()+1>=10? String(date.getMonth()+1): '0'+(date.getMonth()+1);
    let dtString = date.getDate()>=10? String(date.getDate()):'0' + date.getDate();	
	let hourString = date.getHours()>=10? String(date.getHours()):'0'+date.getHours();
	let minuString = date.getMinutes()>=10? String(date.getMinutes()):'0'+date.getMinutes();
	let secondString = date.getSeconds()>=10? String(date.getSeconds()):'0'+date.getSeconds();
	let str=date.getFullYear()+'-'+monthString+'-'+dtString+' '+hourString+':'+minuString+':'+secondString;
    return str;
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
            circul: cycle[item.cycle],
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
                today = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
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

/**
 * 任务列表
 */
async function getFolder(client_id,folder_id){
    console.log(folder_id);
    var tasks=[];
    await Task.getTaskByUserId(client_id).then(
        res=>{
            let list = res.data.data;
            list = list.filter(lis=> lis.task_folder_id == folder_id);
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
    console.log("tasks:",tasks);
    return tasks;
}

/**
 * 设置重要性
 */
async function setImportant(task_id,important){
    let task = {
        task_id: task_id,
        priority: important
    }
    var data;
    await Task.modifyTask(task).then(
        res => { data = res.data; },
        err =>{ data = err }
    )
    return data;
}

function convertKeyToDetail(item){
    let task = {
        name: item.task_name,
        note: item.task_description,
        indaily: false, //
        belongs_folder: "中级实训",
        belongs_folder_id: item.task_folder_id,
        create_time: parseTime(item.task_create_time),
        priority: item.task_priority>0? true:false,
        deadline: parseTime(item.task_ddl),
        circle: cycle[item.cycle],
        is_favor: item.task_isfavorite>0? true:false,       
    }
    return task;
}

async function getTaskDetail(task_id){
    var task;
    await Task.getTaskById(task_id).then(
        res => {
            task = convertKeyToDetail(res.data.data);
        },err => {task = err;}
    )
    return task;
}

function convertKeyToInvite(item){
    let task= {
        group_id: item.task_group_id,
        task_name: item.task_name,
        task_description: item.task_description
    }
    return task;
}

async function getTaskforInvite(task_id){
    var task;
    await Task.getTaskById(task_id).then(
        res => {
            task = convertKeyToInvite(res.data.data);
        },err => {task = err;}
    )
    return task;
}

export default{
    getAllTask,
    getToday,
    getDDL,
    getGroupTask,
    getImportant,
    getPeriod,
    setImportant,
    getFolder,
    getTaskDetail,
    getTaskforInvite
}