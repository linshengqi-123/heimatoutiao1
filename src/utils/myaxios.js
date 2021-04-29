// 引入
import axios from 'axios'
// 添加配置
axios.defaults.baseURL = 'http://157.122.54.189:9083'

import { Toast } from 'vant'
// 添加拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 做点什么 ？设置token的请求头的传递
  // Authorization: localStorage.getItem('hmtoutiao_token')
  // console.log(config);
  let token = localStorage.getItem("hmtoutiao_token")
  if (token) {
    config.headers.Authorization = token
  }
  return config

}, function (error) {
  // 对请求错误做些什么
  console.log(error);

  return Promise.reject(error);
  // console.log(error);

});


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  console.log('拦截器', response);
  if (response.data.message == '用户信息验证失败!' || response.data.message == '用户信息验证失败') {
    Toast.fail('用户信息验证失败!')
    // this.$router.push({ name: 'login' })

    // window.location.href = '#/login'
    //跳转回当前页面
    //    页面回跳我们需要做什么事情？
    // 1.在响应拦截器中获取当前页面地址，并做为参数传递给登陆页面
    // 2.在登陆页面中，当登陆成功之后，要根据传递的参数进行回跳
    window.location.href = '#/login?redirect_url=' + window.location.href


  }
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});







// 暴露
export default axios
