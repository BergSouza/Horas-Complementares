import { createMemoryHistory, createRouter } from 'vue-router'

import IndexView from '@/views/Index.vue';

const routes = [
  { path: '/', name:'index', component: IndexView },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})