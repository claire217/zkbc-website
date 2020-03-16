// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ViewUI from 'view-design';
import i18n from '@/locale';
import '@babel/polyfill';
import config from '@/config';
import importDirective from '@/directive';
import { directive as clickOutside } from 'v-click-outside-x';
import installPlugin from '@/plugin';
// import style
import 'view-design/dist/styles/iview.css';
import './index.less';
import '@/assets/icons/iconfont.css';
import '@/assets/css/base.less';
import TreeTable from 'tree-table-vue';
import VOrgTree from 'v-org-tree';
import 'v-org-tree/dist/v-org-tree.css';
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
import 'vue-event-calendar/dist/style.css'; // 1.1.10之后的版本，css被放在了单独的文件中，方便替换
// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view';
import vueEventCalendar from 'vue-event-calendar';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import Header from '@/components/header-bar/header-bar.vue';
import Footer from '@/components/footer-part/footer-part.vue';
import 'swiper/dist/css/swiper.css';
// import Stage from '@/components/stage/stage.vue';
// 注册全局组建
Vue.component(Header.name, Header);
Vue.component(Footer.name, Footer);
Vue.use(VueAwesomeSwiper);
Vue.use(dataV);
Vue.use(vueEventCalendar, { locale: 'en' }); // 可以设置语言，支持中文和英文
// 实际打包时应该不引入mock
/* eslint-disable */
// if (process.env.NODE_ENV !== 'production') require('@/mock');

Vue.use(ViewUI, {
  i18n: (key, value) => i18n.t(key, value)
});
Vue.use(TreeTable);
Vue.use(VOrgTree);
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999,
    navbar: false // 底部缩略图
  }
});

/**
 * @description 注册admin内置插件
 */
installPlugin(Vue);
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false;
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config;
/**
 * 注册指令
 */
importDirective(Vue);
Vue.directive('clickOutside', clickOutside);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
});
