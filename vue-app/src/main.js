import {createApp} from 'vue';
import App from './App.vue';
import './public-path';
import {createRouter, createWebHistory} from 'vue-router';
import routes from '../router/index'
import ElementPlus from 'element-plus'
import action from './action'

let instance = null;
let router = null;
let history = null;


function render(props = {}) {
  const {container} = props;
  history = createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/vue' : '/subApp/vue-app/');
  router = createRouter({
    history,
    routes
  });
  instance = createApp(App);
  instance.use(router);
  instance.use(ElementPlus);
  instance.mount(container ? container.querySelector('#app1') : '#app1');
}

// 独立运行时
let isQiankun = window.__POWERED_BY_QIANKUN__
export default isQiankun

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}

export async function mount(props) {
  window.commonComponents = props.data.commonComponents;
  window.rootRouter = props.router;
  action.setActions(props.actions)
  console.log('mounted', props.router);
  render(props);
}

export async function unmount() {
  instance.unmount();
  instance._container.innerHTML = '';
  instance = null;
  router = null;
  history.destroy();
}

