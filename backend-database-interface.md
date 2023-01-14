# 后端接口文档
## 说明
1. 以下请求地址为忽略`baseurl`的请求地址。
2. 传递的数据类型没有说明默认为`json`。

3. 成功响应默认信息格式：
```json
{
    "code":"200",
    "message":"请求成功",
    "data": "xxx"
}
```
以下响应数据只写`data`部分。

4. 请求参数中的字段若无特殊说明，与数据库中的数据表对应字段内容一致、

## 用户信息相关

### 1.创建用户账号

根据用户注册时填写的表单生成新的账号记录，返回账号id

接口请求地址：`/account/create`，请求方式：`POST`

请求参数说明：
```json
{
    "account":{
        "username":"xxx",
        "passwd_hash":"xxx",
        "introduction":"xxx",
    }
}
```
成功响应编码：
```json
{
    "client_id":"xxxx"
}
```

### 2.根据账号获取用户信息

接口请求地址：`/account/getUserById`，请求方式：`GET`

请求参数说明：
```json
{
    "client_id": "xxx",
}

```
成功响应返回数据：
```json
{
    "client":{
        "client_id": "xxx",
        "user_name": "xxx",
        "password_hash": "xxx",
        "avatar_path": "xxx",
        "register_time":"xxx",
        "introduction": "xxx"
    }
}
```

### 3.修改用户信息
根据账号ID,修改请求数据中对应的字段，其余不变。

接口请求地址：`/account/alterUser`，请求方式：`POST`

请求参数说明：
```json
{
    "client_id": "xxx",
    "content":{
        "new_user_name": "xxx",
        "new_password_hash": "xxx",
        "introduction": "xxx"
    }
}
```
**注意：除`client_id`字段以外，其余字段可缺省。**

成功响应返回数据：无

### 4.修改用户头像
上传头像图片到后端。

接口请求地址：`/account/changeAvator`，请求方式：`POST`

请求头说明：
```json
{
    "ContentType":"multpart/form-data"
}
```

请求参数说明：
```
{
    "client_id":"xxx",
    "avatar_file":file
}
```

成功响应返回数据：无

### 5.获取头像信息
根据头像地址获取图片的`blob`数据。

接口请求地址：`/account/getUserAvator`，请求方式：`GET`

请求头说明：
```
{
    'ContentType':'multpart/form-data'
}
```

请求参数说明：
```json
{
    "avator_path": "xxx",
}
```
返回数据：
```
{
    "avator_file":file
}
```
**P.S.** 前端注意请求体设置：
```
responseType: 'blob'
```

成功响应返回数据：无

### 6.注销账户
删除对应ID的账户记录。

接口请求地址：`/account/deleteUser`，请求方式：`POST`

请求参数说明：
```json
{
    "client_id": "xxx"
}
```
返回数据：无

### 7.登录请求
根据用户输入的账户名和密码判断是否有该账户，若有返回账号相关信息，若无返回错误信息。

接口请求地址：`/account/login`，请求方式：`POST`

请求参数说明：
```json
{
    "user_name": "xxx",
    "passwd_hash": "xxx",
}
```
成功响应返回数据：
```json
{
    "client":{
        "client_id": "xxx",
        "user_name": "xxx",
        "password_hash": "xxx",
        "avator_path": "xxx",
        "register_time":"xxx",
        "introduction": "xxx"
    }
}
```
### 8.注册时判断用户名是否重复
接口请求地址：`/account/checkUserName`，请求方式：`GET`

请求参数说明：
```json
{
    "user_name": "xxx",
}
```
若用户名有重复，返回数据：
```json
{
    "result": false
}
```
否则返回数据：
```json
{
    "result": true
}
```

## 任务列表相关
### 1.为用户新建任务列表
接口请求地址：`/folder/createTaskList`，请求方式：`POST`

请求参数说明：
```json
{
    "folder":{
        "folder_creator": "xxx",
        "folder_name": "xxx",
        "folder_description": "xxx",
    }
}
```
返回数据：
```json
{
    "folder_id":"xxx"
}
```
### 2.修改任务列表名称
接口请求地址：`/folder/alterTaskList`，请求方式：`POST`

