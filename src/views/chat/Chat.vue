<script setup lang="ts">
import ChatDefault from './components/ChatDefault.vue'
import ChatWithId from './components/ChatWithId.vue'

const route = useRoute()

const sessionId = computed(() => route.query?.id)
</script>

<template>
  <div class="chat-container">
    <ChatDefault v-if="!sessionId"></ChatDefault>
    <ChatWithId v-else></ChatWithId>
  </div>
</template>

<style lang="less" scoped>
.chat-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100% - 32px);
  height: 100%;
  padding: 0 16px;
  // overflow-anchor: none;
}
</style>
