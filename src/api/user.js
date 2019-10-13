/**
 * 用户api模块
 */
import request from '@/utils/request'

/**
 * 登录
 */
export function login (data) {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'post',
    data
  })
}
