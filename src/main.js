import Vue from 'vue'
import App from './App.vue'

// 引入样式
import '@/styles/reset.css'

// 引入路由
import router from '@/router/router.js'

// import Vant from 'vant';
// // 所有use 都是挂载到全局                                   
// Vue.use(Vant);

import { Toast } from 'vant';

Vue.use(Toast);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
