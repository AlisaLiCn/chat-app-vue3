<script setup lang="ts">
import type { DrawerProps } from 'element-plus'
import { streamChat } from '@/services/chat'

defineOptions({
  name: 'Home'
})

interface MessageItem {
  role: 'user' | 'assistant'
  content: string
}

const drawer = ref(false)
const direction = ref<DrawerProps['direction']>('ltr')
const userInput = ref('')
const messages = ref<MessageItem[]>([])
const currentAnswer = ref('')
const isLoading = ref(false)

let abortController: AbortController | null = null

const msgList = computed(() => {
  if (!currentAnswer.value) return messages.value
  const currentMsg = { role: 'assistant', content: currentAnswer.value }
  return [...messages.value, currentMsg]
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
          messages.value.push({ role: 'assistant', content: currentAnswer.value })
          currentAnswer.value = ''
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

// 组件卸载时取消未完成的请求
onUnmounted(() => {
  abortController?.abort()
})
</script>

<template>
  <div class="home-header">
    <!-- <el-button type="primary" style="margin-left: 16px" @click="drawer = true"> open </el-button> -->
  </div>
  <div class="chat-wrapper">
    <div class="answer-wrapper">
      <div v-for="message in msgList" :key="message.content">
        <!-- <div>{{ message.role }}</div> -->
        <div>{{ message.content }}</div>
      </div>
    </div>
    <div class="input-wrapper">
      <div>
        <el-input v-model="userInput" style="width: 240px" :rows="2" type="textarea" placeholder="Please input" />
      </div>
      <el-button type="primary" @click="sendMessage">发送</el-button>
    </div>
  </div>

  <el-drawer v-model="drawer" title="I am the title" :direction="direction" :modal="false">
    <div>chat history</div>
  </el-drawer>
</template>
