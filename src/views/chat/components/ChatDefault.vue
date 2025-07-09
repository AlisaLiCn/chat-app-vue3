<script setup lang="ts">
import { Sender, Typewriter } from 'vue-element-plus-x'
import { useUserStore } from '@/stores/modules/user'

const router = useRouter()
const userStore = useUserStore()

const senderValue = ref('')
const senderRef = ref()

const welcomeMessage = computed(() => {
  return '你好，我是Chat AI ~'
})

async function handleSend() {
  if (!userStore.token) {
    router.replace({
      name: 'ChatWithId',
      params: {
        id: 'not_login'
      }
    })
    return
  }
}
</script>

<template>
  <div class="chat-default-wrap">
    <div>
      <Typewriter
        :content="welcomeMessage"
        :typing="{
          step: 2,
          interval: 45
        }"
        :is-fog="{
          bgColor: '#fff'
        }"
      ></Typewriter>
    </div>
    <Sender
      ref="senderRef"
      v-model="senderValue"
      class="chat-default-sender"
      :auto-size="{
        maxRows: 9,
        minRows: 3
      }"
      variant="updown"
      clearable
      @submit="handleSend"
    >
    </Sender>
  </div>
</template>

<style scoped lang="less">
.chat-default-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  min-height: 450px;
  .chat-default-sender {
    width: 100%;
  }
}
</style>
