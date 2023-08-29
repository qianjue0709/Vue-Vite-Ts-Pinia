// 引入全部全部全局组件
import SvgIcon from '@/components/SvgIcon/index.vue';
import Pagination from '@/components/Pagination/index.vue';
import Category from './Category/index.vue';
// 全局对象
const allGlobalComponent = { SvgIcon, Pagination, Category };
// 对外暴露插件
export default {
  install(app: any) {
    // 注册全局组件
    Object.keys(allGlobalComponent).forEach(key => {
      app.component(key, allGlobalComponent[key]);
    });
  },
};
