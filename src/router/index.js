import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/Home.vue';
import ModeratorPage from '@/components/ModeratorPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/moderator',
    name: 'ModeratorPage',
    component: ModeratorPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;