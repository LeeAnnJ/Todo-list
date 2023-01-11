# <center>To-do List 在线看板网站项目后端说明</center>

## 起步

配置包的命令我写在 `package-config.bat` 里了,直接终端运行就可以安装

因为我是配完后写的，所以如果脚本有问题可以手动运行里面的命令。

<del>
然后构建项目：
</del>

```bash
    express --view=pug build
```

<del>
或者直接 `express build` 也行。
</del>

<font color='green'>其实现在不用build了，直接运行就可以了。</font>

数据库使用`initial.sql`创建,名称为`to-do-list`,这个可以在`config/dbConfig.js`里看。

为了保持统一的基础配置，请在数据库中创建新用户，命令如下：
```sql
CREATE USER 'TO-DO-LIST'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
GRANT ALL PRIVILEGES ON *.* TO 'TO-DO-LIST'@'%';
```

然后是运行项目,运行指令为：

```cmd
    node bin/www
```

后端会在`localhost:3000`运行。

继续增加路由可以看到请求效果，例如在浏览器输入方法为get的路由，如`localhost:3000/account/getUserById?=client_id=1`,如果你的数据库里有账号为1的用户，可以看到
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