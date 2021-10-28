import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Cookies from 'js-cookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 保存用户的登录状态（比如用户名）
    // account: localStorage.getItem('account')
    account: Cookies.get('account'),
    token: Cookies.get('token')
  },
  mutations: {
    ACCOUNT_MUTATION(state, payload){
      state.account = payload;
    },
    TOKEN_MUTATION(state,payload){
      state.token = payload;
    }
  },
  actions: {
    loginAction(context, user){
      let pro = new Promise((resolve, reject) => {
        axios.post('http://localhost:9000/sys/login', `username=${user.username}&password=${user.password}`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then(result => {
          let {code, message, data: {user, token}} = result;
          if(code === 2){
            // 提交mutation,保存登录的用户名
            context.commit('ACCOUNT_MUTATION', user.account);
            context.commit('TOKEN_MUTATION', token);
            // localStorage.setItem('account', data.username);
            Cookies.set('account', user.account);
            Cookies.set('token', token);
            resolve();
          }else if(code === 4){
            reject('账号或密码错误');
          }else{
            reject(message);
          }
        })
      });

      return pro;
    }
  },
  modules: {
  }
});
