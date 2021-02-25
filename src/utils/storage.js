// 存
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 取
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch {
    return data
  }
}
// 删
export const removeItem = key => {
  return window.localStorage.removeItem(key)
}
