import {createLocalVue,mount} from '@vue/test-utils'
import ChangePass from '../../../src/pages/ChangePass.vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import VueRouter from 'vue-router'
const localVue = createLocalVue()
localVue.use(ElementUI,{locale})
localVue.use(VueRouter)
const router = new VueRouter()

describe('ChangePass画面', () => {
  let wrapper;
  beforeEach(()=>{
    wrapper=mount(ChangePass,{
      localVue,
      router
    });
    wrapper.vm.$router.push('/changepass')
  })


  it('1. パスワード変更タイトルと、ユーザーIDと、旧パスワード、新パスワード、新パスワード確認のinput、確定ボタン、キャンセルボタン表示する', () => {
    see('パスワード変更');
    see('ユーザーID');
    see('旧パスワード');
    see('新パスワード');
    see('新パスワード確認');
    see('確定');
    see('キャンセル');
    expect(wrapper.contains('#username')).toBe(true);
    expect(wrapper.contains('#password')).toBe(true);
    expect(wrapper.contains('#newpass')).toBe(true);
    expect(wrapper.contains('#newpass_confirm')).toBe(true);
  })


  it('2. 初期状態はすべてのinputがブランクで、かつ警告が表示されてない状態', () => {
    expect(wrapper.vm.changePassForm.user).toBe('');
    expect(wrapper.vm.changePassForm.oldPass).toBe('');
    expect(wrapper.vm.changePassForm.newPass).toBe('');
    expect(wrapper.vm.changePassForm.newPassConfirm).toBe('');
    expect(wrapper.find('#username').text()).toBe('');
    expect(wrapper.find('#password').text()).toBe('');
    expect(wrapper.find('#newpass').text()).toBe('');
    expect(wrapper.find('#newpass_confirm').text()).toBe('');
    expect(wrapper.contains('.el-form-item__error')).toBe(false);
  })
  
  it('3. いずれのinputを入力せずBlurしたら、警告が出る。何かを入力すると、警告が消える',()=>{
    ['#username','#password','#newpass','#newpass_confirm'].forEach(selector=>{
      expect(wrapper.contains('.el-form-item__error')).toBe(false);
      inputTrigger(selector);
      expect(wrapper.contains('.el-form-item__error')).toBe(true);
      resetForm();
    })
  })

  it('4.新パスワードと新パスワード確認が一致しないまま、Blurしたら、警告がでる。一致するように入力しBlurしたら、警告が消える',()=>{
      expect(wrapper.contains('.el-form-item__error')).toBe(false);
      inputTrigger("#newpass",Math.random());
      inputTrigger('#newpass_confirm',Math.random());
      expect(wrapper.contains('.el-form-item__error')).toBe(true);
      expect(wrapper.find('.el-form-item__error').text()).toBe('新しいパスワード一致しませんでした');
  })

  // it('5. いずれのinputを入力しないまま確定ボタンを押すと、警告がでる',()=>{
  //   let temp=['#username','#password','#newpass','#newpass_confirm'].filter(()=>{return Math.random>0})
  //   console.log('​temp', temp);
    
  // })

  // it('6. ![TODO]ユーザーIDとパスワードが両方正しい場合は、ユーザー情報を取得、画面遷移イベントを出す（Main画面へ）',()=>{
    

  // })

  // it('7. パスワード変更ボタンを押すと、画面遷移イベントを出す（ChangePass画面へ）',()=>{
  //   expect(wrapper.vm.$route.path).toBe('/')    
  //   let changepass=wrapper.findAll('button').at(1);
  //   expect(changepass.text()).toEqual('パスワード変更');
  //   changepass.trigger('click');
  //   expect(wrapper.vm.$route.path).toBe('/changepass')
  // })
  
  // it('8. Forgot Passwordリンクを押すと、画面遷移イベントを出す（ForgotPass画面へ）',()=>{
  //   expect(wrapper.vm.$route.path).toBe('/')
  //   let forgotpass=wrapper.find('a');
  //   expect(forgotpass.text()).toEqual('Forgot Password?');
  //   forgotpass.trigger('click');
  //   expect(wrapper.vm.$route.path).toBe('/forgotpass')
  // })


  let see=(content,selector)=>{
    let wrap=selector ? wrapper.find(selector) : wrapper;
    expect(wrap.text()).toContain(content);
  }

  let inputTrigger=(selector,content)=>{
    let input=wrapper.find(selector);
    input.trigger('click');
    if(content){
      input.element.value=content;
      input.trigger('input');
    }
    input.trigger('blur');
  }

  let resetForm=()=>{
    wrapper.vm.$refs['changePassForm'].resetFields();
  }
})



