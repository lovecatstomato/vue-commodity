<template>
  <div class="login">
    <h2>elm后台管理系统</h2>
    <el-form class="login-form" :model="user">
      <el-form-item >
        <el-input placeholder="用户名" v-model="user.username"/>
      </el-form-item>
      <el-form-item >
        <el-input show-password placeholder="密码" v-model="user.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'Login',
  data(){
    return {
      user: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    // 将组件中的方法映射为store.dispatch()调用
    ...mapActions(['loginAction']),
    login(){
      if(this.user.username === '' || this.user.password === ''){
        this.$message.error('请输入账号和密码');
        return;
      }

// 分发登录的action
      let promise = this.loginAction(this.user);
      promise.then(() => {
        // 登录成功，跳转到管理的主界面
        this.$router.push('/manager');
      }).catch(msg => {
        this.$message.error(msg);
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login{
  padding-top: 100px;
  height: 100vh;
  box-sizing: border-box;
  background-color: #324057;

  h2{
    color: #efefef;
    text-align: center;
  }

  .login-form{
    width: 300px;
    margin: auto;
    margin-top: 30px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
  }
}
</style>
