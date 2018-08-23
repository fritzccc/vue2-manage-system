<template>
  <div class="error-page">
    <!-- <img src="../assets/pain.png" height="200px" width="200px"> -->
    <!-- <i class="far fa-meh"></i> -->
    <h2>申し訳ございません！</h2>
    <h4>システム管理者に連絡してください</h4>
    <p v-if="errmsg">エラー：{{errmsg}}</p>
    <span><a a href="javascript:void(0);" @click="backToLogin" class="warning">ログイン画面</a>へ遷移します</span>
  </div>
</template>
<style scoped>
  .fa-meh{
    font-size: 180px;
  }
  .warning{
    color: #e41a1a;
  }
  img{
    margin: auto 200px;
  }
  .err-icon,h2,h4,p {
    text-align: center;
  }

  .error-page {
    text-align: center;
    width: 600px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid rgba(99, 99, 99, .3);
  }

</style>


<script>
  export default {
    data() {
      return {
        errmsg:'',
        count:10,
        interval:0
      }
    },
    mounted() {
      this.errmsg = this.$route.params.errmsg;
      // this.interval = window.setInterval(() => {
      //   if (--this.count <= 0) {
      //     this.backToLogin();
      //   }
      // }, 1000);
    },
    methods:{
      backToLogin(){
        window.clearInterval(this.interval);
        this.clearAllCookies();
        this.$router.push("/login");
      }
    }
  }

</script>
