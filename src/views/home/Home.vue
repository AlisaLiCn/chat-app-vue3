<script setup lang="ts">
import { BubbleList, Sender } from 'vue-element-plus-x'
import { streamChat } from '@/services/chat'

defineOptions({
  name: 'Home'
})

interface MessageItem {
  role: 'user' | 'assistant'
  content: string
  isMarkdown?: boolean
}

const userInput = ref('')
const messages = ref<MessageItem[]>([])
const currentAnswer = ref('')
const isLoading = ref(false)

let abortController: AbortController | null = null

const msgList = computed(() => {
  if (!currentAnswer.value) return messages.value
  const currentMsg = { role: 'assistant', content: currentAnswer.value, isMarkdown: true }
  return [...messages.value, currentMsg]
})

// 组件卸载时取消未完成的请求
onUnmounted(() => {
  abortController?.abort()
})

// 发送消息
const sendMessage = async () => {
  const inputText = userInput.value.trim()
  if (!inputText) return

  messages.value.push({ role: 'user', content: inputText })
  userInput.value = ''
  isLoading.value = true

  try {
    // 处理流式响应
    await new Promise((resolve, reject) => {
      abortController = new AbortController()
      streamChat(inputText, data => {
        console.log('res content:', data)
        if (data.done) {
          messages.value.push({ role: 'assistant', content: currentAnswer.value, isMarkdown: true })
          currentAnswer.value = ''
          isLoading.value = false
        } else {
          currentAnswer.value += data.content
        }
      })
    })
  } catch (error) {
    currentAnswer.value = '抱歉，生成回答时出现错误'
    console.error('聊天错误:', error)
  } finally {
    isLoading.value = false
    abortController = null
  }
}

const handleCancel = () => {}
</script>

<template>
  <div class="home-header"></div>
  <div class="chat-wrapper">
    <BubbleList :list="msgList" max-height="350px" />
    <Sender
      ref="senderRef"
      v-model="userInput"
      :loading="isLoading"
      clearable
      @submit="sendMessage"
      @cancel="handleCancel"
    />
  </div>
</template>
