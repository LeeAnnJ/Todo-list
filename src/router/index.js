import {createRouter, createWebHistory} from 'vue-router'

// 页面对应的vue文件
import HelloRouter from '../pages/hello/hello.vue';
import HomeRouter from '../pages/home/Home.vue';
import LoginRouter from '../pages/login/login.vue';
import RegistorRouter from '../pages/registor/registor.vue';
import AllTask from '../pages/jump/allTask.vue';
import DDL from '../pages/jump/ddl.vue';
import Important from '../pages/jump/important.vue';
import Period from '../pages/jump/period.vue';
import DetailRouter from '../pages/task-detail/TaskDetail.vue';
import TestRouter from '../pages/test/test.vue';
import GroupRouter from '../pages/jump/grouptask.vue';
import InviteRouter from '../pages/invite/invite.vue';
import FolderRouter from '../pages/jump/folder.vue';

const routes = [
    {
    	path: '/',
    	redirect: '/hello'
    },
    {
    	path:'/hello',
    	name: "欢迎页",
    	component: HelloRouter
    },
    {
        path:'/login',
        name:"登录",
        component: LoginRouter
    },
    {
        path:'/registor',
        name:'注册',
        component: RegistorRouter
    },
    {
        path:'/home',
        name:'Todo-List在线看板',
        component: HomeRouter
    },
    {
    	path:'/taskDetail/:id',
    	name:'taskDetail',
    	component: DetailRouter
    },
    {
    	path:'/allTask',
    	name:'全部',
    	component: AllTask
    },
    {
    	path:'/ddl',
    	name:'有截止日期的任务',
    	component: DDL
    },
    {
    	path:'/important',
    	name:'_important',
    	component: Important
    },
    {
    	path:'/taskDetail',
    	name:'任务详情',
    	component: DetailRouter
    },
    {
    	path:'/period',
    	name:'_period',
    	component: Period
    },
    {
        path: '/group',
        name: '_group',
        component: GroupRouter
    },
    {
        path: '/test',
        name: '测试界面',
        component: TestRouter
    },
    {
        path: '/invite/:task/:user',
        name:'invite',
    	component: InviteRouter
    },
    {
        path: '/folder/:fold/:name',
        name: 'folder',
        component: FolderRouter
    }
   
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router