// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import VueResource from 'vue-resource'
import 'babel-polyfill'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import '../theme/index.css'
import './assets/relo.css'
Vue.config.productionTip = false
Vue.use(VueResource);
Vue.use(ElementUI,{locale});

Vue.filter('no_ext',(filename)=>{
  if (!filename)
    return '';
  return filename.replace(/\.\w+$/,'')
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
})
