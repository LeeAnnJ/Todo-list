import { createApp } from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入element-icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入全局变量
import store from './store'

//Vue.config.productionTip = false
//App.myType='app'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(ElementPlus)
app.use(store)
// app.provide('$axios',axios)
app.mount('#app')