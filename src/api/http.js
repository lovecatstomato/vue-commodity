import axios from 'axios';
import store from '@/store';
import router from '@/router';
import {MessageBox} from 'element-ui';
import Vue from 'vue';

// 全局默认配置
axios.defaults.baseURL = 'http://localhost:9000';

// 请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers['X-Token'] = store.state.token;
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data.code === 1) {
        MessageBox.alert("会话过期，请重新登录", "登录提示", {
            confirmButtonText: "确定",
            callback: (action) => {
                router.push("/");
            },
        });
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

Vue.prototype.$axios = axios;
