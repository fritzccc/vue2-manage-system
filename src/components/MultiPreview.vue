<template>
  <div class="modal is-active">
    <!-- <div class="modal-background"></div> -->
    <div class="modal-card" style="width: 1500px;">
      <header class="modal-card-head">
        <img src="../assets/logo.png" width="140px" height="35px" style="margin-right:10px;">
        <p class="modal-card-title">一括プレビュー（計{{total}}件）</p>
        <el-button type="primary" @click="multiDownload">一括ダウンロード</el-button>
        <el-button type="danger" icon="el-icon-close" circle @click="close"></el-button>
      </header>
      <section class="modal-card-body">
        <!-- Preview File  -->
        <div
          v-for="(previewData,index) in previewDatas" 
          :key=index
          style="border-bottom:2px solid #d4dde4;">
          <el-row>
            <el-button type="text" @click="previewFile(index)">
              <h3>
                <b>第{{index+1}}件：{{previewData.docNm | no_ext}}</b>
              </h3>
            </el-button>
          </el-row>
          <el-collapse-transition>
          <el-row v-show="previewIndex==-1 || previewIndex==index">
            <el-col :span="16">
            <!-- demo -->
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25920.030454909185!2d139.6916975305834!3d35.70152393211952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188d2059b7fd4b%3A0xec61c68fe232efd2!2z5Lic5Lqs6YO95paw5a6_5Yy6!5e0!3m2!1szh-CN!2sjp!4v1527139474539"
                class="default" :class="{preview:index==previewIndex}" allowfullscreen></iframe>
          </el-col>
          <el-col :span="7" :offset="1">
            <h3>
              <b>コメント：{{previewData.comment.length | comment}}</b>
            </h3>
            <article v-if="previewData.comment.length" class="message is-info">
              <div class="message-header">
                <p>{{previewData.comment[0].userNm}}</p>
                <span>{{previewData.comment[0].updateDate}}</span>
              </div>
              <div class="message-body">{{previewData.comment[0].text}}</div>
            </article>
          </el-col>
          </el-row>
          </el-collapse-transition>
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped>
  iframe{
    margin-bottom: 20px;
  }
  .default{
    width:100%; 
    border:0;
    height:400px;
    transition-duration: 1s;
    -webkit-transition-duration:1s;
  }
  .preview{
    transition-duration: 1s;
    -webkit-transition-duration:1s;
    height: 800px;
  }

  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>

<script>
  import Vue from 'vue'
  import evtBus from '../assets/evtBus'
  export default {
    data() {
      return {
        previewIndex:-1,
        previewDatas:{},
      }
    },
    props: ['loginUser'],
    methods: {
      close() {
        this.$emit('close');
      },
      previewFile(index){
        // let me=this;
        // me.$emit('preview');
        // Vue.nextTick(()=>evtBus.$emit("preview",this.previewDatas[index],true));
        this.previewIndex=index;
      },
      multiDownload(){
        console.log(this.previewDatas);
      }
    },
    created(){
      let me = this;
      evtBus.$on('multi-preview',data=>{
        me.previewDatas=data;
      })
    },
    computed:{
      total(){
        return 0||this.previewDatas.length
      },
    }
  }

</script>
