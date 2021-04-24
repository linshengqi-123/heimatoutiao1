import myaxios from '@/utils/myaxios.js'
//params 是即将与请求一起发送的 URL 参数
export const gtePostList = (params) => {
    return myaxios({
        url: `/post`,
        params
    })
}