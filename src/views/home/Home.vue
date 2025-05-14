<script setup lang="ts">
import type { DrawerProps } from 'element-plus'

defineOptions({
  name: 'Home'
})

const drawer = ref(false)
const direction = ref<DrawerProps['direction']>('ltr')
</script>

<template>
  <el-button type="primary" style="margin-left: 16px" @click="drawer = true"> open </el-button>
  <el-drawer v-model="drawer" title="I am the title" :direction="direction" :modal="false">
    <span>Hi, there!</span>
  </el-drawer>
</template>
