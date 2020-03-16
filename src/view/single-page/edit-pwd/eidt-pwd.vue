<template>
  <div class="edit-pwd">
    <div class="edit-con">
      <Card title="修改密码" :bordered="false">
        <Form ref="editPwdForm" :model="form" :rules="rules">
          <FormItem prop="oldPwd" label="原始密码">
            <Input v-model="form.oldPwd" :type="oldPwdType">
              <span slot="prepend">
                <Icon :size="14" type="md-lock"/>
              </span>
              <Icon type="ios-eye" slot="append" v-if="oldPwdType === 'text'" @click.native="passTransfer('oldPwdType')"/>
              <Icon type="ios-eye-off" slot="append" v-if="oldPwdType === 'password'" @click.native="passTransfer('oldPwdType')"/>
            </Input>
          </FormItem>
          <FormItem prop="password" label="新密码">
            <Input v-model="form.password" :type="passwordType">
              <span slot="prepend">
                <Icon :size="14" type="md-lock"/>
              </span>
              <Icon type="ios-eye" slot="append" v-if="passwordType === 'text'" @click.native="passTransfer('passwordType')"/>
              <Icon type="ios-eye-off" slot="append" v-if="passwordType === 'password'" @click.native="passTransfer('passwordType')"/>
            </Input>
          </FormItem>
          <FormItem prop="surePwd" label="确认密码">
            <Input v-model="form.surePwd" :type="surePwdType">
              <span slot="prepend">
                <Icon :size="14" type="md-lock"/>
              </span>
              <Icon type="ios-eye" slot="append" v-if="surePwdType === 'text'" @click.native="passTransfer('surePwdType')"/>
              <Icon type="ios-eye-off" slot="append" v-if="surePwdType === 'password'" @click.native="passTransfer('surePwdType')"/>
            </Input>
          </FormItem>
          <FormItem class="form-item-btn">
            <Button @click="back">取消</Button>
            <Button type="primary" @click="handleSubmit">确定</Button>
          </FormItem>
        </Form>
      </Card>
    </div>
  </div>
</template>

<script>
import { editUserPwd } from '@/api/user';
import { getStore, setStore } from '@/libs/storage';
export default {
  name: 'editPwdForm',
  data () {
    const validatePassCheck = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      let $pattern = /^(?=.*[0-9].*)(?=.*[a-zA-Z].*).{6,16}$/;
      if (!$pattern.test(value)) {
        callback(new Error('必须包含字母和数字'));
      } else {
        callback();
      }
    };
    const validateOldPwd = (rule, value, callback) => {
      let pwd = getStore('password');
      if (value !== pwd) {
        callback(new Error('原始密码不正确'));
      } else {
        callback();
      }
    };
    return {
      oldPwdType: 'password',
      passwordType: 'password',
      surePwdType: 'password',
      form: {
        oldPwd: '',
        password: '',
        surePwd: ''
      },
      rules: {
        oldPwd: [
          { required: true, message: '请输入原始密码', trigger: 'blur' },
          { validator: validateOldPwd, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度6-16个字符', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ],
        surePwd: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: validatePassCheck, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    back () {
      this.$router.back(-1);
    },
    passTransfer (val) {
      if (val === 'oldPwdType') {
        if (this.oldPwdType === 'text') {
          this.oldPwdType = 'password';
        } else {
          this.oldPwdType = 'text';
        }
      } else if (val === 'passwordType') {
        if (this.passwordType === 'text') {
          this.passwordType = 'password';
        } else {
          this.passwordType = 'text';
        }
      } else if (val === 'surePwdType') {
        if (this.surePwdType === 'text') {
          this.surePwdType = 'password';
        } else {
          this.surePwdType = 'text';
        }
      }
    },
    handleSubmit () {
      this.$refs.editPwdForm.validate((valid) => {
        if (valid) {
          this.form.id = this.userId;
          editUserPwd(this.form).then(res => {
            this.$Message.success('修改成功！');
            setStore('password', this.form.surePwd);
            this.form.oldPwd = '';
            this.form.password = '';
            this.form.surePwd = '';
            this.$router.push({
              path: this.$config.homeName
            });
          });
        }
      });
    }
  },
  computed: {
    userId () {
      return this.$store.state.user.userId;
    }
  }
};
</script>

<style lang="less">
  @import "edit-pwd";
</style>
