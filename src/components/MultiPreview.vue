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
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25920.030454909185!2d139.6916975305834!3d35.70152393211952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188d2059b7fd4b%3A0xec61c68fe232efd2!2z5Lic5Lqs6YO95paw5a6_5Yy6!5e0!3m2!1szh-CN!2sjp!4v1527139474539"
                class="preview" allowfullscreen></iframe>
            </el-col>
            <el-col :span="7" :offset="1">
              <h3 style="margin:0 0 15px 0;">
                <b>コメント：{{previewData.comment.length | comment}}</b>
              </h3>
              <div>
                <el-form :model="newComment" :rules="newCommentRules" ref="newComment" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="コメント" prop="text">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="newComment.text"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button plain type="primary" @click="addComment(index)">コメント追加</el-button>
                  </el-form-item>
                </el-form>
                <hr>
                <article v-for="(comment,idx) in previewData.comment" :key="idx" class="message is-info">
                  <div class="message-header" v-if="comment.user_nm!=user.user_nm">
                    <p>{{comment.user_nm}}</p>
                    <span>{{comment.update_date}}</span>
                  </div>
                  <div class="message-header" v-else style="background:#54677E">
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
                    <span>{{comment.update_date}}</span>
                  </div>
                  <div class="message-body">{{comment.text}}</div>
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
            <el-button v-if="previewIndex==index" type="primary" plain @click="previewIndex=-1">プレビューに戻る</el-button>
          </el-row>

          <el-row v-show="previewIndex==-1 || previewIndex==index">
            <el-col :span="16">
              <!-- demo -->
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25920.030454909185!2d139.6916975305834!3d35.70152393211952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188d2059b7fd4b%3A0xec61c68fe232efd2!2z5Lic5Lqs6YO95paw5a6_5Yy6!5e0!3m2!1szh-CN!2sjp!4v1527139474539"
                class="default" :class="{preview:previewIndex==index}" allowfullscreen></iframe>
            </el-col>
            <el-col :span="7" :offset="1">
              <h3 style="margin:0 0 15px 0;">
                <b>コメント：{{previewData.comment.length | comment}}</b>
              </h3>
              <div v-if="previewIndex==index">
                <el-form :model="newComment" :rules="newCommentRules" ref="newComment" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="コメント" prop="text">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="newComment.text"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button plain type="primary" @click="addComment(index)">コメント追加</el-button>
                  </el-form-item>
                </el-form>
                <hr>
                <article v-for="(comment,idx) in previewData.comment" :key="idx" class="message is-info">
                  <div class="message-header" v-if="comment.user_nm!=user.user_nm">
                    <p>{{comment.user_nm}}</p>
                    <span>{{comment.update_date}}</span>
                  </div>
                  <div class="message-header" v-else style="background:#54677E">
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
                    <span>{{comment.update_date}}</span>
                  </div>
                  <div class="message-body">{{comment.text}}</div>
                  <br>
                </article>
              </div>
              <div v-else>
                <article v-if="previewData.comment.length" class="message is-info">
                  <div class="message-header">
                    <p class="comment-header">{{previewData.comment[0].user_nm}}</p>
                    <span>{{previewData.comment[0].update_date}}</span>
                  </div>
                  <div class="message-body">{{previewData.comment[0].text}}</div>
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
  import evtBus from '../assets/evtBus'
  export default {
    data() {
      return {
        previewIndex: -1,
        previewDatas: {},
        newComment: {
          user_nm: this.user.user_nm,
          update_date: moment().format("YYYY-MM-DD"),
          text: '',
          delPop:false,
        },
        newCommentRules: {
          text: [{
            required: true,
            message: 'コメントは空きです。',
            trigger: 'blur'
          }],
        },
      }
    },
    props: ['user'],
    methods: {
      close() {
        this.$emit('close');
      },
      multiDownload() {
        console.log(this.previewDatas);
      },
      addComment(index) {
        let me =this
        me.$refs['newComment'][0].validate((valid) => {
          if (valid) {
            me.$emit('add-comment',me.previewDatas[index],me.newComment);
            me.$refs['newComment'][0].resetFields();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      delComment(index,idx){
        this.$emit('del-comment', this.previewDatas[index],idx);
      }
    },
    created() {
      let me = this;
      evtBus.$on('preview', data => {
        me.previewDatas = data;
      })
    },
    computed: {
      total() {
        return 0 || this.previewDatas.length
      },
    }
  }

</script>
