/**
 * 文章api模块
 */
import request from '@/utils/request'

/**
 * 获取文章列表
 */
export function getArticles ({ channelId, timestamp, withTop }) {
  return request({
    url: '/app/v1_1/articles',
    method: 'get',
    params: {
      channel_id: channelId, // 频道id
      timestamp, // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
      with_top: withTop // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
    }
  })
}
