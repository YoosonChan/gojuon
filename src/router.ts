import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('./views/Home.vue') },
  { path: '/doc', component: () => import('./views/Document.vue') },
  { path: '/setting', component: () => import('./views/Setting.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router