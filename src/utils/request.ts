import axios from 'axios'

const service = axios.create({
  baseURL: '/',
  withCredentials: false,
  timeout: 30000
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  res => {
    const { data, request } = res
    if (request.responseType === 'blob') return res

    const code = (data && data.code) || 200

    if (code === 200) return data

    return Promise.reject(data)
  }
)

export default service