import request from '@/utils/request'
import type { CreateSessionDTO } from '@/api/session/types'

export function createSession(data: CreateSessionDTO) {
  return request({
    url: '/system/session',
    data
  })
}
