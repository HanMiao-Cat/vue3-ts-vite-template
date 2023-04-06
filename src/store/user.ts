import { defineStore } from 'pinia';
import md5 from 'js-md5';
import storage from 'store';
import { Message } from '@arco-design/web-vue';
import { usePermissionRouter } from './permissionRouter';
import router from '../router';

export type Imeus = {
  component: string;
  name: string;
  path: string;
  key: string;
  icon?: any;
  redirect?: string;
  children?: Imeus[];
};

export const useUserStore = defineStore('userStore', {
  state: () => ({
    name: '',
    menus: [] as Imeus[],
    loadRouter: false,
    menusItem: {} as Imeus,
  }),
  actions: {
    // 登录
    async _GetLogin(params: Params.Login) {
      return new Promise((reslove, reject) => {
        if (params.name === 'admin' && params.passWord === '123456') {
          let token = '1231323132';
          token = md5(token);
          storage.set('token', token);
          this.name = params.name;
          reslove('yes');
        } else {
          Message.error(`账号或密码错误`);
          reject();
        }
      });
    },

    // 获取用户信息
    _getUserInfo() {
      this.name = 'admin';
    },

    // 获取路由信息
    _GetMenus() {
      return new Promise((reslove) => {
        const menus: Array<Imeus> = [
          {
            path: '/system',
            name: 'Systems',
            component: 'Layouts',
            redirect: '/home',
            icon: 'IconApps',
            key: '1',
            children: [
              {
                path: '/home',
                name: 'Home',
                key: '1-1',
                component: 'home/Home.vue',
              },
              {
                path: '/router',
                name: 'Router',
                key: '1-2',
                component: 'router/Router.vue',
              },
            ],
          },
          {
            path: '/order',
            name: 'Order',
            component: 'Layouts',
            icon: 'IconRobot',
            redirect: '/goods',
            key: '2',
            children: [
              {
                path: '/goods',
                name: 'Goods',
                key: '2-1',
                component: 'goods/Goods.vue',
              },
            ],
          },
        ];
        this.menus = menus;
        const permissionRouter = usePermissionRouter();
        const results = permissionRouter._GenerateRoutes<Imeus>(menus);
        results.forEach((item: any) => {
          router.addRoute('Layouts', item);
        });

        // 添加错误路由
        router.addRoute({
          path: '/:pathMatch(.*)*',
          name: 'NotFound',
          component: () => import('../view/notFound/NotFound.vue'),
        });

        this.loadRouter = true;
        reslove(menus);
      });
    },

    // 退出
    _GetLogout() {
      storage.remove('token');
      this.name = '';
    },
  },
});
