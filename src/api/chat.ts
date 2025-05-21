// import request from '@/utils/request'
import { createStream } from '@/utils/fetch'

export const getChatMessage = (data: any) => {
  return createStream({
    url: '/api/paas/v4/chat/completions',
    data,
    method: 'POST',
  })
}