<template>
  <div class="login-form">
    <!-- <input type="file" id="file" />
    <button id="submit" @click="uploadTest">upload</button> -->
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
        <router-link tag="a" to="/forgotpass">パスワードを忘れた方はこちらへ</router-link>
      </el-form-item>
    </el-form>
    <!-- <loading v-if="isLoading"></loading> -->
  </div>
</template>
<style scoped>

  h3 {
    text-align: center;
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
      // if(this.$getCookie('username')){
      // 	this.$router.push('/main')
      // }
    },
    methods: {
      // uploadTest(){
      //   let puturl = 'https://httpbin.org/put';
      //   let file = document.querySelector('#file');
      //   axios.put(puturl, file.files[0], {
      //     headers: {
      //       'Content-Type': 'application/octet-stream'
      //     }
      //   }).then(res=>{
      //     alert('uploaded')
      //   })
      // },
      login(formName) {
        let me = this;
        // me.isLoading=true;
        me.$loading({lock: true});
        me.$refs[formName].validate((valid) => {
          if (valid) {
            me.clearAllCookies();

            //for mock test
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
                // me.isLoading=false;
                me.$loading({lock: true}).close();
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
                // me.isLoading=false;
                me.$loading({lock: true}).close();
                me.$message.error('通信エラーが発生しました！');
                console.log('​login err -> ',err );
              })



            // 本番　apigClient-sdk-js
            // let config = {
            //   accessKey: '',
            //   secretKey: '',
            //   sessionToken: '',
            //   region: 'ap-northeast-1',
            //   apiKey: undefined,
            //   defaultContentType: 'application/json',
            //   defaultAcceptType: 'application/json'
            // };
            // let apigClient = apigClientFactory.newClient(config);
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
            //     // me.isLoading=false;
            //     me.$loading({lock: true}).close();
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
            //       AWS.config.credentials.get((err) => {
            //         if (err) {
            //           console.log(err);
            //           return false;
            //         } else {
            //           let expireDays=1000*60*60*24;
            //           me.setAWSCookies(expireDays);//expire in 24hours
            //           me.setCookie('identityId',identityId,expireDays);
            //           //TODO 本番
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
            //     // me.isLoading=false;
            //     me.$loading({lock: true}).close();
            //     me.$message.error('ユーザーIDまたはパスワードが正しくありません');
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
