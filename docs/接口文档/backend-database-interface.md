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

接口请求地址：`/create`，请求方式：`POST`

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

接口请求地址：`/getUserById`，请求方式：`GET`

请求参数说明：
```json
{
    "client_id": "xxx",
    "content":{
        "user_name": "xxx",
        "password_hash": "xxx",
        "introduction": "xxx"
    }
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

### 3.修改用户信息
根据账号ID,修改请求数据中对应的字段，其余不变。

接口请求地址：`/alterUser`，请求方式：`POST`

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

接口请求地址：`/changeUserAvator`，请求方式：`POST`

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
    "avator_file":file
}
```

成功响应返回数据：无

### 5.获取头像信息
根据头像地址获取图片的`blob`数据。

接口请求地址：`/getUserAvator`，请求方式：`GET`

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

接口请求地址：`/deleteUser`，请求方式：`POST`

请求参数说明：
```json
{
    "client_id": "xxx"
}
```
返回数据：无

### 7.登录请求
根据用户输入的账户名和密码判断是否有该账户，若有返回账号相关信息，若无返回错误信息。

接口请求地址：`/login`，请求方式：`POST`

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
接口请求地址：`/checkUserName`，请求方式：`GET`

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
接口请求地址：`/createTaskList`，请求方式：`POST`

请求参数说明：
```json
{
    "client_id": "xxx",
    "folder_name": "xxx",
}
```
返回数据：
```
{
    "folder_id":"xxx"
}
```
### 2.修改任务列表名称
接口请求地址：`/alterTaskList`，请求方式：`POST`

请求参数说明：
```json
{
    "folder_id": "xxx",
    "folder_name": "xxx",
}
```
返回数据：无

### 3.移动任务所在的任务列表
将编号为`task_id`的任务移动到编号为`folder_id`的任务列表

接口请求地址：`/moveTaskList`, 请求方式:`POST`

请求参数说明：
```json
{
    "task_id": "xxx",
    "folder_id": "xxx"
}
```
成功响应数据：无

### 4..删除任务列表
接口请求地址：`/deleteTaskList`，请求方式：`POST`

请求参数说明：
```json
{
    "client_id": "xxx",
    "folder_id": "xxx",
}
```
返回数据：无

## 任务项相关
### 1.新建任务
接口请求地址：`/createTask`，请求方式：`POST`

请求参数示例：
```json
{
    "register_id": "xxx",
    "name": "xxx",
    "type" : 0,
    "priority": 0,
    "deadline":"xxxx",
    "note":"xxxx",
    "belongs_folder_id": 000,
    "people":["xxx","xxx","xxx","xxx"]
}
```
参数说明：
|字段|类型|是否必填|
|:-:|:-:|:-:|
|type|int|是，0为个人任务，1为群组任务|
|priority|int:0 or 1|否|
|deadline|datetime:"yyyy-mm-dd hh:mm"|否|
|note|text|否|
|belongs_folder_id|int| 否|
|people|array|否，数组中每一项为共同参与人的id|

返回数据：
```json
{
    "task_id":"xxx",
    "create_time":"xxx",

}
```
### 2. 根据任务id获取任务信息

接口请求地址：`/getTaskById`，请求方式：`GET`

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

接口请求地址：`/getTaskByUser`，请求方式：`GET`

请求参数说明：
```json
{
    "client_id":"xxx"
}
```
成功响应编码：
```json
{   
    "tasks":[{
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
    },{
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
        ...
    ]
}
```

### 4. 修改任务信息
接口请求地址：`/modifyTask`，请求方式：`POST`

请求参数说明：
```json
{
    "task_id":"xxx",
    "content": {
        "name": "xxx",
        "type": 0,
        "priority": 0,
        "deadline": "yyyy-mm-dd hh:mm",
        "note": "text",
        "is_favor": 0,
        "belongs_folder_id": 0
    }
}
```
成功响应编码：无

### 5. 删除任务

接口请求地址：`/modifyTask`，请求方式：`POST`

请求参数说明：
```json
{
    "task_id":"xxx"
}
```
成功响应编码：无

### 6. 根据任务id获取子步骤

接口请求地址：`/getSubtask`，请求方式：`GET`

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

### 7. 为任务添加子步骤

接口请求地址：`/addSubtask`，请求方式：`POST`

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

### 8. 修改任务子步骤

接口请求地址：`/alterSubtask`，请求方式：`POST`

请求参数说明：
```json
{
    "subtask_id":"xxx",
    "content": {
        "name": "xxx",
    }
}
```
成功响应编码：无

### 9. 删除任务子步骤

接口请求地址：`/deleteSubtask`，请求方式：`POST`

请求参数说明：
```json
{
    "subtask_id":"xxx",
}
```
成功响应编码：无

## 任务群组相关

### 1. 查询任务群组的创建人
根据任务编号`task_id`,查询任务的创建人

接口请求地址：`/getTaskOwner`，请求方式：`GET`

请求参数说明：
```json
{
    "task_id":"xxx",
}
```
成功响应编码：
```json
{   
    "task_id":"xxx",
    "task_owner": "xxx",
}
```

### 2. 查询任务的所有参与人

根据任务编号`task_id`,查询所有参与此任务的用户。

接口请求地址：`/getTaskOwner`，请求方式：`GET`

请求参数说明：
```json
{
    "task_id":"xxx",
}
```
成功响应编码：
```json
{   
    "task_id":"xxx",
    "clients": [{
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
**P.S.** 若用户是该任务的创建人，则`is_owner`字段为`true`

### 3. 添加共同参与人

向任务编号为`task_id`的用户添加账号为`client_id`的参与人,

接口请求地址：`/addTaskMember`，请求方式：`POST`

请求参数说明：
```json
{
    "task_id": "xxx",
    "client_id": "xxx"
}
```
成功响应编码：无

### 4.删除共同参与人

接口请求地址：`/deleteTaskMember`，请求方式：`POST`

请求参数说明：
```json
{
    "task_id": "xxx",
    "client_id": "xxx"
}
```
成功响应编码：无

## 消息提示相关

### 1.查询用户对应的消息

根据用户账号，查询所有接收方为该用户的信息。

接口请求地址：`/getMessage`，请求方式：`GET`

请求参数说明：
```json
{
    "client_id":"xxx",
}
```
成功响应编码：
```json
{   
    "client_id":"xxx",
    "messages": [
        {
            "message_id": 000,
            "push_type": 0,
            "push_time": "yyyy-mm-dd hh:mm",
            "is_read": 0,
        },{
            "message_id": 000,
            "push_type": 0,
            "push_time": "yyyy-mm-dd hh:mm",
            "is_read": 0,
        },
        ...
    ]
}
```
(表格里好像没看到信息内容？)

### 2.修改消息的已读/未读状态


接口请求地址：`/setReadState`，请求方式：`POST`

请求参数说明：
```json
{
    "message_id":"xxx",
    "is_read": 0
}
```
成功响应编码：无

### 3. 为目标用户生成消息

接口请求地址：`/createMessage`，请求方式：`GET`

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