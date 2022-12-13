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

然后是运行项目,运行指令为：

```cmd
    node bin/www
```

后端会在`localhost:3000`运行。

继续增加路由可以看到请求效果，例如在浏览器输入`localhost:3000/account/login`,目前可以看到

```
    get account by id
```

等后端做好之后可以拿到进一步的数据。
