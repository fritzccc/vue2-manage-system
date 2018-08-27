<template>
  <div class="login-form" v-loading="isLoading">
    <img src="../../static/logo.png" alt="logo" height="50px" width="200px">
    <el-row class="center">
      <span class="line"></span>
    </el-row>
    <el-form :model="loginForm" status-icon :rules="loginFormRules" ref="loginForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="ユーザーID" prop="user_id">
        <el-input class="input-form" id="username" v-model="loginForm.user_id" @keyup.enter.native="login('loginForm')" clearable></el-input>
      </el-form-item>
      <el-form-item label="パスワード" prop="password">
        <el-input class="input-form" id="password" type="password" v-model="loginForm.password" @keyup.enter.native="login('loginForm')" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="login('loginForm')">ログイン</el-button>
        <el-button size="small" plain @click="changePass">パスワード変更</el-button>
      </el-form-item>
      <el-form-item>
        <router-link tag="a" style="color:#102e54;" to="/forgotpass">パスワードを忘れた方はこちらへ</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped>
  .center{
    text-align: center;
  }
  .text{
    margin:10px;
    margin-bottom: 30px;
    display:inline-block;
  }
  .line{
    display: inline-block;
    width: 460px;
    margin-bottom: 20px;
    border-top: 1px solid #ccc;
  }
  img{
    margin-left: 140px;
    margin-bottom: 15px;
    vertical-align: top;
  }

</style>


<script>
  import {AWS,setCognitoIdentityCredentials} from '@/assets/util'
  import {sha256} from 'js-sha256'
  import evtBus from '@/assets/evtBus'
  export default {
    data() {
      return {
        loginForm: {
          user_id: '',
          password: ''
        },
        isLoading:false,
        loginFormRules: {
          user_id: [{
            required: true,
            message: 'ユーザーIDが未入力です',
            trigger: 'blur'
          }, ],
          password: [{
            required: true,
            message: 'パスワードが未入力です',
            trigger: 'blur'
          }],
        },
      }
    },
    mounted() {
      this.clearAllCookies();
    },
    methods: {
      login(formName) {
        let me = this;
        me.$refs[formName].validate((valid) => {
          if (valid) {
            me.clearAllCookies();
            me.isLoading=true;
            
            setTimeout(() => {
              let apigClient = apigClientFactory.newClient(evtBus.defaultConfig);
              let params = {};
              let pathTemplate='signin';
              let method='POST';
              let additionalParams={};
              let body = {items:{
                user_id:this.loginForm.user_id,
                password:sha256(this.loginForm.password)
              }};
              axios.post('http://localhost:3003/relo-api/ver1_0_0/signin',body,{})
                .then(res=>{
                  me.isLoading=false;
                  let {identityId,token}=res.data.data.token;
                  let {user_id,user_nm,mail,auth_ptn,company_nm,control,status}=res.data.data.user;
                  let {expireDays}=evtBus;
                  me.setCookie('identityId',identityId,expireDays);
                  me.setCookie('user_id',user_id,expireDays);
                  me.setCookie('user_nm',user_nm,expireDays);
                  me.setCookie('auth_ptn',auth_ptn,expireDays);
                  me.setCookie('mail',mail,expireDays);
                  me.setCookie('company_nm',company_nm,expireDays);
                  me.setCookie('control',control,expireDays);
                  me.setCookie('sessionToken','sessionTokenTest',expireDays);
                  evtBus.apigClient = apigClient;
                  if (status==0) {
                  //first login
                    me.$router.push({
                      path: '/changepass',
                      name: 'ChangePass', 
                      params: { 
                        msg:'パスワード変更をお願いします！',
                        firstLogin:true,
                        user_id:me.loginForm.user_id,
                        password:me.loginForm.password
                      }
                    })
                  }else{
                    me.$router.push('/main');
                  }
                }).catch(err=>{
                  //network err
                  me.isLoading=false;
                  me.$message.error('通信エラーが発生しました！');
                  console.log('​login err -> ',err );
                })
            }, 1000);
          } else {
            return false;
          }
        });
      },
      resetForm(){
        this.$refs['loginForm'].resetFields();
      },
      changePass(){
        this.$router.push('/changepass');
      }
    }
  }

</script>
