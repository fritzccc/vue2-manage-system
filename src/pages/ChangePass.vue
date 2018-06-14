<template>
  <div>
    <el-col class="change-pass-form" :span="8" :offset="8" style="width:480px;">
        <h3>パスワード変更</h3>
        <el-form :model="changePassForm" status-icon :rules="changePassFormRules" ref="changePassForm" label-width="150px" class="demo-ruleForm">
          <el-form-item label="ユーザーID" prop="user">
            <el-input v-model="changePassForm.user" @keyup.enter.native="changePass('changePassForm')" clearable></el-input>
          </el-form-item>
          <el-form-item label="旧パスワード" prop="oldPass">
            <el-input type="password" v-model="changePassForm.oldPass" @keyup.enter.native="changePass('changePassForm')" clearable></el-input>
          </el-form-item>
          <el-form-item label="新パスワード" prop="newPass">
            <el-input type="password" v-model="changePassForm.newPass" @keyup.enter.native="changePass('changePassForm')" clearable></el-input>
          </el-form-item>
          <el-form-item label="新パスワード確認" prop="newPassConfirm">
            <el-input type="password" v-model="changePassForm.newPassConfirm" @keyup.enter.native="changePass('changePassForm')" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button plain type="primary" @click="changePass('changePassForm')">確定</el-button>
            <el-button plain @click="back">キャンセル</el-button>
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

  .change-pass-form {
    margin-top: 50px;
    padding: 20px;
    border: 1px solid rgba(99, 99, 99, .3);
  }

</style>


<script>
  // import { setCookie,getCookie } from '../../assets/js/cookie.js'
  export default {
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('新しいパスワード入力してください'));
        } else {
          if (this.changePassForm.newPassConfirm !== '') {
            this.$refs.changePassForm.validateField('newPassConfirm');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('もう一度新しいパスワード入力してください'));
        } else if (value !== this.changePassForm.newPass) {
          callback(new Error('新しいパスワード一致しませんでした'));
        } else {
          callback();
        }
      };
      return {
        changePassForm: {
          user: '',
          oldPass:'',
          newPass:'',
          newPassConfirm:''
        },
        changePassFormRules:{
          user: [{
            required: true,
            message: 'ユーザーID未入力です',
            trigger: 'blur'
          }, ],
          oldPass: [{
            required: true,
            message: '旧パスワード未入力です',
            trigger: 'blur'
          }],
          newPass:[{
            validator:validatePass,
            trigger:'blur'
          }],
          newPassConfirm:[{
            validator:validatePass2,
            trigger:'blur'
          }]
        }
      }
    },
    mounted() {
      // if(getCookie('username')){
      // 	this.$router.push('/home')
      // }
    },
    methods: {
      changePass(formName) {
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
        this.$router.back();
      }
    }
  }

</script>
