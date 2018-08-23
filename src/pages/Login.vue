<template>
  <div class="login-form" v-loading="isLoading">
    <img src="../../static/logo.png" alt="logo" height="50px" width="200px">
    <el-row class="center">
      <span class="line"></span>
      <!-- <h3 class="text">ログイン</h3> -->
      <!-- <span class="line"></span> -->
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
  // import {AWS,setCognitoIdentityCredentials,newApigClient} from '@/assets/util'
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
            message: 'ユーザーID未入力です',
            trigger: 'blur'
          }, ],
          password: [{
            required: true,
            message: 'パスワード未入力です',
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
            
            //for mock test
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
                  console.log('​login -> res', res);
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




            // 本番　apigClient-sdk-js
            // let apigClient = apigClientFactory.newClient(evtBus.defaultConfig);
            // let params = {};
            // let body = {
            //   items:{
            //     user_id:this.loginForm.user_id,
            //     password:sha256(this.loginForm.password)
            //   }
            // };
            // apigClient.reloApiVer100SigninPost(params, body)
            //   .then(res=>{
            //     console.log('​login -> res', res);
            //     me.isLoading=false;
            //     // me.$loading({lock: true}).close();
            //     if(res.data.error){
            //       failed
            //       this.$message.error('ユーザーIDまたはパスワードが違います');
            //       return false;
            //     }else{
            //       //success cognito
            //       //本番
            //       let {identityId,token}=res.data.data.token;
            //       let {user_id,user_nm,mail,auth_ptn,company_nm,control,status}=res.data.data.user;
            //       AWS.config.credentials = setCognitoIdentityCredentials(identityId,token);
            //       console.log('AWS',AWS)
            //       AWS.config.credentials.get((err) => {
            //         if (err) {
            //           console.log(err);
            //           return false;
            //         } else {
            //           let {expireDays}=evtBus;
            //           me.setAWSCookies(expireDays);//expire in 24hours
            //           me.setCookie('identityId',identityId,expireDays);
            //           me.setCookie('token',token,expireDays);
            //           me.setCookie('user_id',user_id,expireDays);
            //           me.setCookie('user_nm',user_nm,expireDays);
            //           me.setCookie('auth_ptn',auth_ptn,expireDays);
            //           me.setCookie('mail',mail,expireDays);
            //           me.setCookie('company_nm',company_nm,expireDays);
            //           me.setCookie('control',control,expireDays);
            //           me.setCookie('status',status,expireDays);
            //           let {check,accessKeyId,secretAccessKey,sessionToken,region}=me.getAWSCookies();
            //           apigClient=apigClientFactory.newClient({
            //             accessKey: AWS.config.credentials.accessKeyId,
            //             secretKey: AWS.config.credentials.secretAccessKey,
            //             sessionToken: AWS.config.credentials.sessionToken,
            //             region: AWS.config.region
            //           });
            //           //set GLOBAL apigClient
            //           evtBus.apigClient=apigClient;
            //           if (status==0) {
            //             //first login
            //             me.$router.push({
            //               path: '/changepass', 
            //               name: 'ChangePass', 
            //               params: { 
            //                 msg:'パスワード変更をお願いします！',
            //                 firstLogin:true,
            //                 user_id:me.loginForm.user_id,
            //                 password:me.loginForm.password
            //               }
            //             })
            //           }else{
            //             //to main
            //             me.$router.push('/main');
            //           }
            //         }
            //       });
            //     }
            //   })
            //   .catch(err=>{
            //     me.isLoading=false;
            //     // me.$loading({lock: true}).close();
            //     console.log('​login err -> ',err );
            //     if(err.response){
            //       if(err.response.data.error){
            //         if(err.response.status==403 && err.response.data.error.target=="Authentication error"){
            //           me.$message.error('ユーザーIDまたはパスワードが正しくありません');
            //           return false;
            //         }
            //       }
            //     }
            //     me.$message.error('通信エラーが発生しました！');
            //   })



          } else {
            console.log('error submit');
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
