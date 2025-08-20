import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('./views/Home.vue') },
  { path: '/doc', component: () => import('./views/Document.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router