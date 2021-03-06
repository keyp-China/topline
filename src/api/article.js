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

/**
 * 获取文章详情
 */
export function getArticle (articleId) {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}

/**
 * 点赞
 */
export function addLike (articleId) {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}

/**
 * 取消点赞
 */
export function deleteLike (articleId) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${articleId}`
  })
}

/**
 * 对文章不喜欢
 */
export function addDislike (articleId) {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/dislikes',
    data: {
      target: articleId
    }
  })
}

/**
  * 取消对文章不喜欢
  */
export function deleteDislike (articleId) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/dislikes/${articleId}`
  })
}
