import { createApp } from 'vue';
import App from './App.vue';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
//暗黑模式需要的样式
import 'element-plus/theme-chalk/dark/css-vars.css';
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
//svg图标配置代码
import 'virtual:svg-icons-register';
// 全局组件
import GloabComponent from '@/components';

import '@/styles/index.scss';
import router from './router';
// 引入仓库
import pinia from './store';
// element图标全局引入
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App);

//引入自定义指令文件
import { isHasButton } from '@/directive/has';
isHasButton(app);

// element图标全局引入
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router).use(pinia);

// 使用全局组件
app.use(GloabComponent);
app.use(ElementPlus, {
  locale: zhCn,
});

//引入路由鉴权文件
import './permisstion';
app.mount('#app');
