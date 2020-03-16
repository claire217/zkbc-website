import axios from 'axios';
import i18n from './i18n';
import { Message } from 'view-design';
import store from '../store';
import Cookies from 'js-cookie';
import { TOKEN_KEY } from '@/libs/util';
import router from '../router/index';
// import { Spin } from 'view-design';
class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = '';
    this.queue = {};
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Accept': 'application/json',
        // 'Content-Type':'application/x-www-form-urlencoded',
        'Accept-Language': i18n.locale
      }
    };
    return config;
  }
  destroy (url) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!config.url.includes('/login')) { // 判断是否是登录请求，如果存在的话，则每个http header都加上token
        config.headers.Authorization = `Bearer ${store.state.user.token}`; // 这个在请求头统一加token
      }
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true;
      return config;
    }, error => {
      return Promise.reject(error);
    });
    // 响应拦截
    instance.interceptors.response.use(res => {
      if (url.indexOf('/login') !== -1) { // 判断是否为登录请求
        if (res.data === '') { // 判断请求返回的数据 返回空则表示登录失败，可自定义
          Cookies.remove(TOKEN_KEY);
          Message.error('用户名或密码输入错误！'); // 弹出消息提示
          return;
        }
      }
      console.log('====== 返回信息 ======');
      console.log('url：' + url);
      console.log('返回数据：');
      console.log(res.data);
      let codes = res.data.code;
      codes = Number.parseInt(codes, 10);
      if (codes === 200) {
        const dataMess = {};
        dataMess.data = res.data.data;
        dataMess.status = res.status;
        return dataMess;
      } else if (codes === -101) {
        router.push({ path: '/login' });
        Message.error(res.data.data.message);
      } else {
        if (res.data.data.message) {
          Message.error(res.data.data.message);
        }
      }
      this.destroy(url);
    }, error => {
      console.log('====== 请求出错 ======');
      console.log('url：' + url);
      console.log('错误信息：' + error);
      let e = { header: { code: '', message: '' } };
      this.destroy(url);
      if (error.response) {
        e.header.code = error.response.status;
        e.header.message = error.response.statusText;
        switch (e.header.code) { // 异常情况
          case 400:
            e.header.message = i18n.t('responseError.code400');
            break;
          case 401:
            e.header.message = i18n.t('responseError.code401');
            break;
          case 404:
            e.header.message = i18n.t('responseError.code404');
            break;
          case 405:
            e.header.message = i18n.t('responseError.code405');
            break;
          case 500:
            e.header.message = i18n.t('responseError.code500');
            break;
          case 501:
            console.log('接口[' + url + ']还未实现');
            e = error.response.data;
            break;
          case 503:
            e.header.message = i18n.t('responseError.code503');
            break;
        }
      } else {
        e.header.code = 600;
        e.header.message = (error.message === 'Network Error') ? i18n.t('responseError.netError') : i18n.t('responseError.code600');
      }
      Message.error(e.header.message);
      return Promise.reject(error);
    });
  }
  request (options) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
}
export default HttpRequest;
