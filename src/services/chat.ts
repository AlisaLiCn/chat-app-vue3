const apiKey = import.meta.env.VITE_APP_API_KEY

export async function streamChat(prompt: string, onMessage: (data: { done: boolean; content: string }) => void) {
  const response = await fetch('/api/paas/v4/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}` // 环境变量存储API密钥
    },
    body: JSON.stringify({
      model: 'GLM-4-Flash',
      messages: [{ role: 'user', content: prompt }],
      stream: true // 启用流式响应
    })
  })

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`)
  }

  const reader = response.body?.getReader()
  const decoder = new TextDecoder('utf-8')
  let buffer = ''

  while (reader) {
    const { done, value } = await reader.read()
    if (done) break

    // 解码并累积数据块
    const currentBuffer = decoder.decode(value, { stream: true })
    buffer += currentBuffer

    // 按行分割处理（SSE格式）
    // const lines = buffer.split('\n').filter(line => line.trim() !== '')
    const lines = buffer.split('\n')
    buffer = lines.pop() || '' // 保留不完整的行

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.substring(6).trim()
        if (data === '[DONE]') {
          onMessage({ done: true, content: '' })
          return // 流结束标记
        }

        try {
          const parsed = JSON.parse(data)
          const content = parsed.choices[0]?.delta?.content || ''
          onMessage({ done: false, content }) // 触发UI更新
        } catch (error) {
          console.error('流式数据解析错误:', error, line)
        }
      }
    }
  }
}
