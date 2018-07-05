<template>
  <div>
    <el-col class="login-form" :span="8" :offset="8" style="width:480px;">
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
    </el-col>
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
        let me = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //TODO
            if (me.loginForm.user == 'admin' && me.loginForm.pass == 'admin') {
              me.$router.push('/main');
            } else {
              this.$message.error('入力されたアカウントまたはパスワードに誤りがあります。');
            }
          } else {
            console.log('error submit!!');
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
