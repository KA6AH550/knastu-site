import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/Home.vue';
import ModeratorPage from '@/components/ModeratorPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { title: 'КнАГУ - Онбординг преподавателя' }, // Заголовок для главной страницы
  },
  {
    path: '/moderator',
    name: 'ModeratorPage',
    component: ModeratorPage,
    meta: { title: 'КнАГУ - Панель модератора' }, // Заголовок для панели модератора
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Динамическое обновление заголовка страницы
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'КнАГУ'; // Устанавливаем заголовок или дефолтный
  next();
});

export default router;