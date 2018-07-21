<template>
  <div class="login-form">
    <h3>ログイン</h3>
    <el-form :model="loginForm" status-icon :rules="loginFormRules" ref="loginForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="ユーザーID" prop="user_id">
        <el-input id="username" v-model.number="loginForm.user_id" @keyup.enter.native="login('loginForm')" clearable></el-input>
      </el-form-item>
      <el-form-item label="パスワード" prop="password">
        <el-input id="password" type="password" v-model="loginForm.password" @keyup.enter.native="login('loginForm')" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" plain type="primary" @click="login('loginForm')">ログイン</el-button>
        <el-button size="small" plain @click="changePass">パスワード変更</el-button>
      </el-form-item>
      <el-form-item>
        <router-link tag="a" to="/forgotpass">Forgot Password?</router-link>
      </el-form-item>
    </el-form>
    <loading v-if="isLoading"></loading>

  </div>
</template>
<style scoped>

  h3 {
    text-align: center;
  }

</style>


<script>
  import {AWS,setCognitoIdentityCredentials,newApigClient} from '@/assets/util'
  import evtBus from '@/assets/evtBus';
  import loading from '@/components/Loading.vue'

  var apigClient = newApigClient();

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
    components: {
      loading
    },
    mounted() {
      // if(this.$getCookie('username')){
      // 	this.$router.push('/main')
      // }
    },
    methods: {
      login(formName) {
        let me = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.clearAllCookies();
            //demo
            // this.$router.push({
            //   path: '/main', 
            // });
            // return;

            //for mock test
            let me = this;
            me.isLoading=true;
            let params = {};
            let pathTemplate='signin';
            let method='POST';
            let additionalParams={};
            let body = {items:this.loginForm};
            apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
              .then(res=>{
                console.log('​login -> res', res);
                me.isLoading=false;
                let {identityId,token}=res.data.data.token;
                let {user_id,user_nm,mail,auth_ptn,company_nm,control,status}=res.data.data.user;
                let expireDays=1000*60*60*24;
                me.setCookie('identityId',identityId,expireDays);
                me.setCookie('user_id',user_id,expireDays);
                me.setCookie('user_nm',user_nm,expireDays);
                me.setCookie('auth_ptn',auth_ptn,expireDays);
                me.setCookie('mail',mail,expireDays);
                me.setCookie('company_nm',company_nm,expireDays);
                me.setCookie('control',control,expireDays);
                me.setCookie('status',status,expireDays);
                evtBus.apigClient=apigClient;
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
                this.$message.error('通信エラーが発生しました！');
                console.log('​login err -> ',err );
              })





            //本番
            // let me = this;
            // me.isLoading=true;
            // let params = {};
            // let pathTemplate='signin';
            // let method='POST';
            // let additionalParams={};
            // let body = {items:this.loginForm};
            // apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
            //   .then(res=>{
            //     console.log('​login -> res', res);
            //     me.isLoading=false;
            //     if(res.data.error){
            //       //failed
            //       this.$message.error(res.data.errmsg);
            //       return false;
            //     }else{
            //       //success cognito
            //       //demo
            //       let {identity_id,token}=res.data.data.items;
            //       let identityId=identity_id;
            //       let status=1;
            //       //本番
            //       // let {identityId,token}=res.data.data.token;
            //       // let {user_id,user_nm,mail,auth_ptn,company_nm,control,status}=res.data.data.user;
            //       AWS.config.credentials = setCognitoIdentityCredentials(identityId,token);
            //       AWS.config.credentials.get((err) => {
            //         if (err) {
            //           console.log(err);
            //           return false;
            //         } else {
            //           let expireDays=1000*60*60*24;
            //           me.setAWSCookies(expireDays);//expire in 24hours
            //           me.setCookie('identityId',identityId,expireDays);
            //           //TODO 本番
            //           // me.setCookie('user_id',user_id,expireDays);
            //           // me.setCookie('user_nm',user_nm,expireDays);
            //           // me.setCookie('auth_ptn',auth_ptn,expireDays);
            //           // me.setCookie('mail',mail,expireDays);
            //           // me.setCookie('company_nm',company_nm,expireDays);
            //           // me.setCookie('control',control,expireDays);
            //           // me.setCookie('status',status,expireDays);
            //           let {check,accessKeyId,secretAccessKey,sessionToken,region}=me.getAWSCookies();
            //           apigClient=me.sessionApigClient(accessKeyId,secretAccessKey,sessionToken,region);
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
            //     //network err
            //     me.isLoading=false;
            //     this.$message.error('通信エラーが発生しました！');
            //     console.log('​login err -> ',err );
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
      ToRegister() {
        this.showRegister = true
        this.showLogin = false
      },
      ToLogin() {
        this.showRegister = false
        this.showLogin = true
      },
      changePass(){
        this.$router.push('/changepass');
      }
    }
  }

</script>
