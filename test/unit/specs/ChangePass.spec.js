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
  
  it('3. 新パスワードの入力状態によって、新パスワード確認は入力可/不可に切替',()=>{
    expect(wrapper.find('#newpass').text()).toBe('');
    expect(wrapper.find('#newpass_confirm').attributes().disabled).toBe('disabled');
    inputTrigger('#newpass','test');
    expect(wrapper.find('#newpass_confirm').attributes().disabled).toBeUndefined();
    inputTrigger('#newpass','');
    expect(wrapper.find('#newpass_confirm').attributes().disabled).toBe('disabled');

  })

  it('4. いずれのinputを入力せずBlurしたら、警告が出る。何かを入力すると、警告が消える',()=>{
    let input_arr=['#username','#password','#newpass'];
    let warnings=['ユーザーID未入力です','旧パスワード未入力です','新しいパスワード入力してください'];
    input_arr.forEach((selector,index)=>{
      expect(wrapper.contains('.el-form-item__error')).toBe(false);
      inputTrigger(selector);
      expect(wrapper.contains('.el-form-item__error')).toBe(true);
      see(warnings[index],'.el-form-item__error');
      resetForm();
    })

    expect(wrapper.contains('.el-form-item__error')).toBe(false);
    inputTrigger('#newpass','Test1234');
    inputTrigger('#newpass_confirm');
    expect(wrapper.contains('.el-form-item__error')).toBe(true);
    see('もう一度新しいパスワード入力してください','.el-form-item__error');

  })

  it('5.新パスワードと新パスワード確認が一致しないまま、Blurしたら、警告がでる。一致するように入力しBlurしたら、警告が消える',()=>{
      expect(wrapper.contains('.el-form-item__error')).toBe(false);
      inputTrigger('#newpass','Test1234');
      inputTrigger('#newpass_confirm','1234Test');
      expect(wrapper.contains('.el-form-item__error')).toBe(true);
      see('新しいパスワード一致しませんでした');
  })

  it('6. いずれのinputを入力しないまま確定ボタンを押すと、警告がでる',()=>{
    let input_all=['#username','#password','#newpass','#newpass_confirm'];
    for (let i = 0; i < 3; i++) {
      let inputs=input_all.filter(()=>Math.random()>0.5);
      if(inputs.length==0||inputs.length==4) continue;
      expect(wrapper.contains('.el-form-item__error')).toBe(false);
      inputs.forEach((selector)=>{
        inputTrigger(selector,'Test1234');
      })
      click('.el-button--primary');
      expect(wrapper.contains('.el-form-item__error')).toBe(true);
      wrapper.vm.$refs.changePassForm.clearValidate();
      input_all.forEach((selector)=>{
        wrapper.find(selector).setValue('');
      })
    }
  })

  it('7. パスワードポリシーテスト',()=>{
    let bad_sample=['test!','Test%','TEST@','Test1','test1234','TEST1234','testTEST'];
    let good_sample=['Test@1234','TeST1234','Te0^&sT'];
    bad_sample.forEach(sample=>{
      expect(wrapper.contains('.el-form-item__error')).toBe(false);
      inputTrigger('#newpass',sample);
      expect(wrapper.contains('.el-form-item__error')).toBe(true);
      wrapper.vm.$refs.changePassForm.clearValidate();
    })
    good_sample.forEach(sample=>{
      expect(wrapper.contains('.el-form-item__error')).toBe(false);
      inputTrigger('#newpass',sample);
      expect(wrapper.contains('.el-form-item__error')).toBe(false);
      wrapper.vm.$refs.changePassForm.clearValidate();
    })
  })

  it('8. ![TODO]入力条件全部満たして、パスワード変更ボタンを押すと、サーバーへパスワード変更Requestが飛び、ユーザーIDとパスワードが間違える場合、メッセージを出す',()=>{

  })

  // it('9. パスワード変更ボタンを押すと、画面遷移イベントを出す（ChangePass画面へ）',()=>{
  //   expect(wrapper.vm.$route.path).toBe('/')    
  //   let changepass=wrapper.findAll('button').at(1);
  //   expect(changepass.text()).toEqual('パスワード変更');
  //   changepass.trigger('click');
  //   expect(wrapper.vm.$route.path).toBe('/changepass')
  // })
  
  // it('10. Forgot Passwordリンクを押すと、画面遷移イベントを出す（ForgotPass画面へ）',()=>{
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
    if(content || content==''){
      input.setValue(content);
    }
    input.trigger('blur');
  }

  let click=(selector)=>{
    wrapper.find(selector).trigger('click');
  }
  let resetForm=()=>{
    wrapper.vm.$refs.changePassForm.resetFields();
  }
})



