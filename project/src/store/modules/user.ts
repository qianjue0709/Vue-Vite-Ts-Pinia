// 创建用户小仓库
// 请求api
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user';
import { defineStore } from 'pinia';
import { constRoute, asnycRoute, anyRoute } from '@/router/routes';
import type {
  loginFormData,
  loginResponseData,
  userInfoReponseData,
} from '@/api/user/type';
import router from '@/router';
//引入深拷贝方法
//@ts-ignore
import cloneDeep from 'lodash/cloneDeep';
//用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asnycRoute: any, routes: any) {
  return asnycRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes);
      }
      return true;
    }
  });
}

let useUserStore = defineStore('User', {
  // 数据
  state: () => {
    return {
      token: localStorage.getItem('TOKEN'),
      menuRoutes: constRoute,
      name: '',
      avatar: '',
      buttons: [],
    };
  },
  // 异步|逻辑
  actions: {
    // 用户登录的方法
    async userLogin(data: loginFormData) {
      let result: loginResponseData = await reqLogin(data);

      // 成功200，得到token
      if (result.code == 200) {
        this.token = result.data;
        // 本地持久化存储一份
        localStorage.setItem('TOKEN', result.data);
        // 保证当前返回一个成功的promise
        return 'ok';
      }
      // 登录失败201->失败信息
      else {
        return Promise.reject(result.data);
      }
    },
    // 获取用户信息
    async userInfo() {
      let result: userInfoReponseData = await reqUserInfo();

      if (result.code == 200) {
        this.name = result.data.name;
        this.avatar = result.data.avatar;
        this.buttons = result.data.buttons;
        //计算当前用户需要展示的异步路由
        const userAsyncRoute = filterAsyncRoute(
          cloneDeep(asnycRoute),
          result.data.routes
        );
        //菜单需要的数据整理完毕
        this.menuRoutes = [...constRoute, ...userAsyncRoute, anyRoute];
        //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
        [...userAsyncRoute, anyRoute].forEach((route: any) => {
          router.addRoute(route);
        });

        return 'ok';
      }
      // 登录失败201->失败信息
      else {
        return Promise.reject(result.message);
      }
    },
    //退出登录
    async userLogout() {
      //退出登录请求
      const result: any = await reqLogout();

      if (result.code == 200) {
        //目前没有mock接口:退出登录接口(通知服务器本地用户唯一标识失效)
        this.token = '';
        this.name = '';
        this.avatar = '';
        localStorage.removeItem('TOKEN');
        return 'ok';
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
  },
  // 计算属性
  getters: {},
});

// 对外暴露
export default useUserStore;
