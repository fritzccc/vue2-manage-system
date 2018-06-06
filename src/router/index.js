import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
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
    component: resolve => require(['../pages/Main.vue'], resolve)
  }, ]
})
