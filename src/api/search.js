/**
 * 搜索api模块
 */

import request from '@/utils/request'

export function searchSuggestion (params) {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'get',
    params
  })
}
