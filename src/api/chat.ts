import request from '@/utils/request'

export const getChatMessage = (data: any) => {
  return request({
    url: '/paas/v4/chat/completions',
    data,
    method: 'POST',
    responseType: 'stream'
  })
}