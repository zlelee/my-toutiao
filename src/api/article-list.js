import request from '@/utils/request'
export const getArticleList = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
