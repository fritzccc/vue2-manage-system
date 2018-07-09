<template>
  <div class="centered">
    <div class="login-form">
        <h3>ログイン</h3>
        <el-form :model="loginForm" status-icon :rules="loginFormRules" ref="loginForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="ユーザーID" prop="user">
            <el-input id="username" v-model.number="loginForm.user" @keyup.enter.native="login('loginForm')" clearable></el-input>
          </el-form-item>
          <el-form-item label="パスワード" prop="pass">
            <el-input id="password" type="password" v-model="loginForm.pass" @keyup.enter.native="login('loginForm')" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button plain type="primary" @click="login('loginForm')">ログイン</el-button>
            <el-button plain @click="changePass">パスワード変更</el-button>
          </el-form-item>
          <el-form-item>
            <router-link tag="a" to="/forgotpass">Forgot Password?</router-link>
          </el-form-item>
        </el-form>
    </div>
    <loading v-if="isLoading"></loading>

    <!-- <div class="register-wrap" v-show="showRegister">
			<h3>注册</h3>
			<p v-show="showTishi">{{tishi}}</p>
			<input type="text" placeholder="请输入用户名" v-model="newUsername">
			<input type="password" placeholder="请输入密码" v-model="newPassword">
			<button v-on:click="register">注册</button>
			<span v-on:click="ToLogin">已有账号？马上登录</span>
		</div> -->
  </div>
</template>
<style scoped>
  .centered{
    width: 500px;
    margin: auto;
  }

  h3 {
    text-align: center;
  }

  .login-form {
    margin-top: 50px;
    padding: 20px;
    border: 1px solid rgba(99, 99, 99, .3);
  }

</style>


<script>
  import loading from '../components/Loading.vue'
  export default {
    data() {
      return {
        loginForm: {
          user: '',
          pass: ''
        },
        isLoading:false,
        loginFormRules: {
          user: [{
            required: true,
            message: 'ユーザーID未入力です',
            trigger: 'blur'
          }, ],
          pass: [{
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
            //DEMO
            if (me.loginForm.user == 'admin' && me.loginForm.pass == 'admin') {
              this.isLoading=true;              
              let expire=1000*60*60;
              this.setCookie('session','blablablablabla...', expire);
              this.setCookie('username',me.loginForm.user,expire);
              setTimeout(() => {
                me.$router.push('/main');
              }, 1500);
            } else {
              this.$message.error('入力されたアカウントまたはパスワードに誤りがあります。');
            }

            //TODO 20180708
            // this.$http.post('ver1.0.0/signin',this.loginForm)
            //   .then(resp=>{
            //     this.isLoading=false;
            //     if(resp.statusCode!=200){
            //       //login failed
            //       this.$message.error(resp.errMsg)
            //     }else{
            //       //login success
            //       let expire=1000*60*60*24*7;
            //       //Session
            //       this.setCookie('session',res.data.token,expire);
            //       //uuid 
            //       this.setCookie('u_uuid',res.data.u_uuid,expire);
            //       //username
            //       this.setCookie('username',res.data.username,expire);

            //       if(this.$route.query.redirect) {
            //       this.$router.push(this.$route.query.redirect);
            //       } else {
            //         this.$router.push('/main');
            //       }
            //     }
            //   })
          } else {
            console.log('error submit');
            return false;
          }
        });
        // if(me.username == "" || me.password == ""){
        // 	alert("请输入用户名或密码")
        // }else{
        // 	let data = {'username':me.username,'password':me.password}

        // 	me.$http.post('http://localhost/vueapi/index.php/Home/user/login',data).then((res)=>{
        // 		console.log(res)
        // 		if(res.data == -1){
        // 			me.tishi = "该用户不存在"
        // 			me.showTishi = true
        // 		}else if(res.data == 0){
        // 			me.tishi = "密码输入错误"
        // 			me.showTishi = true
        // 		}else if(res.data == 'admin'){
        // 			me.$router.push('/main')
        // 		}else{
        // 			me.tishi = "登录成功"
        // 			me.showTishi = true
        // 			setCookie('username',me.username,1000*60)
        // 			setTimeout(function(){
        // 				me.$router.push({path:'home',query:{id:1}})
        // 			}.bind(me),1000)
        // 		}
        // 	})
        // }
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
      register() {
        if (this.newUsername == "" || this.newPassword == "") {
          alert("请输入用户名或密码")
        } else {
          let data = {
            'username': this.newUsername,
            'password': this.newPassword
          }
          this.$http.post('http://localhost/vueapi/index.php/Home/user/register', data).then((res) => {
            console.log(res)
            if (res.data == "ok") {
              this.tishi = "注册成功"
              this.showTishi = true
              this.username = ''
              this.password = ''
              setTimeout(function () {
                this.showRegister = false
                this.showLogin = true
                this.showTishi = false
              }.bind(this), 1000)
            }
          })
        }
      },
      changePass(){
        this.$router.push('/changepass');
      }
    }
  }

</script>
