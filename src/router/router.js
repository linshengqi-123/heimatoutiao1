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
            name: 'index',
            path: '/index',
            component: () => import('@/views/index.vue')
        },
        {
            path: '/',
            redirect: {
                name: 'index'
            }
        },
        {
            name: 'register',
            path: '/register',
            component: () => import('@/views/user/register.vue'),

        },
        {
            name: 'personal',
            path: '/personal/:id',
            component: () => import('@/views/user/personal.vue'),

        },
        {
            name: 'edit_profile',
            path: '/edit_profile/:id',
            component: () => import('@/views/user/edit_profile.vue')
        },
        {
            name: 'postdetail',
            path: '/postdetail/:id',
            component: () => import('@/views/post/postdetail.vue')
        },
        {
            name: 'myfollow',
            path: '/myfollow',
            component: () => import('@/views/user/myfollow.vue')
        },
        {
            name: 'mystar',
            path: '/mystar',
            component: () => import('@/views/user/mystar.vue')
        },
        {
            name: 'comment',
            path: '/comment/:id',
            component: () => import('@/views/comment.vue')
        },
        {
            name: 'cateManager',
            path: '/cateManager',
            component: () => import('@/views/cateManager.vue')
        },
        {
            name: 'search',
            path: '/search',
            component: () => import('@/views/search.vue')
        }

    ]
})

import { Toast } from 'vant'
// 添加导航守卫

router.beforeEach((to, from, next) => {
    // console.log(to);
    let arr = ['personal', 'edit_profile']
    if (arr.indexOf(to.name) !== -1) {
        // 接收token
        let token = localStorage.getItem('hmtoutiao_token')

        if (token) {
            next()
        } else {
            Toast('未登录，请先登录')
            // 没有token跳转回登录页面
            next({ name: 'login' })
        }
    } else {
        next()
    }


    next()
})

// 暴露全局
export default router