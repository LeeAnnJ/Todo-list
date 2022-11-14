# <center>To-do List 在线看板网站项目说明文档</center>
<center>
项目成员：杨翼飞 李安吉 吕敬 刘浩然 王凡<br>
指导教师: 黄袁 &emsp; 助教：陈中麒<br>
2022年11月——2022年12月
</center>

## 更新日志（这段交上去之前可以删掉，放在前面方便看）
<center>

|时间|作者|更新内容|
|:--:|:--:|:--:|
|2022.11.10|李安吉|创建文档，搭了一下基本的结构，<br>大概充实了一下需求分析，内容之后可以看情况调|
|xxxx|xxxx|xxxx|
|xxxx|xxxx|xxxx|
|xxxx|xxxx|xxxx|
</center>

### 2022.11.14 by 联机
在需要预览界面效果前，请先[配置Vue环境](https://blog.csdn.net/mengchuan6666/article/details/125893199)

前端项目文件夹结构设置:

- node_models: Vue框架的基本配置
- public: 通用资源，之后我会把图标文件放在`/icons`文件夹。
- src: 项目的主要结构在这里
	- assets: 静态资源，例如通用的css样式、界面用到的图片等
		- css: 通用样式
	- components: 通用组件
	- http: 以后连接后端的api在这里
	- pages: 页面，一个页面配置一个文件夹，若使用需要在`router/index.js`文件进行路由配置，我简单写了个两个页面。
	- router: 用来配置路由，我在`index.js`文件里写了简单示例
	- App.vue: 启动页面，一般不用动
	- main.js: 上全局变量之前应该不用动


### 2022.11.12 by 联机
前端为了保证合理的项目工作量和良好的界面效果，决定采用`Vue 3.2.8`b版本的框架，创建的初始项目为Hbuiler中的Vue项目，并考虑使用[Vue Design](https://www.iviewui.com/view-ui-plus/guide/introduce)引入简单组件方便开发。可能使用到的小图标也会考虑从图标库找一套，之后放在代码库里。

基本的界面设计会放在`/UIdesign`文件夹里，有意见或疑问还请及时提出。


## 人员分工
<center>

|组员|分工|
|:--:|:--:|
|杨翼飞|xxxx|
|李安吉|xxxx|
|吕敬|xxxx|
|刘浩然|xxxx|
|王凡|xxxx|
</center>

---

## 1 项目介绍
To-do List在线看板是一个结合待办任务checklist和小组项目可视化同步管理功能的服务网站项目，balabalabalabala.....

---
## 2 项目需求分析
### 2.1 任务概述
#### **2.1.1 背景**

#### **2.1.2 定义**
在本项目中，设定一些基本概念如下：
1. 用户：在该网站中已经注册账号的使用者。对于对于访问到本网页但未进行注册或登录的浏览者，我们不对其展示主要功能界面，并引导浏览者注册账户。
2. 任务：用户创建的待办事项，其中必包含内容为任务名称、创建时间、是否重要，可选择包含内容有任务描述、子步骤、截止时间、周期性、附件、共同参与人、评论等。
3. 任务列表：包含一个到多个任务不等的集合，可以认为是管理任务的文件夹，一部分为网站固定设置，根据任务的不同属性进行分类，另一部分由用户自行创建并设置
4. 任务群组：由共同参与一项任务的用户组成的集合。在一个任务群组里，组员同步任务进度。

#### **2.1.3 用户特点分析**
<br>

### 2.2 实现目标

#### **2.2.1 用户信息**
网站中的用户可以通过手机号/邮箱创建账号，并填写用户昵称、密码等必要信息完成账号注册。在之后的使用过程中，用户可以选择修改个人头像、绑定的手机号/邮箱和密码。

若用户长时间不使用该网站，或用户自行选择注销账号，网站支持删除账号信息。（对于其创建的任务，展示信息时会显示“用户已注销”。（这个属于拓展功能，来不及做就删掉））

#### **2.2.2 待办任务创建**
用户可以点击“新增任务”选项，填写任务名称，是否重要两个必选项，以及任务描述、截止时间、归属任务列表等上文中提到的任务包含的可选内容，确认后完成待办任务的创建。

#### **2.2.3 待办任务管理与任务列表**
在任务执行过程中，用户可以修改任务的重要性、截止日期和周期性，以及增加、修改或者删除任务的子步骤来调整任务的具体内容。

同时，用户也可以自行创界任务列表，通过向列表中添加任务，或移动任务所归属的任务列表，来实现对任务的管理。

#### **2.2.4 任务群组与共同参与人**
当用户创建一个任务以后，我们默认该任务具有群组属性，该用户成为此任务群组的群主，可以添加其他用户作为共同参与人。一个任务群组中的组员可以同步更新任务详细内容和任务进度。

用户可以通过分享链接的方式来邀请其他用户加入任务群组，也可以通过搜索任务编号的方式申请加入一个任务群组，当群主同意该用户进入群组后，该用户成为任务的共同参与人。

#### **2.2.5 消息提示栏**
消息提示栏部分用于展示和用户参与的任务相关的动态信息。例如共同参与人更新任务信息、用户申请加入任务群组，以及申请加入群组成功/失败等信息。
#### **2.2.X 后面有扩展功能再写吧**
<br>

### 2.3 需求规定
（我没想好写什么，就先随便搬几条上来吧）
#### 对功能的规定：
#### 数据管理能力要求
#### 故障管理能力要求
#### 其他专门要求

---
## 3 项目功能设计
### 3.1 系统结构描述
### 3.2 子系统功能描述
### 3.3 数据设计
### 3.4 用户接口设计
### 3.5 交互界面设计
初步设定主界面设计如下：
![主界面](/UIdesign/mainWindow.png)

---
## 4 项目功能实现——前端部分

---
## 5 项目功能实现——后端部分

---
## 总结