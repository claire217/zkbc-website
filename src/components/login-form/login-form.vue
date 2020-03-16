<template>
  <div class="loginFormCom">
    <Form ref="loginForm" :model="form" :rules="rules">
      <FormItem prop="userName">
        <Input placeholder="请输入用户名" style="display:none">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"/>
        </span>
        </Input>
        <Input v-model="form.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"/>
        </span>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input :type="passType" placeholder="请输入密码" style="display:none">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"/>
        </span>
          <Icon type="ios-eye" slot="append" v-if="passType === 'text'" @click.native="passTransfer"/>
          <Icon type="ios-eye-off" slot="append" v-if="passType === 'password'" @click.native="passTransfer"/>
        </Input>
        <Input :type="passType" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"/>
        </span>
          <Icon type="ios-eye" slot="append" v-if="passType === 'text'" @click.native="passTransfer"/>
          <Icon type="ios-eye-off" slot="append" v-if="passType === 'password'" @click.native="passTransfer"/>
        </Input>
      </FormItem>
      <FormItem>
        <Checkbox v-model="form.remember">记住密码</Checkbox>
      </FormItem>
      <FormItem>
        <Button @click="handleSubmit" type="primary" long>登录</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
// const validatePassword = (rule, value, callback) => {
//   let $pattern = /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{8,32}$/; // 大小写都得有
//   if (!$pattern.test(value)) {
//     callback(new Error('必须包含大小写字母和数字'));
//   } else {
//     callback();
//   }
// };
export default {
  name: 'LoginForm',
  data () {
    return {
      passType: 'password',
      form: {
        userName: this.userName,
        password: this.password,
        remember: this.remember
      }
    };
  },
  props: {
    userName: {
      type: String
    },
    password: {
      type: String
    },
    remember: {
      type: Boolean,
      default: false
    },
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ];
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
          // { min: 8, max: 32, message: '密码长度8-32个字符', trigger: 'blur' },
          // { validator: validatePassword, trigger: 'blur' }
        ];
      }
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      };
    }
  },
  methods: {
    passTransfer () {
      if (this.form.password) {
        if (this.passType === 'text') {
          this.passType = 'password';
        } else {
          this.passType = 'text';
        }
      }
    },
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password,
            remember: this.form.remember
          });
        }
      });
    }
  }
};
</script>
<style lang="less">
  @import "login-form";
</style>
