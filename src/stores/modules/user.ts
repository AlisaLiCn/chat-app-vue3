import { defineStore } from 'pinia'
import type { LoginUser } from '@/api/auth/types'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string>('')
    const setToken = (value: string) => {
      token.value = value
    }
    const clearToken = () => {
      token.value = ''
    }

    const userInfo = ref<LoginUser>()

    return {
      token,
      setToken,
      clearToken,
      userInfo
    }
  },
  {
    persist: true
  }
)
