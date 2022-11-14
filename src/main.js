import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//Vue.config.productionTip = false
//App.myType='app'

createApp(App).use(router).mount('#app')
//app.$mount()