请求参数说明：
```json
{
    "folder": {
        "folder_id": "xxx",
        "folder_name": "xxx",
        "folder_description": "xxx",
        "folder_creator": "xxx"
    }
}
```
返回数据：无

### 3.移动任务所在的任务列表(废了，用修改任务的接口就行)
将编号为`task_id`的任务移动到编号为`folder_id`的任务列表

接口请求地址：`/folder/moveTaskList`, 请求方式:`POST`

请求参数说明：
```json
{
    "task_id": "xxx",
    "folder_id": "xxx"
}
```
成功响应数据：无

### 4..删除任务列表
接口请求地址：`/folder/deleteTaskList`，请求方式：`POST`

请求参数说明：
```json
{
    "client_id": "xxx",
    "folder_id": "xxx",
}
```
返回数据：无

### 5.获取用户拥有的的任务列表
接口请求地址：`/folder/getUserTaskLists`，请求方式：`GET`

请求参数：
```json
{
    "client_id": "xxx",
}
```
成功响应参数：
```json
{
    "folders":[{
        "folder_id": "xxx",
        "folder_name": "xxx",
        "folder_description": "xxx",
        "folder_creator": "xxx",
    },{
        "folder_id": "xxx",
        "folder_name": "xxx",
        "folder_description": "xxx",
        "folder_creator": "xxx",
    },{...}]
}
```

## 任务项相关
### 1.新建任务
接口请求地址：`/task/createTask`，请求方式：`POST`

请求参数示例：
```json
{
    "task": {
        "register_id": "xxx",
        "name": "xxx",
        "type" : 0,
        "priority": 0,
        "deadline": "xxxx",
        "note": "xxxx",
        "belongs_folder_id": 000,
        "group_id": 0,
        "people":["xxx","xxx","xxx","xxx"]
    }
}
```
参数说明：
|       字段        |            类型             |             是否必填             |
| :---------------: | :-------------------------: | :------------------------------: |
|       type        |             int             |   是，0为个人任务，1为群组任务   |
|     priority      |         int:0 or 1          |                否                |
|     deadline      | datetime:"yyyy-mm-dd hh:mm" |                否                |
|       note        |            text             |                否                |
| belongs_folder_id |             int             |                否                |
|      people       |            array            | 否，数组中每一项为共同参与人的id |

返回数据：
```json
{
    "task_id":"xxx",
    "create_time":"xxx",

}
```
### 2. 根据任务id获取任务信息

接口请求地址：`/task/getTaskById`，请求方式：`GET`

请求参数说明：
```json
{
    "task_id":"xxx"
}
```
成功响应编码：
```json
{
    "task": {
        "task_id": "xxx",
        "register_id": "xxx",
        "create_time": "yyyy-mm-dd hh:mm",
        "name": "xxx",
        "type" :0,
        "priority": 0,
        "deadline": "yyyy-mm-dd hh:mm",
        "group_belong": 0000,
        "note": "xxxx",
        "is_favor": 0,
        "belongs_folder_id": "xxx"
    }
}
```
**P.S.** `task`中若有字符为空，返回`null`。

### 3.根据账户id查询其参与的所有任务

接口请求地址：`/task/getTaskByUserId`，请求方式：`GET`

请求参数说明：
```json
{
    "user_id":"xxx"
}
```
成功响应编码：
```json
{   
    "tasks":[{
        "task_id":2,
        "task_creator":1,
        "task_create_time":"yyyy-mm-ddThh:mm:ss.xxxZ",
        "task_name":"2023-01-02T02:05:34.000Z",
        "task_description":"测试群组任务1",
        "task_type":1,
        "task_priority":0,
        "task_ddl":"2023-01-24T02:05:47.000Z",
        "task_group_id":1,
        "task_isfavorite":1,
        "task_folder_id":null,
        "task_status":0,
        "subtasks_count":0,
        "cycle":0,
    },{
        "task_id":2,
        "task_creator":1,
        "task_create_time":"yyyy-mm-ddThh:mm:ss.xxxZ",
        "task_name":"2023-01-02T02:05:34.000Z",
        "task_description":"测试群组任务1",
        "task_type":1,
        "task_priority":0,
        "task_ddl":"2023-01-24T02:05:47.000Z",
        "task_group_id":1,
        "task_isfavorite":"用来测试群组任务",
        "task_folder_id":null,
        "task_status":0,
        "subtasks_count":0,
        "cycle":0,
    }
        ...
    ]
}
```

