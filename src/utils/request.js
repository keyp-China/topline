import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store'

const request = axios.create({
  // 设置默认axios请求地址
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0'
})

/**
 * 配置处理后端返回数据中超出 js 安全整数范围问题
 */
request.defaults.transformResponse = [function (data) {
  return data ? jsonBig.parse(data) : {} // 换了一个转化方法 使得 计算更精确 保证id不失真
}]

/**
 * 请求拦截器
 */
request.interceptors.request.use(function (config) {
  const user = store.state.user
  if (user) {
    // 统一注入token 到headers属性 因为所有接口要求的token格式是一样的
    config.headers['Authorization'] = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 对请求失败做处理
  return Promise.reject(error)
})

/**
* 响应拦截器
*/
axios.interceptors.response.use(function (response) {
  // 对响应数据做处理
  return response.data
})

export default request
