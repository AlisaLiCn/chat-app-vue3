<script setup lang="ts">
import type { ConversationItem } from 'vue-element-plus-x/types/Conversations'
import { Conversations, BubbleList, Sender } from 'vue-element-plus-x'
import { streamChat } from '@/services/chat'

defineOptions({
  name: 'Home'
})

interface MessageItem {
  role: 'user' | 'assistant'
  content: string
  placement?: 'start' | 'end'
  isMarkdown?: boolean
}

const userInput = ref('')
const messages = ref<MessageItem[]>([])
const currentAnswer = ref('')
const isLoading = ref(false)
const activeConversation = ref()
const timeBasedItems = ref<ConversationItem<{ id: number; label: string }>[]>([
  {
    id: 1,
    label: '今天的会话111',
    group: 'today'
  },
  {
    id: 2,
    group: 'today',
    label: '今天的会话2'
  },
  {
    id: 3,
    group: 'yesterday',
    label: '昨天的会话1'
  }
])

let abortController: AbortController | null = null

const bubbleMaxHeight = computed(() => {
  return `calc(100vh - 56px - 86px)`
})

const msgList = computed(() => {
  if (!currentAnswer.value) return messages.value
  const currentMsg = { role: 'assistant', content: currentAnswer.value, isMarkdown: true }
  return [...messages.value, currentMsg]
})

watch(activeConversation.value, newVal => {
  console.log('new conversaion', newVal)
})

// 组件卸载时取消未完成的请求
onUnmounted(() => {
  abortController?.abort()
})

// 发送消息
const sendMessage = async () => {
  const inputText = userInput.value.trim()
  if (!inputText) return

  messages.value.push({ role: 'user', content: inputText, placement: 'end' })
  userInput.value = ''
  isLoading.value = true

  try {
    // 处理流式响应
    await new Promise((resolve, reject) => {
      abortController = new AbortController()
      streamChat(inputText, data => {
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

function handleConversationChange(item: ConversationItem<{ id: string; label: string }>) {
  console.log('conversation changed', item)
}
</script>

<template>
  <div class="flex flex-1">
    <div class="flex flex-col gap-[12px] h-full">
      <Conversations
        v-model:active="activeConversation"
        :items="timeBasedItems"
        :label-max-width="200"
        :show-tooltip="true"
        row-key="id"
        @change="handleConversationChange"
      />
    </div>
    <div class="w-full h-screen flex flex-col flex-1">
      <div class="w-full h-full flex flex-col justify-center items-center">
        <div class="h-[56px]"></div>
        <div class="chat-content flex-1 flex-grow h-full">
          <BubbleList :list="msgList" :max-height="bubbleMaxHeight" :btnLoading="isLoading" />
        </div>
        <div class="chat-content pb-[30px]">
          <Sender
            ref="senderRef"
            v-model="userInput"
            :loading="isLoading"
            clearable
            @submit="sendMessage"
            @cancel="handleCancel"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.chat-content {
  --padding-side: calc(50% - 401px);

  width: 100%;
  padding: 0 var(--padding-side);
}
</style>
