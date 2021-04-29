import Vue from 'vue'
import App from './App.vue'

// 引入样式
import '@/styles/reset.css'

// 引入路由
import router from '@/router/router.js'

// import Vant from 'vant';
// // 所有use 都是挂载到全局                                   
// Vue.use(Vant);

import { Toast, Icon, Uploader, Dialog, Field, PasswordInput, NumberKeyboard, Popup, Overlay, ActionSheet, Tab, Tabs, List, PullRefresh, Search } from 'vant';
// 链式编程
Vue.use(Toast).use(Icon).use(Uploader).use(Dialog).use(Field).use(NumberKeyboard).use(PasswordInput).use(Popup).use(Overlay).use(ActionSheet).use(Tab).use(Tabs).use(List).use(PullRefresh).use(Search);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
