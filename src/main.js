// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import {
  AWS,
  getCookie,
  setCookie,
  delCookie,
  setAWSCookies,
  getAWSCookies,
  clearAllCookies
} from './assets/util'
import moment from 'moment'
import evtBus from '@/assets/evtBus';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import {
  faComment,
  faFileExcel,
  faFileWord,
  faFilePowerpoint,
  faFilePdf,
  faFileImage,
  faFileAlt,
  faFileCode,
  faFileVideo,
  faFileAudio,
} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'babel-polyfill'
// import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'
import '../theme/index.css'
import './assets/relo.css'

library.add(
  faSignOutAlt,
  faComment,
  faFileExcel,
  faFileWord,
  faFilePowerpoint,
  faFilePdf,
  faFileImage,
  faFileAlt,
  faFileCode,
  faFileVideo,
  faFileAudio,
)

Vue.component('fa-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(ElementUI,{locale});

Vue.filter('comment',(length)=>{
  return length > 0 ? ("合計"+length+"件あります") : "まだありません";
})

Vue.filter('date',(comment_id)=>{
  return moment(comment_id,'YYYYMMDDhhmmss').format('YYYY-MM-DD');
})


//cookie 20180708
Vue.prototype.getCookie=getCookie;
Vue.prototype.setCookie=setCookie;
Vue.prototype.delCookie=delCookie;
Vue.prototype.setAWSCookies=setAWSCookies;
Vue.prototype.getAWSCookies=getAWSCookies;
Vue.prototype.clearAllCookies=clearAllCookies;
Vue.prototype.clearCachedId=()=>{AWS.config.credentials.clearCachedId()};
Vue.prototype.refreshApigClient=(param)=>{
  return Promise.resolve(param)
};

axios.defaults.timeout=10000;
axios.defaults.retry = 1;
axios.defaults.retryDelay = 500;


axios.interceptors.response.use(res=>{
  return res
}, err=> {
  let {response,request,config,message}=err;
  if(response){
    console.log('​interceptors->response.data', response.data);
    console.log('​interceptors->response.status', response.status);
    console.log('​interceptors->response.headers', response.headers);

    //session err
    if(response.data.message){
      if(response.data.message.indexOf('expired')>-1){
        ElementUI.Message.error('セッション切れました、再ログインしてください');
        router.push({
          path: '/login'
        });
        err.expired=true;
      }else{
        router.push({
          path: '/error',
          name: 'Error', 
          params: { 
            errmsg:response.data.message
          }
        });
      }
      return Promise.reject(err);
    }
  }else if(request){
    console.log('​interceptors->request', request);
    console.log('​interceptors->message', message);
  }else{
    console.log('​interceptors->message', message);
  }

  if(!config || !config.retry) 
    return Promise.reject(err);

  config.__retryCount = config.__retryCount || 0;
  if(config.__retryCount >= config.retry) {
    return Promise.reject(err);
  }

  config.__retryCount += 1;
  let backoff = new Promise(function(resolve) {
      setTimeout(() => {
          resolve();
      }, config.retryDelay || 500);
  });
  return backoff.then(()=> {
      return axios(config);
  });
  
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
})
