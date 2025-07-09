import type { EmailCodeDTO, LoginDTO, LoginVO, RegisterDTO } from './types'
import request from '@/utils/request'

export const login = (data: LoginDTO) => request.post<LoginVO>('/auth/login', data)

// 邮箱验证码
export const emailCode = (data: EmailCodeDTO) => request.post('/resource/email/code', data)

// 注册账号
export const register = (data: RegisterDTO) => request.post('/auth/register', data)
