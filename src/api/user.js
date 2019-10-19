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

/**
 * 关注用户
 */
export function followUser (userId) {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId // 用户id
    }
  })
}

/**
 * 取消关注用户
 */
export function unFollowUser (userId) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}

/**
 * 获取用户自己信息
 */
export function getSelf () {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}

/**
 * 获取用户个人资料
 */
export function getProfile () {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}
