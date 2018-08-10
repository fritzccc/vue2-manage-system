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
            <div v-for="data in downloadList"  :key="data.id" class="panel-block">
              <el-button type="text" @click="getDownloadUrl(data.download_file_nm)">
                  {{data.download_file_nm}}
              </el-button>
            </div>
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
.el-button--text{
  padding: 5px;
}
</style>

<script>
import evtBus from '../assets/evtBus'
export default {
  data(){
    return{
      btn_loading:false,
    }
  },
  props:['downloadList'],
  methods:{
    getDownloadUrl(doc_nm){
      let me = this;
      let items = {
        bucket_nm:evtBus.download_bucket_name,
        user_id:me.getCookie('user_id'),
        download_file_nm:doc_nm
      }

      evtBus.apigClient.reloApiVer100DownloadsTempurlPost({},{items:items},evtBus.headers)
        .then(res => {
          if(!res.data.error){
            //success
            let {downloadurl} = res.data.data;
            window.location.href = downloadurl;
            return true;
          }else{
            //get treedata failed
            this.$message.error('エラーが発生しました！'+res.data.error.message);
            console.log('getDownloadUrl -> ', res.data.error);
            me.$emit('error')
          }
        })
        .catch(err => {
          console.log("err: ", err);
          if(!err.expired){
            this.$message.error('通信エラーが発生しました！');
            me.$emit('error');
          }
        });
    },
    getDownloadList(){
      let me = this;
      me.btn_loading=true;
      me.$emit('download','downloadList');
      setTimeout(() => {
        me.btn_loading=false;
      }, 1000);
    }
  },
}
</script>

