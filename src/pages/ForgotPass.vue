<template>
  <div class="login-form">
    <h3>パスワードリセット</h3>
    <el-form :model="resetPassForm" status-icon ref="resetPassForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="ユーザーID" prop="user_id" 
      :rules="[{
        required: true, message: 'ユーザーIDを入力してください', trigger: 'blur'
      }]">
        <el-input class="input-form" v-model="resetPassForm.user_id" @keyup.enter.native="resetPass('resetPassForm')" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain size="small" type="primary" @click="resetPass('resetPassForm')">リセット</el-button>
        <el-button plain size="small" @click="back">キャンセル</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped>
  h3 {
    text-align: center;
  }
  .input-form{
    width: 90%;
  }

</style>

<script>
  import evtBus from '@/assets/evtBus';
  export default {
    data() {
      return {
        resetPassForm: {
          user_id: '',
        },
      }
    },
    mounted() {
      if(!evtBus.apigClient){
        evtBus.apigClient = apigClientFactory.newClient(evtBus.defaultConfig);
      }
    },
    methods: {
      resetPass(formName) {
        let me = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let items={
              user_id:me.resetPassForm.user_id
            };
            evtBus.apigClient.reloApiVer100ForgotpassPost({},{items:items})
              .then(res => {
                if(!res.data.error){
                  me.$message.success('パスワードをリセットしました！');
                  setTimeout(() => {
                    me.$router.push('/login');
                  }, 2000);
                }else if(res.data.error.code==204){
                  //incorrect user&pass
                  me.$message.error('入力されたアカウントは存在しません！');
                  return false;
                }else{
                  me.$message.error('エラーが発生しました！'+res.data.error.message);
                  setTimeout(() => {
                    me.$router.push('/error').bind(me);
                  }, 2000);
                }
              })
              .catch(err => {
                me.$message.error('通信エラーが発生しました！');
                console.log("err: ", err);
              });
          } else {
            return false;
          }
        });
      },
      back(){
        this.$router.push("/login");
      }
    }
  }

</script>
