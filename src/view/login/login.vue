<template>
  <div class="login">
    <p class="title">财360运营管理系统</p>
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit" :userName="loginFormData.userName" :password="loginFormData.password" :remember="loginFormData.remember"></login-form>
          <p class="login-tip">账号密码请仔细保管，切勿轻易移交他人</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form';
import { mapActions, mapMutations } from 'vuex';
import { setCookie, getCookie } from '@/libs/util';
import { setStore } from '@/libs/storage';
const Base64 = require('js-base64').Base64; // 引入base64
export default {
  components: {
    LoginForm
  },
  data () {
    return {
      loginFormData: {}
    };
  },
  created () {
    // 在页面加载时从cookie获取登录信息
    let userName = getCookie('userName');
    let password = Base64.decode(getCookie('password'));
    // 如果存在 赋值给表单，并且将记住密码勾选
    if (userName) {
      this.loginFormData.userName = userName;
      this.loginFormData.password = password;
      this.loginFormData.remember = true;
    }
  },
  methods: {
    ...mapMutations([
      'setTagNavList'
    ]),
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    turnToPage (route) {
      let { name, params, query } = {};
      if (typeof route === 'string') name = route;
      else {
        name = route.name;
        params = route.params;
        query = route.query;
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1]);
        return;
      }
      this.$router.push({
        name,
        params,
        query
      });
    },
    // 储存表单信息
    setUserInfo: function () {
      // 判断用户是否勾选记住密码，如果勾选，向cookie中储存登录信息，
      // 如果没有勾选，储存的信息为空
      if (this.loginFormData.remember) {
        setCookie('userName', this.loginFormData.userName);
        // base64加密密码
        let passWord = Base64.encode(this.loginFormData.password);
        setCookie('password', passWord);
      } else {
        setCookie('userName', '');
        setCookie('password', '');
      }
    },
    // 登录
    handleSubmit ({ userName, password, remember }) {
      this.loginFormData = { userName, password, remember };
      // 储存登录信息
      this.handleLogin({ userName, password, remember }).then(res => {
        // 储存登录信息
        this.setUserInfo();
        setStore('password', password);
        setStore('userName', userName);
        // 获取用户权限
        this.getUserInfo();
        // 关闭所有标签，除了home
        let resPage = this.$store.state.app.tagNavList.filter(item => item.name === this.$config.homeName);
        this.turnToPage(this.$config.homeName);
        this.setTagNavList(resPage);
        if (password === '888888') {
          setTimeout(() => {
            this.$router.push('/edit-pwd');
          }, '1000');
        }
      });
    }
  }
};
</script>

<style lang="less">
  @import './login.less';
</style>
