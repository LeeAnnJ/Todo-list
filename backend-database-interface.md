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

接口请求地址：`/createAccount`，请求方式：`POST`

请求参数说明：
```json
{
    "account":{
        "user_name":"xxx",
        "password_hash":"xxx"
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
    "client_id": "xxx",
    "user_anme": "xxx",
    "password_hash": "xxx",
    "avator_path": "xxx",
    "register_time":"xxx",
    "introduction": "xxx",
}
```

**P.S.** 因为前端的界面有一个“个人简介”，所以用户账号的表里要加一个`introduction`字段，麻烦啦

### 3.修改用户信息
根据账号ID,修改请求数据中对应的字段，其余不变。

接口请求地址：`/alterUser`，请求方式：`POST`

请求参数说明：
```json
{
    "client_id": "xxx",
    "content":{
        "user_anme": "xxx",
        "password_hash": "xxx",
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
### 1.修改任务列表名称
接口请求地址：`/alterTaskList`，请求方式：`POST`

请求参数说明：
```json
{
    "folder_id": "xxx",
    "folder_name": "xxx",
}
```
返回数据：无

### 3.删除任务列表
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
    "priority": 0,
    "deadline":"xxxx",
    "note":"xxxx",
    "belongs_folder_id": 000
}
```
参数说明：
|字段|类型|是否必填|
|:-:|:-:|:-:|
|priority|int:0 or 1|否|
|deadline|datetime:"yyyy-mm-dd hh:mm"|否|
|note|text|否|
|belongs_folder_id|int| 否|

返回数据：
```json
{
    "task_id":"xxx",
    "create_time":"xxx"
}
```
### 2. 根据任务id获取任务信息

### 3. 修改任务信息

### 4. 删除任务

### 5. 根据任务id获取子步骤

### 6. 为任务添加子步骤

### 7. 修改任务子步骤

### 8. 删除任务子步骤

## 任务群组相关

### 1. 查询任务群组的创建人

### 2. 添加共同参与人

### 3.删除共同参与人

## 消息提示相关

### 1.查询用户对应的消息

### 2.修改消息的已读/未读状态

### 3. 为目标用户生成消息