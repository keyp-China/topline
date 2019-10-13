/**
 * 本地存储的存储模块
 */

export const getItem = (name) => {
  return JSON.parse(window.localStorage.getItem(name))
}

export const setItem = (name, data) => {
  window.localStorage.setItem(name, JSON.stringify(data))
}

export const removeItem = (name) => {
  window.localStorage.removeItem(name)
}
