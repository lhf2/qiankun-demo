const Home = () => import('../src/components/Home.vue');
const Content = () => import('../src/components/content.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/content',
        name: 'Content',
        component: Content
      }
    ]
  }
];


export default routes;