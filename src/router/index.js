import {createRouter, createWebHistory} from 'vue-router'

// 页面对应的vue文件
import HelloRouter from '../pages/hello/HelloWorld.vue'
import JumpRouter from '../pages/jump/jump.vue'


const routes = [
    {
    	path: '/',
    	redirect: '/hello'
    },
    {
    	path:'/hello',
    	name: "首页",
    	component: HelloRouter
    },
    {
    	path:'/jump',
    	name:'跳转',
    	component: JumpRouter
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router