import axios from 'axios'
import jsonBig from 'json-bigint'

const request = axios.create({
  // 设置默认axios请求地址
  baseURL: 'http://ttapi.research.itcast.cn'
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

/**
* 响应拦截器
*/

export default request
