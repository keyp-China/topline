/**
 * 频道api模块
 */
import request from '@/utils/request'

/**
 * 获取用户默认推荐的频道列表
 */
export function getChannels () {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'get'
  })
}
