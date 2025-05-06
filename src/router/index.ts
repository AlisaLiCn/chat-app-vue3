import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'

import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes
})


export default router