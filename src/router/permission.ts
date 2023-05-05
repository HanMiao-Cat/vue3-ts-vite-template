import type { Router } from 'vue-router';
import storage from 'store';
import NProgress from '../extends/index';
import { useUserStore } from '../store/user';
const defaultPath = '/home';

const permission = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const token = storage.get('token');
    if (token) {
      if (to.path === '/login') {
        next({ path: defaultPath });
      } else {
        const userStore = useUserStore();
        if (userStore.loadRouter) {
          next();
        } else {
          await userStore._getUserInfo();
          await userStore._GetMenus();
          next({ ...to, replace: true });
        }
      }
    } else {
      if (to.path === '/login') {
        next();
      } else {
        next({ path: '/login' });
      }
      NProgress.done();
    }
  });

  router.afterEach(() => {
    NProgress.done();
  });
};

export default permission;
