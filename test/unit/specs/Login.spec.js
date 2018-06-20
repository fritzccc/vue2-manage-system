
import Vue from 'vue'
import {createLocalVue,shallowMount} from '@vue/test-utils'
import Login from '../../../src/pages/Login.vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import VueRouter from 'vue-router'
const localVue = createLocalVue()
localVue.use(ElementUI,{locale})
localVue.use(VueRouter)

describe('Login.vue', () => {
  let wrapper;
  beforeEach(()=>{
    wrapper=shallowMount(Login,{
      localVue
    });
  })
  it('"ログイン"というタイトルと、ユーザーIDと、パスワードのinputが表示する', () => {
    expect(wrapper.contains('h3')).toBe(true);
    expect(wrapper.find('h3').text()).toContain('ログイン');
    expect(wrapper.contains('#username')).toBe(true);
    expect(wrapper.contains('#password')).toBe(true);
  })

  it('初期状態はユーザーIDとパスワード両方ブランクで、かつ警告が表示されてない状態だ', () => {
    expect(wrapper.vm.loginForm.user).toBe('');
    expect(wrapper.vm.loginForm.pass).toBe('');
    expect(wrapper.find('#username').text()).toBe('');
    expect(wrapper.find('#password').text()).toBe('');
    expect(wrapper.contains('.el-form-item__error')).toBe(false);
    
  })
  
  it('ユーザーIDとパスワードの一方を入力せずBlurしたら、警告が出る',()=>{
    let username=wrapper.find('#username');
    let password=wrapper.find('#password');

    username.trigger('click');
    username.trigger('blur');
    expect(wrapper.contains('.el-form-item__error')).toBe(true);
    expect(wrapper.find('.el-form-item__error').text()).toBe('ユーザーID未入力です');

    wrapper.vm.resetForm();
    expect(wrapper.contains('.el-form-item__error')).toBe(false);
    password.trigger('click');
    password.trigger('blur');
    expect(wrapper.contains('.el-form-item__error')).toBe(true);
    expect(wrapper.find('.el-form-item__error').text()).toBe('パスワード未入力です');

    wrapper.vm.resetForm();
    expect(wrapper.contains('.el-form-item__error')).toBe(false);
    username.trigger('click');
    username.trigger('blur');
    password.trigger('click');
    password.trigger('blur');
    expect(wrapper.findAll('.el-form-item__error').at(0).text()).toBe('ユーザーID未入力です');
    expect(wrapper.findAll('.el-form-item__error').at(1).text()).toBe('パスワード未入力です');
  })

  it('ユーザーIDとパスワードがブランクのまま、ログインすると、警告がでる',()=>{
    wrapper.find('button').trigger('click');
    expect(wrapper.findAll('.el-form-item__error').at(0).text()).toBe('ユーザーID未入力です');
    expect(wrapper.findAll('.el-form-item__error').at(1).text()).toBe('パスワード未入力です');
  })

  it('ユーザーIDとパスワードがどっちが間違えると、ログインできない、警告がでる',()=>{
    expect(wrapper.contains('div[role=alert]')).toBe(false);

    let username=wrapper.find('#username');
    let password=wrapper.find('#password');
    username.element.value='1';
    password.element.value='1';
    username.trigger('input');
    password.trigger('input');
    expect(wrapper.contains('.el-form-item__error')).toBe(false);
    // wrapper.find('button').trigger('click');
  })
})
