import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('../src/components/Home.vue');
const Content = () => import('../src/components/Content.vue');
const Empty = () => import('../src/components/Empty.vue')

const routes = [
  {
    path: '/',
    component: Home,
    redirect: '/app',
    children: [
      { path: '/app', component: Content },
      { path: '/vue/', component: Empty}
    ]
  },
  {
    path: '/*',
    component: Home
  },
];


const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router;