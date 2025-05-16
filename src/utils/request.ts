import axios from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  withCredentials: false,
  timeout: 30000
})

service.interceptors.request.use(
  config => {
    const apiKey = import.meta.env.VITE_APP_API_KEY
    config.headers['Authorization'] = `Bearer ${apiKey}`
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  res => {
    const { data, request, headers } = res
    const resContentType = ((headers['Content-Type']|| '') as string).toLowerCase().split(';')[0]
    console.log('res', res)
    if (['blob'].includes(request.responseType) || ['text/event-stream'].includes(resContentType)) return res

    const code = (data && data.code) || 200

    if (code === 200) return data

    return Promise.reject(data)
  }
)

export default service