import { createRouter, createWebHistory } from 'vue-router';
import { constRoute } from './routes';
// 创建路由
let router = createRouter({
  history: createWebHistory(),
  routes: constRoute,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});

export default router;
