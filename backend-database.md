# 数据库字典文档

## 用户账号信息相关

| 属性 | 名称          | 类型             | 缺省             | 空否 | 说明                                                |
| ---- | ------------- | ---------------- | ---------------- | ---- | --------------------------------------------------- |
| PK   | client_id     | bigint(unsigned) |                  | N    | 用户的识别代码，隐式识别                            |
|      | user_name     | varchar(32)      |                  | N    | 用户名                                              |
|      | passwd_hash   | binary(256)      |                  | N    | 密码hash，需要前端做加密（目前想法是可以考虑SM3）   |
|      | avator_path   | varchar(256)     | 默认用户头像路径 | Y    | 用户头像路径，目前想的是相对路径前端拼接之后再发GET |
|      | register_time | datetime         |                  | N    | 注册时间                                            |
|      |               |                  |                  |      |                                                     |

| 属性 | 名称                     | 类型                       | 缺省 | 空否 | 说明     |
| ---- | ------------------------ | -------------------------- | ---- | ---- | -------- |
| PK   | group_id                 | bigint(unsigned)           |      | N    | 群组id   |
| FK   | founder_id               | bigint(unsigned)           |      | N    | 创始人id |
|      | register_time            | datetime                   |      | N    | 注册时间 |
|      | members_num              | int(unsigned)              | 0    | N    | 成员数量 |
|      | (群组有没有头像暂且不知) | （有头像按上面加一列即可） |      |      |          |
|      |                          |                            |      |      |          |

| 属性 | 名称       | 类型             | 缺省 | 空否 | 说明   |
| ---- | ---------- | ---------------- | ---- | ---- | ------ |
| PK   | belongs_id | bigint(unsigend) |      | N    | 序号   |
| FK   | group_id   |                  |      | N    | 群组id |
| FK   | client_id  |                  |      | N    | 成员id |
|      |            |                  |      |      |        |

| 属性   | 名称      | 类型         | 缺省 | 空否 | 说明         |
| ------ | --------- | ------------ | ---- | ---- | ------------ |
| PK1,FK | client_id |              |      | N    | 所属的用户id |
| PK1    | folder_id | int(usigned) | 0    | N    | 文件夹id     |
|        |           |              |      |      |              |

## 任务相关

| 属性 | 名称              | 类型             | 缺省 | 空否 | 说明                                              |
| ---- | ----------------- | ---------------- | ---- | ---- | ------------------------------------------------- |
| PK   | task_id           | bigint(unsigned) |      | N    |                                                   |
| FK   | register_id       | bigint(unsigned) |      | N    |                                                   |
|      | create_time       | datetime         |      | N    | 创建时间                                          |
|      | name              | varchar(255)     |      | N    | 任务名                                            |
|      | type              | tinyint(1)       |      | N    | 0/1 0表示个人任务 1表示群组任务                   |
|      | priority          | tinyint(1)       | 0    | N    | 优先级 默认低优先级                               |
|      | deadline          | datetime         |      | Y    | ddl可为空                                         |
| FK   | group_belong      | bigint(unsigned) |      | Y    | type=1才有意义 SQLServer不能为空但是Mysql好像可以 |
|      | note              | text             |      | Y    | 任务说明，可不填                                  |
|      | is_favor          | tinyint(1)       | 0    | N    | 是否收藏                                          |
| FK   | belongs_folder_id | int(unsigned)    |      | Y    | 所属文件夹（type = 0）才有意义                    |
|      |                   |                  |      |      |                                                   |

| 属性      | 名称       | 类型          | 缺省 | 空否 | 说明       |
| --------- | ---------- | ------------- | ---- | ---- | ---------- |
| FK（PK1） | task_id    |               |      | N    | 任务id     |
| （PK1）   | subtask_id | int(unsigned) |      | N    | 子任务序号 |
|           | name       | carchar(255)  |      | N    | 子任务名   |
|           |            |               |      |      |            |

## 消息提示相关

| 属性 | 名称       | 类型             | 缺省 | 空否 | 说明       |
| ---- | ---------- | ---------------- | ---- | ---- | ---------- |
| PK   | message_id | bigint(unsigned) |      | N    | 消息id     |
| FK   | client_id  |                  |      | N    | 接收用户id |
|      | push_type  | tinyint(1)       |      | N    | 推送类型   |
|      | push_time  | datetime         |      | N    | 推送时间   |
|      | is_read    | tinyint(1)       |      | N    | 是否已读   |
|      |            |                  |      |      |            |