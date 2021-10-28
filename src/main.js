import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './api/http';
Vue.config.productionTip = false;

// 整体引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
