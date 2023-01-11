<h1 align='center'>To-do List 在线看板网站项目后端运行说明</h1>

## 数据库初始化

数据库兼容MySql，在`initial.sql`创建,名称为`to-do-list`，所有的数据库配置均在`config/dbConfig.ts`中。

为了保持统一的基础配置，请在数据库中创建新用户，命令如下：

```sql
CREATE USER 'TO-DO-LIST'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
GRANT ALL PRIVILEGES ON *.* TO 'TO-DO-LIST'@'%';
```

**如果没有按上面的操作配置数据库账户的话，请勿直接push修改后的配置文件泄露个人密码信息并污染仓库！**

## 编译与运行

由于express框架入口为js文件，我们需要将写好的ts文件编译为js文件进行运行 <del> 其实是懒得写type文件 </del>

首先我们执行下面的命令进行编译

```bash
tsc
```

然后是运行项目,运行指令为：

```bash
node bin/www
```

后端会在`localhost:3000`运行，也可以更改环境变量使得后端运行在其他端口上。

## 接口测试

增加路由可以看到请求效果，例如在浏览器输入方法为get的路由，如`localhost:3000/account/getUserById?=client_id=1`,如果你的数据库里有账号为1的用户，可以看到

```json
{
    "code":200,
    "message":"success",
    "client":{
        "acc_info":{
            "client_id": 1,
            "user_name": "(用户名)",
            "password_hash": "（SM3加密后的密码）",
            "avatar_path": "/static/default.png",
            "register_time": "2023-01-01T12:36:37.000Z",
            "introduction": "（用户简介）"
        }
    }
}
```
