import { createApp } from 'vue'

import '@/assets/styles/index.css'
import '@/assets/styles/tailwind.css'

import App from './App.vue'
import router from './router'
import store from './stores'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
