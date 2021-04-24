// 获取封装好的地址
import myaxios from '@/utils/myaxios.js'

export const getcategory = function (data) {
    return myaxios({
        url: '/category',
    })
}




