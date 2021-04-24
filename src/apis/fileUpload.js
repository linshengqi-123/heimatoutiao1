// 引入封装好的axios
import myaxios from '@/utils/myaxios.js'

// 文件上传
export const fileupload = function (data) {
    return myaxios({
        url: '/upload',
        method: 'post',
        data
    })
}