### 4. 修改任务信息
接口请求地址：`/task/modifyTask`，请求方式：`POST`

请求参数说明：
```json
{
    "task": {
        "task_id":"xxx",
        "name": "xxx",
        "type": 0,
        "priority": 0,
        "deadline": "yyyy-mm-dd hh:mm",
        "note": "text",
        "is_favor": 0,
        "belongs_folder_id": 0,
        "group_id": 0,
    }
}
```
成功响应编码：无

### 5. 删除任务

接口请求地址：`/task/deleteTask`，请求方式：`POST`

请求参数说明：
```json
{
    "task_id":"xxx"
}
```
成功响应编码：无

### 6. 将任务标记为已完成
接口请求地址：`/task/markTaskAsDone`,请求方式：`POST`

请求参数：
```json
{
    "task_id":"xxx"
}
```

### 7. 根据任务id获取子步骤

接口请求地址：`/task/getSubtaskByTaskId`，请求方式：`GET`

请求参数说明：
```json
{
    "task_id":"xxx"
}
```
成功响应编码：
```json
{   
    "task_id":"xxx",
    "subtasks":[{
        "subtask_id": 000,
        "name": "xxx"
    },{
        "subtask_id": 000,
        "name": "xxx"
    },
        ...
    ]
}
```

### 8. 为任务添加子步骤

接口请求地址：`/task/addSubtaskToTask`，请求方式：`POST`

请求参数说明：
```json
{
    "task_id":"xxx",
    "sub_task": {
        "name": "xxx",
    }
}
```
成功响应编码：
```json
{   
    "task_id":"xxx",
    "subtasks_id": "xxx"
}
```

### 9. 修改任务子步骤

接口请求地址：`/task/alterSubtaskToTask`，请求方式：`POST`

请求参数说明：
```json
{
    "task_id":"xxx",
    "subtask_id":"xxx",
    "content": {
        "name": "xxx",
    }
}
```
成功响应编码：无

### 10.将子步骤标记为已完成

接口请求地址：`/task/markSubTaskAsDone`，请求方式：`POST`

请求参数说明：
```json
{
    "subtask": {
        "subtask_id": "xxx",
        "task_id": "xxx"
    }
}
```
成功响应编码：无

### 11. 删除任务子步骤

接口请求地址：`/task/deleteSubTaskFromTask`，请求方式：`POST`

请求参数说明：
```json
{
    "subtask_id":"xxx",
    "task_id": "xxx",
}
```
成功响应编码：无

## 任务群组相关

### 1.创建任务群组
接口请求地址：`/group/createGroup`，请求方式：`POST`

请求参数说明：
```json
{
    "group": {
        "group_name": "xxx",
        "group_description": "xxx",
        "group_creator": "xxx"
    }
}
```
成功响应编码：
```json
{
    "group_id": "xxx"
}
```

### 2.删除任务群组
接口请求地址：`/group/deleteGroup`，请求方式：`POST`

请求参数说明：
```json
{
    "group_id": "group_id"
}
```
成功响应数据：无

### 3.修改任务群组相关信息
接口请求地址：`/group/updateGroupInfo`，请求方式：`POST`

请求参数说明：
```json
{
    "group": {
        "group_id": "xxx",
        "group_name": "xxx",
        "group_description": "xxx"
    }
}
```
成功响应数据：无

### 4. 根据群组id查询任务群组相关信息
接口请求地址：`/group/getGroupById`，请求方式：`GET`

请求参数说明：
```json
{
    "group_id": "xxx" 
}
```
成功响应编码：
```json
{
    "group": {
        "group_id": "xxx",
        "group_name": "xxx",
        "group_description": "xxx",
        "group_creator": "xxx",
        "group_create_time": "xxx",
    }
}
```

### 5. 查询任务群组的创建人
接口请求地址：`/group/getTaskOwnerOfGroup`，请求方式：`GET`

根据群组编号`gourp_id`,查询群组的创建人

