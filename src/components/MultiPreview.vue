<template>
  <div class="modal is-active">
    <!-- <div class="modal-background"></div> -->
      <div v-if="previewDatas.length==1" class="modal-card" style="width: 1500px;">
      <header class="modal-card-head">
        <img src="../assets/logo.png" width="140px" height="35px" style="margin-right:10px;">
        <p class="modal-card-title">{{previewDatas[0].doc_nm | no_ext}}</p>
        <el-button type="primary" @click="multiDownload">ダウンロード</el-button>
        <el-button type="danger" icon="el-icon-close" circle @click="close"></el-button>
      </header>
      <section class="modal-card-body">
        <div v-for="(previewData,index) in previewDatas" :key=index style="border-bottom:2px solid #d4dde4;">
          <el-row>
              <h3>
                <b>{{previewData.doc_nm | no_ext}}</b>
              </h3>
          </el-row>
          <el-row>
            <el-col :span="16">
              <!-- demo -->
              <iframe :src="previewData.url" class="preview" allowfullscreen></iframe>
            </el-col>
            <el-col :span="7" :offset="1">
              <h3 style="margin:0 0 15px 0;">
                <b>コメント：{{previewData.comment.length | comment}}</b>
              </h3>
              <div>
                <el-form :model="newComment" :rules="newCommentRules" ref="newComment" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="コメント" prop="comment"
                    :rules="{
                      required: true, message: 'コメントを入力してください', trigger: 'blur'
                    }"
                  >
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="newComment.coment"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button plain type="primary" @click="addComment(index)">コメント追加</el-button>
                  </el-form-item>
                </el-form>
                <hr>
                <article v-for="(comment,idx) in previewData.comment" :key="idx" class="message is-info">
                  <div class="message-header" v-if="comment.user_id!=user_id">
                    <p>{{comment.user_nm}}</p>
                    <span>{{comment.entry_date}}</span>
                  </div>
                  <div class="message-header" v-else style="background:#54677E">
                    <p class="comment-header">自分
                      <el-popover placement="top" width="160" v-model="comment.delPop">
                        <p>このコメントを削除してよろしいですか？</p>
                        <div style="text-align: right; margin: 0">
                          <el-button size="mini" type="text" @click="comment.delPop=false">キャンセル</el-button>
                          <el-button type="primary" size="mini" @click="delComment(index,idx)">確定</el-button>
                        </div>
                        <el-button slot="reference" size="mini" type="danger" style="padding: 6px 12px;">削除</el-button>
                      </el-popover>
                    </p>
                    <span>{{comment.entry_date}}</span>
                  </div>
                  <div class="message-body">{{comment.coment}}</div>
                  <br>
                </article>
              </div>
            </el-col>
          </el-row>
        </div>
      </section>
    </div>
    <div v-if="previewDatas.length>1" class="modal-card" style="width: 1500px;">
      <header class="modal-card-head">
        <img src="../assets/logo.png" width="140px" height="35px" style="margin-right:10px;">
        <p class="modal-card-title">プレビュー（計{{total}}件）</p>
        <el-button type="primary" @click="multiDownload">一括ダウンロード</el-button>
        <el-button type="danger" icon="el-icon-close" circle @click="close"></el-button>
      </header>
      <section class="modal-card-body">
        <!-- Preview File  -->
        <div v-for="(previewData,index) in previewDatas" :key=index style="border-bottom:2px solid #d4dde4;">
          <el-row>
            <el-button type="text" @click="previewIndex = index" style="padding:0;">
              <h3>
                <b>第{{index+1}}件：{{previewData.doc_nm | no_ext}}</b>
              </h3>
            </el-button>
            <el-button v-if="previewIndex==index" type="primary" plain @click="backToPreview">プレビューに戻る</el-button>
          </el-row>

          <el-row v-show="previewIndex==-1 || previewIndex==index">
            <el-col :span="16">
              <!-- demo -->
              <iframe :src="previewData.url" class="default" :class="{preview:previewIndex==index}" allowfullscreen></iframe>
            </el-col>
            <el-col :span="7" :offset="1">
              <h3 style="margin:0 0 15px 0;">
                <b>コメント：{{previewData.comment.length | comment}}</b>
              </h3>
              <div v-if="previewIndex==index">
                <el-form :model="newComment" ref="newComment" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="コメント" prop="comment"
                    :rules="{
                      required: true, message: 'コメントを入力してください', trigger: 'blur'
                    }"
                  >
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="newComment.coment"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button plain type="primary" @click="addComment(index)">コメント追加</el-button>
                  </el-form-item>
                </el-form>
                <hr>
                <article v-for="(comment,idx) in previewData.comment" :key="idx" class="message is-info">
                  <div class="message-header" v-if="comment.user_id!=user_id">
                    <p>{{comment.user_nm}}</p>
                    <span>{{comment.entry_date}}</span>
                  </div>
                  <div class="message-header" v-else style="background:#54677E;">
                    <p class="comment-header">自分
                      <el-popover placement="top" width="160" v-model="comment.delPop">
                        <p>このコメントを削除してよろしいですか？</p>
                        <div style="text-align: right; margin: 0">
                          <el-button size="mini" type="text" @click="comment.delPop=false">キャンセル</el-button>
                          <el-button type="primary" size="mini" @click="delComment(index,idx)">確定</el-button>
                        </div>
                        <el-button slot="reference" type="danger" style="padding: 6px 12px;">削除</el-button>
                      </el-popover>
                    </p>
                    <span>{{comment.entry_date}}</span>
                  </div>
                  <div class="message-body">{{comment.coment}}</div>
                  <br>
                </article>
              </div>
              <div v-else>
                <article v-if="previewData.comment.length" class="message is-info">
                  <div class="message-header">
                    <p class="comment-header">{{previewData.comment[0].user_nm}}</p>
                    <span>{{previewData.comment[0].entry_date}}</span>
                  </div>
                  <div class="message-body">{{previewData.comment[0].coment}}</div>
                </article>
              </div>
            </el-col>
          </el-row>
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped>
  iframe {
    margin-bottom: 20px;
  }

  .comment-header{
    margin: 10px 0;
  }
  .default {
    width: 100%;
    border: 0;
    height: 300px;
  }

  .preview {
    width: 100%;
    border: 0;
    height: 900px;
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
  import moment from "moment";
  import evtBus from '@/assets/evtBus'
  export default {
    data() {
      return {
        previewIndex: -1,
        previewDatas: {},
        newComment: {
          file_id:'',
          user_id: this.getCookie('user_id'),
          comment: '',
          delPop:false,
        },
      }
    },
    methods: {
      backToPreview(){
        this.previewIndex=-1;
        this.newComment.comment= '';
      },
      close() {
        this.$emit('close');
      },
      multiDownload() {
        console.log(this.previewDatas);
      },
      addComment(index) {
        let me =this
        me.newComment.file_id=me.previewDatas[index].file_id;
        me.$refs['newComment'][0].validate((valid) => {
          if (valid) {
            me.newComment.file_id=me.previewFileId[index].file_id;
            let items=newComment;
            evtBus.apigClient.invokeApi({},'ver1.0.0/files/comments','POST',{headers:evtBus.headers},{items:items})
              .then(res => {
                if(!res.error){
                  //success
                  if(res.data.result_flg==0){
                    //add comment success
                    me.previewDatas[index].comment.unshift(JSON.parse(JSON.stringify(newComment)));
                    //TODO if need to refresh the table tooltip comment
                    // me.$emit('addComment',newComment);
                    me.$refs['newComment'][0].resetFields();
                    me.$message.success('コメント追加しました！');
                    return true;
                  }else{
                    //add comment failed
                    me.$message.error('コメント追加は失敗しました！もう一度試してください！');
                    me.$refs['newComment'][0].resetFields();
                    return false;
                  }
                }else{
                  //failed
                  me.$message.error('エラーが発生しました！'+res.error.message);
                  console.log('​deleteFiles -> res.error', res.error);
                }
              })
              .catch(err => {
                me.$message.error('通信エラーが発生しました！');
                console.log("err: ", err);
              });
            me.$refs['newComment'][0].resetFields();
            me.error();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      delComment(index,idx){
        let items=this.previewDatas[index].comment[idx];
        evtBus.apigClient.invokeApi({},'ver1.0.0/files/comments','POST',{headers:evtBus.headers},{items:items})
          .then(res => {
            if(!res.error){
              //success
              if(res.data.result_flg==0){
                //del comment success
                me.previewDatas[index].comment.splice(idx, 1);
                //TODO if need to refresh the table tooltip comment
                // me.$emit('delComment',newComment);
                me.$message.success('コメント削除しました！');
                return true;
              }else{
                //del comment failed
                me.$message.error('コメント削除は失敗しました！もう一度試してください！');
                me.$refs['newComment'][0].resetFields();
                return false;
              }
            }else{
              //failed
              me.$message.error('エラーが発生しました！'+res.error.message);
              console.log('​deleteFiles -> res.error', res.error);
            }
          })
          .catch(err => {
            me.$message.error('通信エラーが発生しました！');
            console.log("err: ", err);
          });
        // this.$emit('del-comment', this.previewFileId[index].file_id,idx);
      }
    },
    created() {
      let me = this;
      evtBus.$on('preview', items => {
        me.previewFileId=items;
        evtBus.apigClient.invokeApi({},'ver1.0.0/files/preview','POST',{headers:evtBus.headers},{items:items})
          .then(res => {
            if(!res.error){
              //success
              let temp=JSON.parse(JSON.stringify(res.data));
              //add delPop prop
              temp.forEach((ele)=>{
                ele.comment.forEach(data => {
                  data.delPop=false;
                });
              });
              me.previewDatas=temp;
              return true;
            }else{
              //get treedata failed
              this.$message.error('エラーが発生しました！'+res.error.message);
              console.log('preview created -> res.error', res.error);
            }
          })
          .catch(err => {
            this.$message.error('通信エラーが発生しました！');
            console.log("preview created err: ", err);
          });
        this.$emit('error');
      })
    },
    computed: {
      total() {
        return 0 || this.previewDatas.length
      },
    }
  }
</script>

