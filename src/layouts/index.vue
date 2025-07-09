<script setup lang="ts">
import { useKeepAliveStore } from '@/stores/modules/keep-alive'
import Header from './components/header/index.vue'
import Aside from './components/Aside.vue'

const keepAliveStore = useKeepAliveStore()

const transitionName = computed(() => {
  return 'slide'
})
</script>
<template>
  <el-container class="layout-container">
    <el-header class="layout-header">
      <Header />
    </el-header>
    <el-container class="layout-container-main">
      <Aside />
      <el-main class="layout-main">
        <router-view v-slot="{ Component, route }">
          <transition :name="transitionName" mode="out-in" appear>
            <keep-alive :max="10" :include="keepAliveStore.keepAliveName">
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