请求参数说明：
```json
{
    "group_id":"xxx",
}
```
成功响应编码：
```json
{
    "group_creater_id":"xxx",
}
```

### 6.根据群组id获取这个群组的任务
接口请求地址：`/group/updateGroupInfo`，请求方式：`POST`

请求参数说明：
```json
{
    "group_id":"xxx",
}
```
成功响应编码：
```json
{
    "tasks":[{
        "register_id": "xxx",
        "name": "xxx",
        "type" : 0,
        "priority": 0,
        "deadline": "xxxx",
        "note": "xxxx",
        "belongs_folder_id": 000,
        "group_id": 0,
    },{
        "register_id": "xxx",
        "name": "xxx",
        "type" : 0,
        "priority": 0,
        "deadline": "xxxx",
        "note": "xxxx",
        "belongs_folder_id": 000,
        "group_id": 0,
    },{...}],
}
```

### 7. 根据用户id查询其参与的任务群组
接口请求地址：`/group/getGroupsByUserId`，请求方式：`GET`
请求参数说明：
```json
{
    "user_id":"xxx",
}
```
成功响应编码：
```json
{
    "groups": [{
        "group_id": "xxx",
        "group_name": "xxx",
        "group_description": "xxx",
        "group_creator": "xxx",
        "group_create_time": "xxx",
    },{
        "group_id": "xxx",
        "group_name": "xxx",
        "group_description": "xxx",
        "group_creator": "xxx",
        "group_create_time": "xxx",
    },{...}]
}
```

### 8. 查询任务的所有参与人
根据任务编号`task_id`,查询所有参与此任务的用户。

接口请求地址：`/group/getMembersByGroupId`，请求方式：`GET`

请求参数说明：
```json
{
    "group_id":"xxx",
}
```
成功响应编码：
```json
{   
    "members": [{
        "client_id": 000,
        "user_name": "xxx",
        "avator_path": "xxx",
        "is_owner": false
    },{
        "client_id": 000,
        "user_name": "xxx",
        "avator_path": "xxx",
        "is_owner": false
    },
        ...  
    ]
}
```
**P.S. 若用户是该任务的创建人，则`is_owner`字段为`true`**
*update:目前做法是创建人是返回元组的第一个元素，这样后端好复用一点*

### 9. 添加共同参与人

向任务编号为`task_id`的用户添加账号为`client_id`的参与人,

接口请求地址：`/group/addMemberToGroup`，请求方式：`POST`

请求参数说明：
```json
{
    "task_id": "xxx",
    "member_id": "xxx"
}
```
成功响应编码：无

### 10.删除共同参与人
接口请求地址：`/group/deleteMemberFromGroup`，请求方式：`POST`

请求参数说明：
```json
{
    "task_id": "xxx",
    "member_id": "xxx"
}
```
成功响应编码：无

## 消息提示相关

### 1.查询用户对应的消息

根据用户账号，查询所有接收方为该用户的信息。

接口请求地址：`/message/getMessage`，请求方式：`GET`

请求参数说明：
```json
{
    "client_id":"xxx",
}
```
成功响应编码：
```json
{   
    "message_list": [
        {
            "message_id": 000,
            "message_sender": 000,
            "message_receiver": 000,
            "message_type": 0,
            "message_content": "xxx",
            "send_time": "yyyy-mm-dd hh:mm:ss",
            "message_status": 0,
        },{
            "message_id": 000,
            "message_sender": 000,
            "message_receiver": 000,
            "message_type": 0,
            "message_content": "xxx",
            "send_time": "yyyy-mm-dd hh:mm:ss",
            "message_status": 0,
        },
        ...
    ]
}
```

### 2.修改消息的已读/未读状态


接口请求地址：`/message/postMessage`，请求方式：`POST`

请求参数说明：
```json
{
    "message_id":"xxx",
    "is_read": 0
}
```
成功响应编码：无

### 3. 为目标用户生成消息(废了，交给后端做)

接口请求地址：`/createMessage`，请求方式：`POST`

请求参数说明：
```json
{
    "client_id": "xxx",
    "push_time": "xxx",
    "content": "xxx"
}
```
成功响应编码：
```json
{   
    "message_id":"xxx"
}
```