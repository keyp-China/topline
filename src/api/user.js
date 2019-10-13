import request from '@/utils/request'
import api from '@/constant/api'

/**
 * 登录
 */
export function login (data) {
  return request({
    url: api.API_LOGIN,
    method: 'post',
    data })
}
