import myaxios from '@/utils/myaxios.js'
//params 是即将与请求一起发送的 URL 参数 获取栏目的数据
export const gtePostList = (params) => {
    return myaxios({
        url: `/post`,
        params
    })
}

// 获取指定id的文章详情
export const gtePostDetail = (id) => {
    return myaxios({
        url: `/post/${id}`,

    })
}
// 点赞接口
export const likePost = (id) => {
    return myaxios({
        url: '/post_like/' + id
    })
}
// 收藏接口
export const starpost = (id) => {
    return myaxios({
        url: '/post_star/' + id
    })
}
// 评论列表
export const getPostComment = (id) => {
    return myaxios({
        url: '/post_comment/' + id
    })
}
// 发表文章评论api
export const publishComment = (id, data) => {
    return myaxios({
        method: 'post',
        url: '/post_comment/' + id,
        data
    })
}
// 7.文章搜索
export const searchPost = (keyword) => {
    return myaxios({
        url: `/post_search?keyword=` + keyword
    })
}