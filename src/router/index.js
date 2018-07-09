import Vue from 'vue'
import Router from 'vue-router'
import {post,fetch,patch,put} from '@/assets/http'
import {getCookie, setCookie, delCookie} from '@/assets/util'
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
    meta:{requireAuth: true },
    component: resolve => require(['../pages/Main.vue'], resolve)
  }, ]

const router = new Router({
  routes
});
//demo
router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth) {
    if(getCookie('session')){
      next();
    }else{
      next({
        path: '/login'
      });
    }
  }else if(to.fullPath!='/main'){
    if(getCookie('session')){
      next({
        path: '/main'
      });
    }else{
      next();
    }
  } else {
    next();
  }
});

//TODO
// router.beforeEach((to, from, next) => {
//   if(to.meta.requireAuth) {
//     fetch('m/is/login').then(resp => {
//       if(resp.statusCode == 200) {
//         next();
//       } else {
//         if(getCookie('session')) {
//           delCookie('session');
//         }
//         if(getCookie('u_uuid')) {
//           delCookie('u_uuid');
//         }
//         if(getCookie('username')) {
//           delCookie('username');
//         }
//         next({
//           path: '/login'
//         });
//       }
//     });
//   } else {
//     next();
//   }
// });

export default router;