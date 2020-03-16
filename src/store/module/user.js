import {
  login,
  logout,
  getUserInfo
} from '@/api/user';
import { Message } from 'view-design';
import Cookies from 'js-cookie';
import { setToken, getToken, TOKEN_KEY } from '@/libs/util';

export default {
  state: {
    userName: '',
    userId: '',
    token: getToken(),
    access: '',
    hasGetInfo: false
  },
  mutations: {
    setUserId (state, id) {
      state.userId = id;
    },
    setUserName (state, name) {
      state.userName = name;
    },
    setAccess (state, access) {
      state.access = access;
    },
    setToken (state, token) {
      state.token = token;
      setToken(token);
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status;
    }
  },
  getters: {},
  actions: {
    // 登录
    handleLogin ({ commit }, { userName, password }) {
      userName = userName.trim();
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          if (res) {
            const data = res.data;
            commit('setToken', data.token);
            resolve();
          }
        }).catch(err => {
          reject(err);
        });
      });
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('setToken', '');
          commit('setAccess', []);
          resolve();
        }).catch(err => {
          reject(err);
        });
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      });
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          if (state.token === undefined || state.token === '' || state.token === null) { // 判断是否有token
            Cookies.remove(TOKEN_KEY);
            window.location.href = '/#/login';
            Message.error('未登录，或登录失效，请登录');
          }
          getUserInfo(state.token).then(res => {
            const data = res.data;
            commit('setUserName', data.userName);
            commit('setUserId', data.userId);
            commit('setAccess', data.access);
            commit('setHasGetInfo', true);
            resolve(data);
          }).catch(err => {
            reject(err);
          });
        } catch (error) {
          reject(error);
        }
      });
    }
  }
};
