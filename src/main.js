import Vue from 'vue'
import App from './App.vue'

// 引入样式
import '@/styles/reset.css'

// 引入路由
import router from '@/router/router.js'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
