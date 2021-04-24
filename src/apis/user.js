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











