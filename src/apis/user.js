// 引入axios
// import axios from 'axios'

// 引入封装好的axios
import myaxios from '@/utils/myaxios.js'




// 用户登录
export const userlogin = function (data) {
    return myaxios({
        url: '/login',
        method: 'post',
        data
    })
}


// 用户注册
export const userRegistration = function (data) {
    return myaxios({
        url: '/register',
        method: 'post',
        data
    })
}

export const getUserDetail = function (id) {
    return myaxios({
        url: `/user/${id}`,
        // headers: { Authorization: localStorage.getItem('hmtoutiao_token') }
    })
}

// 更新用户数据
// / user_update /: id
export const updateUserInfo = function (id, data) {
    return myaxios({
        method: 'post',
        url: `/user_update/${id}`,
        data
    })
}
// 关注/user_follows/:id
export const userfollows = (id) => {
    return myaxios({
        url: `/user_follows/${id}`,
    })
}
// 取消用户关注/user_unfollow/:id
export const userunfollow = function (id) {
    return myaxios({
        url: `/user_unfollow/${id}`,
    })
}
// 7.获取用户关注列表数据
export const getUserFollows = () => {
    return myaxios({
        url: `/user_follows`
    })
}
// 8.获取用户收藏列表数据
export const getUserStars = () => {
    return myaxios({
        url: `/user_star`
    })
}










