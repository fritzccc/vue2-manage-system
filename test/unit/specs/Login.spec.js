import {createLocalVue,mount} from '@vue/test-utils'
import Login from '../../../src/pages/Login.vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import VueRouter from 'vue-router'
const localVue = createLocalVue()
localVue.use(ElementUI,{locale})
localVue.use(VueRouter)
const router = new VueRouter()

describe('Login画面', () => {
  let wrapper;
  beforeEach(()=>{
    wrapper=mount(Login,{
      localVue,
      router
    });
    wrapper.vm.$router.push('/login')
  })

  it('1. ログインタイトルと、ユーザーIDと、パスワードのinput、ログインボタン、パスワード変更ボタン、Forgot Password?リンクが表示する', () => {
    expect(wrapper.find('h3').text()).toEqual('ログイン');
    expect(wrapper.contains('#username')).toBe(true);
    expect(wrapper.contains('#password')).toBe(true);
    expect(wrapper.contains('a')).toBe(true);
    expect(wrapper.find('a').text()).toEqual('Forgot Password?');
    
  })

  it('2. 初期状態はユーザーIDとパスワード両方ブランクで、かつ警告が表示されてない状態', () => {
    expect(wrapper.vm.loginForm.user).toBe('');
    expect(wrapper.vm.loginForm.pass).toBe('');
    expect(wrapper.find('#username').text()).toBe('');
    expect(wrapper.find('#password').text()).toBe('');
    expect(wrapper.contains('.el-form-item__error')).toBe(false);
    
  })
  
  it('3. ユーザーIDとパスワードのを入力せずBlurしたら、警告が出る。何かを入力すると、警告が消える',()=>{
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

  it('4. ユーザーIDとパスワードがブランクのまま、ログインすると、警告がでる',()=>{
    wrapper.find('button').trigger('click');
    expect(wrapper.findAll('.el-form-item__error').at(0).text()).toBe('ユーザーID未入力です');
    expect(wrapper.findAll('.el-form-item__error').at(1).text()).toBe('パスワード未入力です');
  })

  it('5. ユーザーIDとパスワードがどっちが間違えると、ログインできない、警告がでる',()=>{
    expect(wrapper.contains('div[role=alert]')).toBe(false);

    let username=wrapper.find('#username');
    let password=wrapper.find('#password');
    username.element.value='1';
    password.element.value='1';
    username.trigger('input');
    password.trigger('input');
    expect(wrapper.contains('.el-form-item__error')).toBe(false);
    wrapper.find('button').trigger('click');
    expect(wrapper.contains('.el-form-item__error')).toBe(true);
  })

  it('6. ![TODO]ユーザーIDとパスワードが両方正しい場合は、ユーザー情報を取得、画面遷移イベントを出す（Main画面へ）',()=>{
    

  })

  it('7. パスワード変更ボタンを押すと、画面遷移イベントを出す（ChangePass画面へ）',()=>{
    expect(wrapper.vm.$route.path).toBe('/login')    
    let changepass=wrapper.findAll('button').at(1);
    expect(changepass.text()).toEqual('パスワード変更');
    changepass.trigger('click');
    expect(wrapper.vm.$route.path).toBe('/changepass')
  })
  
  it('8. Forgot Passwordリンクを押すと、画面遷移イベントを出す（ForgotPass画面へ）',()=>{
    expect(wrapper.vm.$route.path).toBe('/login')
    let forgotpass=wrapper.find('a');
    expect(forgotpass.text()).toEqual('Forgot Password?');
    forgotpass.trigger('click');
    expect(wrapper.vm.$route.path).toBe('/forgotpass')
  })


  let see=(content,selector)=>{
    let wrap=selector ? wrapper.find(selector) : wrapper;
    expect(wrap.text()).toContain(content);
  }
})



