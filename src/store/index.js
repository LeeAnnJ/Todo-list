import { createStore } from 'vuex'

export default createStore({
    // 1、 存储所有全局数据
    state: {
        user_name:'testusername'
    },
    // 2、 需要通过计算获取state里的内容获取的数据
    // 只能读取不可修改
    getters: {
    },
    //  3、定义对state的各种操作
    // why不直接实现在mutation里需要写到action里?
    // mtations不能执行异步操作。aq:从云端获取信息-->(等待云端反馈)更新到state异步操作
    // 因此说:对于异步操作需要放到action里，简单的直接赋值操作可以直接放到mutation里
    mutations: {
        alterName(state,newname){
            state.user_name = newname;
        }
    },
    // 3、定义对state的各种操作
    // actions无法直接修改state，需要在mutations里更新
    // mutation不支持异步，所以需要在action里写api到url
    actions: {
    },
    // state中信息过长时
    // 用来将state进行分割
    modules: {
    }
})
