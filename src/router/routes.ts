import type { RouteRecordRaw } from 'vue-router'

const Home = () => import('@/views/home/Home.vue')
const Chat = () => import('@/views/chat/Chat.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'Home' }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  }
]

export default routes
