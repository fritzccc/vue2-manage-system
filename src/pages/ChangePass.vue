<template>
  <div class="login-form">
    <p v-if="firstLogin" style="color:red">ログインパスワードの変更をしてください</p>
    <h3>パスワード変更</h3>
    <el-form :model="changePassForm" status-icon :rules="changePassFormRules" ref="changePassForm" label-width="150px" class="demo-ruleForm">
      <el-form-item v-show="!firstLogin" label="ユーザーID" prop="user_id">
        <el-input class="input-form" id="username" v-model="changePassForm.user_id" clearable></el-input>
      </el-form-item>
      <el-form-item v-show="!firstLogin" label="旧パスワード" prop="oldPass">
        <el-input class="input-form" id="password" type="password" v-model="changePassForm.oldPass" clearable></el-input>
      </el-form-item>
      <el-form-item label="新パスワード" prop="newPass">
        <el-input class="input-form" id="newpass" type="password" v-model="changePassForm.newPass" clearable>
          <el-popover
            slot="suffix"
            placement="top-start"
            title="パスワードは以下の条件を満たす必要があります:"
            width="400"
            trigger="hover">
            <ul style="margin-left:20px;">
              <li>8～20文字で構成されている</li>
              <li>大文字、小文字、数字を含めている</li>
              <li>お使いいただける特殊文字は <b>~`!@#$%^&*?+=_-()</b> です</li>
            </ul>
            <i slot="reference" class="el-icon-question"></i>
          </el-popover>
        </el-input>
      </el-form-item>
      <el-form-item label="新パスワード確認" prop="newPassConfirm">
        <el-input class="input-form" id="newpass_confirm" type="password" :disabled="changePassForm.newPass==''" v-model="changePassForm.newPassConfirm" @keyup.enter.native="changePass('changePassForm')" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" plain type="primary" @click="changePass('changePassForm')">確定</el-button>
        <el-button size="small" plain @click="back">キャンセル</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<style scoped>
  h3,p {
    text-align: center;
  }

</style>


<script>
  import evtBus from '@/assets/evtBus'
  import {sha256} from 'js-sha256'
  export default {
    data() {
      let len = /^[~`!@#$%^&*?+=_\(\)\w-]{8,20}$/;
      let lower=/^.*(?=.*[a-z]).*$/;
      let upper=/^.*(?=.*[A-Z]).*$/;
      let num=/^.*(?=.*\d).*$/;
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('新しいパスワードを入力してください'));
        } else if(!len.test(value)){
          callback(new Error('有効な文字で、8-20桁でお願いします'))
        }else if(!lower.test(value)){
          callback(new Error('小文字を含めてください'))
        }else if(!upper.test(value)){
          callback(new Error('大文字を含めてください'))
        }else if(!num.test(value)){
          callback(new Error('数字を含めてください'))
        }else {
          if (this.changePassForm.newPassConfirm !== '') {
            this.$refs.changePassForm.validateField('newPassConfirm');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('もう一度新しいパスワードを入力してください'));
        } else if (value !== this.changePassForm.newPass) {
          callback(new Error('新しいパスワードが一致しませんでした'));
        } else {
          callback();
        }
      };
      return {
        firstLogin:false,
        changePassForm: {
          user_id: '',
          oldPass:'',
          newPass:'',
          newPassConfirm:''
        },
        changePassFormRules:{
          user_id: [{
            required: true,
            message: 'ユーザーIDを入力してください',
            trigger: 'blur'
          }, ],
          oldPass: [{
            required: true,
            message: '旧パスワードを入力してください',
            trigger: 'blur'
          }],
          newPass:[{
            required: true,
            validator:validatePass,
            trigger:'blur'
          }],
          newPassConfirm:[{
            required: true,
            validator:validatePass2,
            trigger:'blur'
          }]
        }
      }
    },
    mounted() {
      if(!evtBus.apigClient){
        evtBus.apigClient = apigClientFactory.newClient(evtBus.defaultConfig);
      }
      this.firstLogin=this.$route.params.firstLogin;
      if (this.firstLogin) {
        this.changePassForm.user_id=this.$route.params.user_id;
        this.changePassForm.oldPass=this.$route.params.password;
      }
    },
    methods: {
      changePass(formName) {
        let me = this;
        me.$refs[formName].validate((valid) => {
          if (valid) {
            let items={
              user_id:me.changePassForm.user_id,
              password_old:sha256(me.changePassForm.oldPass),
              password_new:sha256(me.changePassForm.newPass),
            };
            if (this.firstLogin) items.status = 0;
            evtBus.apigClient.reloApiVer100ChangepassPost({},{items:items})
              .then(res => {
                if(!res.data.error){
                  //success
                  me.$message.success('パスワードを変更しました！');
                  me.$refs[formName].resetFields();
                  setTimeout(() => {
                    me.$router.push('/login');
                  }, 2000);
                }else if(res.data.error.code==204){
                  //incorrect user&pass
                  me.$message.warning('入力されたアカウントまたはパスワードに誤りがあります！');
                  console.log('changePass -> res.data.error', res.data.error);
                  return false;
                }else{
                  me.$message.error('エラーが発生しました！'+res.data.error.message);
                  setTimeout(() => {
                    me.$router.push('/error').bind(me);
                  }, 2000);
                }
              })
              .catch(err => {
                me.$message.error('通信エラーが発生しました！');
                console.log("err: ", err);
              });
          } else {
            return false;
          }
        });
      },
      back(){
        this.$router.push("/login");
      }
    }
  }

</script>
