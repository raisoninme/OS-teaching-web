// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//配置vue使用bootstrap.css
import './assets/bootstrap/css/bootstrap.min.css'
import './assets/bootstrap/css/global.css'
import less from 'less'
import api from '@/api/api'
//import axios from 'axios'
//import VueAxios from 'vue-axios'
import globalData from './globalData.js'   //注意文件路径，实际路径以项目目录结构为准

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(less)
//Vue.use(VueAxios, axios)

Vue.prototype.$api = api
//Vue.prototype.$http = axios

Vue.prototype.$globalData = globalData;

//axios.defaults.baseURL = 'http://192.168.2.197:3306/'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
