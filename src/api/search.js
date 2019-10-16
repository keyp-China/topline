/**
 * 搜索api模块
 */

import request from '@/utils/request'

/**
 * 获取联想建议（自动补全）
 */
export function searchSuggestion (params) {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'get',
    params
  })
}

/**
 * 获取搜索结果
 */
export function getSearch (params) {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
