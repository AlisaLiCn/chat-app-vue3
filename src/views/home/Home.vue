<script setup lang="ts">
import type { DrawerProps } from 'element-plus'

defineOptions({
  name: 'Home'
})

const drawer = ref(false)
const direction = ref<DrawerProps['direction']>('ltr')
const keyword = ref('')

const handleSend = () => {
  // TODO
}
</script>

<template>
  <div class="home-header">
    <el-button type="primary" style="margin-left: 16px" @click="drawer = true"> open </el-button>
  </div>
  <div class="chat-wrapper">
    <div class="answer-wrapper"></div>
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
