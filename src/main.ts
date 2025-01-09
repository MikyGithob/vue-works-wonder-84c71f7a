import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './index.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./components/presentation/PresentationMode.vue')
    },
    {
      path: '/packages',
      component: () => import('./components/presentation/PackageSelection.vue')
    }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')