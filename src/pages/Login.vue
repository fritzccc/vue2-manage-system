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
        <el-button plain type="primary" @click="login('loginForm')">ログイン</el-button>
        <el-button plain @click="changePass">パスワード変更</el-button>
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
  import loading from '../components/Loading.vue'
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
            //DEMO
            if (me.loginForm.user_id == 'admin' && me.loginForm.password == 'admin') {
              this.isLoading=true;              
              let expireDays=1000*60*60;
              this.setCookie('session','blablablablabla...', expireDays);
              this.setCookie('username',me.loginForm.user_id,expireDays);
              setTimeout(() => {
                this.$router.push({
                  name:'Main',
                  params:{
                    msg:'param test'
                  }
                });
              }, 1800);
            } else if (me.loginForm.user_id == 'test' && me.loginForm.password == 'test') {
              this.isLoading=true;              
              let expireDays=1000*60*60;
              this.setCookie('session','blablablablabla...', expireDays);
              this.setCookie('username',me.loginForm.user_id,expireDays);
              this.setCookie('status',0,expireDays)
              setTimeout(() => {
                this.$router.push({
                  name:'ChangePass',
                  params:{
                    firstLogin:true,
                    user_id:this.loginForm.user_id,
                    password:this.loginForm.password
                  }
                });
              }, 1800);
            }else {
              this.$message.error('入力されたアカウントまたはパスワードに誤りがあります。');
            }
            //TODO 20180708
            // this.$http.post('ver1.0.0/signin',{items:this.loginForm})
            //   .then(resp=>{
            //     this.isLoading=false;
            //     if(resp.statusCode!=200){
            //       //login failed
            //       this.$message.error(resp.errMsg)
            //     }else{
            //       //login success
            //       let expireDays=1000*60*60*24;
            //       //Session
            //       this.setCookie('session',res.data.token.token,expireDays);
            //       //identity_id
            //       this.setCookie('identity_id',res.data.token.identity_id,expireDays);
            //       //username
            //       this.setCookie('userinfo',res.data.user,expireDays);

            //       if(this.$route.query.redirect) {
            //       this.$router.push(this.$route.query.redirect);
            //       } else if (resp.data.status==0){
            //         this.$router.push({
            //           path: '/changepass', 
            //           params: { 
            //             msg:'パスワード変更をお願いします！'
            //           }
            //         })
            //       } else {
            //         this.$router.push({
            //           path: '/main', 
            //           params: { 
            //             user:'test'
            //           }
            //         });
            //       }
            //     }
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
