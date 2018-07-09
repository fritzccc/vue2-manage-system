// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from './assets/http'
import router from './router'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import {getCookie, setCookie, delCookie} from './assets/util'

import 'babel-polyfill'
import 'normalize.css'
// import 'element-ui/lib/theme-chalk/index.css'
import '../theme/index.css'
import './assets/relo.css'
Vue.config.productionTip = false
Vue.use(ElementUI,{locale});

Vue.prototype.$http = axios

Vue.filter('no_ext',(doc_nm)=>{
  if (!doc_nm)
    return '';
  return doc_nm.replace(/\.\w+$/,'')
})

Vue.filter('comment',(length)=>{
  return length > 0 ? ("合計"+length+"件あります") : "まだありません"
})


//cookie 20180708
Vue.prototype.getCookie=getCookie;
Vue.prototype.setCookie=setCookie;
Vue.prototype.delCookie=delCookie;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    // watch:{
    //   "$route" : 'checkLogin'
    // },
    // created() {
    //   this.checkLogin();
    // },
    // methods:{
    //   checkLogin(){
    //     //check if session exists
    //     if(!this.getCookie('session')){
    //       this.$router.push('/login');
    //     }else{
    //       this.$router.push('/main');
    //     }
    //   }
    // }
})
