import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import "@/assets/icon/iconfont.css"  //引入icon
import "@/assets/css/zht.css"


import FastClick from 'fastclick'  //解决移动端300毫秒延迟
FastClick.attach(document.body);

//图片懒加载vue-lazyload
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
    // error: process.env.BASE_URL + 'lazyimg/404.jpg',
    loading: process.env.BASE_URL + 'img/loading.gif'
})

Vue.prototype.$publicPath = process.env.BASE_URL

//导入axios
import axios from 'axios';
const axiosInstance = axios.create({
    withCredentials: true,// 指定某个请求应该发送凭据。允许客户端携带跨域cookie，也需要此配置,
    baseURL: "/api"
    // baseURL: "/m-api"
});
window.axiosInstance = axiosInstance
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
