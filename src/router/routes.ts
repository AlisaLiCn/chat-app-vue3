import type { RouteRecordRaw } from 'vue-router'

const Home = () => import('@/views/home/Home.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'Home' },
  },
  {
    path: '/home',
    name: 'Home',
    component: Home 
  },
]

export default routes