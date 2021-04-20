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







