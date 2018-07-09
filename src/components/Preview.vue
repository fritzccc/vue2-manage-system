<template>
  <div class="modal is-active">
    <!-- <div class="modal-background"></div> -->
    <div class="modal-card" style="width: 1500px;">
      <header class="modal-card-head">
        <img src="../assets/logo.png" width="140px" height="35px" style="margin-right:10px;">
        <p class="modal-card-title">{{previewData.docNm | no_ext}}</p>
        <el-button type="primary">ダウンロード</el-button>
        <el-button type="danger" icon="el-icon-close" circle @click="close"></el-button>
      </header>
      <section class="modal-card-body">
        <!-- Preview File  -->
        <el-col :span="16">
          <h3>
            <b>File Preview Sample</b>
          </h3>
          <!-- demo -->
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25920.030454909185!2d139.6916975305834!3d35.70152393211952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188d2059b7fd4b%3A0xec61c68fe232efd2!2z5Lic5Lqs6YO95paw5a6_5Yy6!5e0!3m2!1szh-CN!2sjp!4v1527139474539"
            width="100%" height="900px" frameborder="0" style="border:0" allowfullscreen></iframe>
        </el-col>
        <el-col :span="7" :offset="1">
          <h3>
            <b>コメント：{{total|comment}}</b>
          </h3>
          <el-form :model="newComment" :rules="newCommentRules" ref="newComment" label-width="100px" class="demo-ruleForm">
            <el-form-item label="コメント" prop="text">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="newComment.text"></el-input>
            </el-form-item>
            <el-form-item >
              <el-button plain type="primary" @click="addComment('newComment')">コメント追加</el-button>
            </el-form-item>
          </el-form>

          <hr>
          <article v-for="(comment,index) in previewData.comment" :key="index" class="message is-info">
            <div class="message-header" v-if="comment.userNm!=user.userNm">
              <p>{{comment.userNm}}</p>
              <span>{{comment.updateDate}}</span>
            </div>
            <div class="message-header" v-else style="background:#54677E">
              <p>自分
                <el-popover placement="top" width="160" v-model="comment.delPop">
                  <p>このコメントを削除してよろしいですか？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="comment.delPop=false">キャンセル</el-button>
                    <el-button type="primary" size="mini" @click="delComment(index)">確定</el-button>
                  </div>
                  <el-button slot="reference" type="danger" style="padding: 6px 12px;">削除</el-button>
                </el-popover>
              </p>
              <span>{{comment.updateDate}}</span>
            </div>
            <div class="message-body">{{comment.text}}</div>
            <br>
          </article>
        </el-col>
      </section>
    </div>

  </div>
</template>

<script>
  import moment from "moment";
  import evtBus from '../assets/evtBus'
  export default {
    data() {
      return {
        total: 0,
        isFromMultiPreview:false,
        previewData:{},
        newComment: {
          userNm: this.user.userNm,
          updateDate: moment().format("YYYY-MM-DD"),
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
    props: ['user.userNm'],
    methods: {
      close(formName) {
        if(this.isFromMultiPreview){
          this.$emit('close',true);
        }else{
          this.$emit('close',false);
        }
        this.$destroy;
      },
      test(index){
        this.previewData.comment[index].delPop=false;
        console.log('comment: ', this.previewData.comment[index]);
      },
      addComment(formName) {
        let me =this
        me.$refs[formName].validate((valid) => {
          if (valid) {
            me.$emit('add-comment',me.previewData,me.newComment);
            me.newComment.text=''
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      delComment(index){
        this.$emit('del-comment', this.previewData,index);
      }
    },
    created() {
      let me = this;
      evtBus.$on('preview',(data,fromMultiPreview)=>{
        me.total=data.comment.length;
        me.isFromMultiPreview=fromMultiPreview ? true:false;
        me.previewData=JSON.parse(JSON.stringify(data));
        me.previewData.comment.forEach(comment=>{
          comment.delPop=false;
        })
      })
    },
  }

</script>
