<template>
  <div>
    <el-col class="reset-pass-form" :span="8" :offset="8" style="min-width:400px;">
        <h3>パスワードリセット</h3>
        <el-form :model="resetPassForm" status-icon ref="resetPassForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="ユーザーID" prop="user">
            <el-input v-model.number="resetPassForm.user" @keyup.enter.native="resetPass('resetPassForm')" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button plain type="primary" @click="resetPass('resetPassForm')">リセット</el-button>
            <el-button plain @click="back">キャンセル</el-button>
          </el-form-item>
          <el-form-item>
            <a href="#">Forgot Password?</a>
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

  .reset-pass-form {
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
        resetPassForm: {
          user: '',
        },
      }
    },
    mounted() {
      // if(getCookie('username')){
      // 	this.$router.push('/home')
      // }
    },
    methods: {
      resetPass(formName) {
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
      back(){
        this.$router.push("/");
      }
    }
  }

</script>
