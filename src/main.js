// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import 'babel-polyfill'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import '../theme/index.css'
import './assets/relo.css'
Vue.config.productionTip = false
Vue.use(ElementUI,{locale});

Vue.prototype.$http = axios

Vue.filter('no_ext',(docNm)=>{
  if (!docNm)
    return '';
  return docNm.replace(/\.\w+$/,'')
})

Vue.filter('comment',(length)=>{
  return length>0?("合計"+length+"件あります"):"まだありません"
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
})
