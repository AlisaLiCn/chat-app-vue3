import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/index.vue')
const Home = () => import('@/views/home/Home.vue')
const Chat = () => import('@/views/chat/Chat.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'Chat' },
    component: Layout,
    children: [
      {
        path: '/chat',
        name: 'Chat',
        component: Chat
      },
      {
        path: '/chat/:id',
        name: 'ChatWithId',
        component: Chat
      }
    ]
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
]

export default routes
