<template>
  <div class="login-form">
    <p v-if="firstLogin" style="color:red">ログインパスワードの変更してください</p>
    <h3>パスワード変更</h3>
    <el-form :model="changePassForm" status-icon :rules="changePassFormRules" ref="changePassForm" label-width="150px" class="demo-ruleForm">
      <el-form-item v-show="!firstLogin" label="ユーザーID" prop="user_id">
        <el-input id="username" v-model="changePassForm.user_id" clearable></el-input>
      </el-form-item>
      <el-form-item v-show="!firstLogin" label="旧パスワード" prop="oldPass">
        <el-input id="password" type="password" v-model="changePassForm.oldPass" clearable></el-input>
      </el-form-item>
      <el-form-item label="新パスワード" prop="newPass">
        <el-input id="newpass" type="password" v-model="changePassForm.newPass" clearable>
          <el-popover
            slot="suffix"
            placement="top-start"
            title="パスワードは以下の条件を満たす必要があります:"
            width="400"
            trigger="hover">
            <ul style="margin-left:20px;">
              <li>8～20文字で構成されている</li>
              <li>大文字、小文字、数字を含めている</li>
              <li>お使いいただける特殊文字は <b>~`!@#$%^&*?+=_-()</b> です</li>
            </ul>
            <i slot="reference" class="el-icon-question"></i>
          </el-popover>
        </el-input>
      </el-form-item>
      <el-form-item label="新パスワード確認" prop="newPassConfirm">
        <el-input id="newpass_confirm" type="password" :disabled="changePassForm.newPass==''" v-model="changePassForm.newPassConfirm" @keyup.enter.native="changePass('changePassForm')" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain type="primary" @click="changePass('changePassForm')">確定</el-button>
        <el-button plain @click="back">キャンセル</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<style scoped>
  h3,p {
    text-align: center;
  }

</style>


<script>
  import loading from '../components/Loading.vue'
  export default {
    data() {
      let len = /^[~`!@#$%^&*?+=_\(\)\w-]{8,20}$/;
      let lower=/^.*(?=.*[a-z]).*$/;
      let upper=/^.*(?=.*[A-Z]).*$/
      let num=/^.*(?=.*\d).*$/;
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('新しいパスワード入力してください'));
        } else if(!len.test(value)){
          callback(new Error('有効な文字で、8-20桁でお願いします'))
        }else if(!lower.test(value)){
          callback(new Error('小文字を含めてください'))
        }else if(!upper.test(value)){
          callback(new Error('大文字を含めてください'))
        }else if(!num.test(value)){
          callback(new Error('数字を含めてください'))
        }else {
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
        firstLogin:false,
        changePassForm: {
          user_id: '',
          oldPass:'',
          newPass:'',
          newPassConfirm:''
        },
        changePassFormRules:{
          user_id: [{
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
            required: true,
            validator:validatePass,
            trigger:'blur'
          }],
          newPassConfirm:[{
            required: true,
            validator:validatePass2,
            trigger:'blur'
          }]
        }
      }
    },
    mounted() {
      this.firstLogin=this.$route.params.firstLogin;
      if (this.firstLogin) {
        this.changePassForm.user_id=this.$route.params.user_id;
        this.changePassForm.oldPass=this.$route.params.password;
      }

      // if(getCookie('username')){
      // 	this.$router.push('/main')
      // }
    },
    methods: {
      changePass(formName) {
        let me = this;
        me.$refs[formName].validate((valid) => {
          if (valid) {
            //TODO
            if (me.loginForm.user_id == 'admin' && me.loginForm.pass == 'admin') {
              me.$router.push('/main');
            } else {
              me.$message.error('入力されたアカウントまたはパスワードに誤りがあります。');
              return false;
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
        this.$router.push("/login");
      }
    }
  }

</script>
