<script setup lang="ts">
import type { DrawerProps } from 'element-plus'
import { getChatMessage } from '@/api/chat'

defineOptions({
  name: 'Home'
})

interface MessageItem {
  role: string
  content: string
}

const drawer = ref(false)
const direction = ref<DrawerProps['direction']>('ltr')
const keyword = ref('')
const messageList = ref<MessageItem[]>([])
const isStreaming = ref(false)

// let cancelStream = null

const handleSend = async () => {
  messageList.value.push({ role: 'user', content: keyword.value })
  messageList.value.push({ role: 'assistant', content: '' })
  isStreaming.value = true

  const params = {
    model: 'GLM-4-Flash',
    stream: true,
    messages: [{ role: 'user', content: keyword.value }]
  }
  const res = await getChatMessage(params)
  console.log('res', res)
  res.data.on('data', (chunk: any) => {
    console.log('res chunk', chunk)
  })
}
</script>

<template>
  <div class="home-header">
    <el-button type="primary" style="margin-left: 16px" @click="drawer = true"> open </el-button>
  </div>
  <div class="chat-wrapper">
    <div class="answer-wrapper">
      <div v-for="message in messageList" :key="message.content">{{ message.content }}</div>
    </div>
    <div class="input-wrapper">
      <div>
        <el-input v-model="keyword" style="width: 240px" :rows="2" type="textarea" placeholder="Please input" />
      </div>
      <el-button type="primary" @click="handleSend">发送</el-button>
    </div>
  </div>

  <el-drawer v-model="drawer" title="I am the title" :direction="direction" :modal="false">
    <div>chat history</div>
  </el-drawer>
</template>
