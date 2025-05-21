const apiKey = import.meta.env.VITE_APP_API_KEY

interface Options {
  url: string
  data: any
  method?: string
}

export const createStream = async (options: Options) => {
  const { url, data, method } = options
  const response = await fetch(url, {
    method,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return response
}