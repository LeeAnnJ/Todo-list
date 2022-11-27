import {createRouter, createWebHistory} from 'vue-router'

// 页面对应的vue文件
import HelloRouter from '../pages/hello/HelloWorld.vue';
import jump from '../pages/jump/jump.vue';
import HomeRouter from '../pages/home/Home.vue';
import DetailRouter from '../pages/task-detail/TaskDetail.vue';
import ddl from '../pages/jump/ddl.vue';
import important from '../pages/jump/important.vue';
import period from '../pages/jump/period.vue';

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
        component: HomeRouter
    },
    {
    	path:'/taskDetail',
    	name:'任务详情',
    	component: DetailRouter
    },
    {
    	path:'/jump',
    	name:'全部',
    	component: jump
    },

/////////////////////////////////////////////////

    {
    	path:'/ddl',
    	name:'_ddl',
    	component: ddl
    },
    {
    	path:'/important',
    	name:'_important',
    	component: important
    },
    {
    	path:'/taskDetail',
    	name:'任务详情',
    	component: DetailRouter
    },
    {
    	path:'/period',
    	name:'_period',
    	component: period
    }
   
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router