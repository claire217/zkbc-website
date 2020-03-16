import axios from '@/libs/api.request';

// 登录
export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  };
  return axios.request({
    url: '/report/login',
    params: data,
    method: 'get'
  });
};

// 获取用户信息（权限）
export const getUserInfo = (token) => {
  return axios.request({
    url: '/report/userRoles',
    params: {
      token
    },
    method: 'get'
  });
};

export const editUserPwd = (form) => {
  return axios.request({
    url: '/report/user/update-login-password',
    params: form,
    method: 'get'
  });
};

export const logout = () => {
  return axios.request({
    url: '/report/loginout',
    method: 'get'
  });
};
