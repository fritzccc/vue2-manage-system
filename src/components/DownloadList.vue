<template>
    <div>
        <nav class="panel">
            <p class="panel-heading">ダウンロードリスト
              <el-button class="dl-refresh" :loading="btn_loading" circle plain icon="el-icon-refresh" @click="getDownloadList"></el-button>
            </p>
            
            <div class="panel-block" style="display: block;">
                <p>ダウンロードファイルが出来るまで時間がかかる場合があります。</p>
                <p><el-button class="dl-refresh mini" circle plain icon="el-icon-refresh"></el-button>でリストを更新してください。</p>
                <p>ダウンロード実行後24時間後にファイルは削除されます。</p>
            </div>
            <a v-for="link in downloadList"  :key="link.id" :href="link.url" class="panel-block">
                {{link.filename}}
            </a>
        </nav>
    </div>
</template>
<style scoped>
.dl-refresh{
  margin-left: 5px;
  font-size: 24px;
}
.el-button.is-circle{
  padding: 6px
}
.mini{
  cursor:text;
  margin: 0px;
  font-size: 14px;
}
</style>

<script>
export default {
  data(){
    return{
      btn_loading:false,
    }
  },
  props:['downloadList'],
  methods:{
    getDownloadList(){
      //AJAX
      this.btn_loading=true;
      setTimeout(()=>{
        this.btn_loading=false;        
      },1000)
    }
  }
}
</script>

