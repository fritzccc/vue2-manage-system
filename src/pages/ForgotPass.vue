<template>
  <div class="login-form">
    <h3>パスワードリセット</h3>
    <el-form :model="resetPassForm" status-icon ref="resetPassForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="ユーザーID" prop="user">
        <el-input v-model.number="resetPassForm.username" @keyup.enter.native="resetPass('resetPassForm')" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain type="primary" @click="resetPass('resetPassForm')">リセット</el-button>
        <el-button plain @click="back">キャンセル</el-button>
      </el-form-item>
    </el-form>

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

</style>


<script>
  import evtBus from '../assets/evtBus';
  import loading from '@/components/Loading.vue'
  export default {
    data() {
      return {
        resetPassForm: {
          username: '',
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
      back(){
        this.$router.push("/");
      }
    }
  }

</script>
