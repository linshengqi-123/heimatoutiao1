import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const router = new VueRouter({
    routes: [

        {
            name: 'login',
            path: '/login',
            component: () => import('@/views/user/login.vue')
        },
        {
            path: '/',
            redirect: {
                name: 'login'
            }
        }
    ]
})
// 暴露全局
export default router