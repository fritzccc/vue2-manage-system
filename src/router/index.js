import Vue from 'vue'
import Router from 'vue-router'
import {getCookie, setCookie, delCookie,clearAllCookies} from '@/assets/util'
Vue.use(Router)

const routes = [{
    path: '/', redirect: '/login'
  },{
    path: '/login',
    name: 'Login',
    component: resolve => require(['../pages/Login.vue'], resolve)
  }, {
    path: '/forgotpass',
    name: 'ForgotPass',
    component: resolve => require(['../pages/ForgotPass.vue'], resolve)
  },{
    path: '/changepass',
    name: 'ChangePass',
    component: resolve => require(['../pages/ChangePass.vue'], resolve)
  },{
    path: '/main',
    name: 'Main',
    meta:{
      requireAuth: true,
      keepAlive: false
    },
    component: resolve => require(['../pages/Main.vue'], resolve)
  },{
    path: '/error',
    name: 'Error',
    component: resolve => require(['../pages/Error.vue'], resolve)
  }]

const router = new Router({
  routes
});
//demo
router.beforeEach((to, from, next) => {
  if(to.fullPath=='/main') {
    console.log('from', from);
    if(getCookie('status')==0){
      next({
        path: '/changepass'
      });
    }else if(getCookie('user_id')){
      next();
    }else{
      clearAllCookies();
      next({
        path: '/login'
      });
    }
  }else if(to.fullPath=="/error"){
    next();
  }else{
    if(getCookie('user_id') && getCookie('status')!=0){
      next({
        path: '/main'
      });
    }else{
      next();
    }
  }
});
export default router;