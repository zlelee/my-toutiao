import request from '@/utils/request'
export const getArticleList = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
