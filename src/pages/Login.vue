<template>
  <div>
    <el-col class="login-form" :span="8" :offset="8" style="min-width:400px;">
        <h3>ログイン</h3>
        <el-form :model="loginForm" status-icon :rules="loginFormRules" ref="loginForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="ユーザーID" prop="user">
            <el-input v-model.number="loginForm.user" @keyup.enter.native="login('loginForm')" clearable></el-input>
          </el-form-item>
          <el-form-item label="パスワード" prop="pass">
            <el-input type="password" v-model="loginForm.pass" @keyup.enter.native="login('loginForm')" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button plain type="primary" @click="login('loginForm')">ログイン</el-button>
            <el-button plain @click="changePass">パスワード変更</el-button>
          </el-form-item>
          <el-form-item>
            <router-link tag="a" to="/forgotpass">Forgot Password?</router-link>
          </el-form-item>
        </el-form>
    </el-col>

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
  // import { setCookie,getCookie } from '../../assets/js/cookie.js'
  export default {
    data() {
      return {
        loginForm: {
          user: '',
          pass: ''
        },
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
    mounted() {
      // if(getCookie('username')){
      // 	this.$router.push('/home')
      // }
    },
    methods: {
      login(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //TODO
            if (that.loginForm.user == 'admin' && that.loginForm.pass == 'admin') {
              that.$router.push('/main');
            } else {
              this.$message.error('入力されたアカウントまたはパスワードに誤りがあります。');
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        // if(that.username == "" || that.password == ""){
        // 	alert("请输入用户名或密码")
        // }else{
        // 	let data = {'username':that.username,'password':that.password}

        // 	that.$http.post('http://localhost/vueapi/index.php/Home/user/login',data).then((res)=>{
        // 		console.log(res)
        // 		if(res.data == -1){
        // 			that.tishi = "该用户不存在"
        // 			that.showTishi = true
        // 		}else if(res.data == 0){
        // 			that.tishi = "密码输入错误"
        // 			that.showTishi = true
        // 		}else if(res.data == 'admin'){
        // 			that.$router.push('/main')
        // 		}else{
        // 			that.tishi = "登录成功"
        // 			that.showTishi = true
        // 			setCookie('username',that.username,1000*60)
        // 			setTimeout(function(){
        // 				that.$router.push({path:'home',query:{id:1}})
        // 			}.bind(that),1000)
        // 		}
        // 	})
        // }
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
