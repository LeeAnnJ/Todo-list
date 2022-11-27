import {createRouter, createWebHistory} from 'vue-router'

// 页面对应的vue文件
import HelloRouter from '../pages/hello/HelloWorld.vue';
import LoginRouter from '../pages/login/login.vue';
import JumpRouter from '../pages/jump/jump.vue';
import HomeRouter from '../pages/home/Home.vue';
import DetailRouter from '../pages/task-detail/TaskDetail.vue';



const routes = [
    {
    	path: '/',
    	redirect: '/home'
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
        path:'/home',
        name:'Todo-List在线看板',
        component:HomeRouter
    },
    {
    	path:'/taskDetail',
    	name:'任务详情',
    	component: DetailRouter
    },
    {
    	path:'/jump',
    	name:'跳转',
    	component: JumpRouter
    },
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router