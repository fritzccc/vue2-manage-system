<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card" style="width: 1500px;">
      <header class="modal-card-head">
        <img src="../assets/logo.png" width="140px" height="35px" style="margin-right:10px;">
        <p class="modal-card-title">{{previewData.filename | no_ext}}</p>
        <el-button type="primary">ダウンロード</el-button>
        <el-button type="danger" icon="el-icon-close" circle @click="close"></el-button>
      </header>
      <section class="modal-card-body" v-if="previewData.cmmt">
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
            <b>コメント：合計{{total}}件あります</b>
          </h3>
          <el-form :model="previewForm" :rules="previewFormRules" ref="previewForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="コメント" prop="text">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="previewForm.text"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="comment('previewForm')">コメント{{btnText}}</el-button>
            </el-form-item>
          </el-form>
          <hr>
          <article v-for="(cmmt,index) in previewData.cmmt" v-if="cmmt.uploader!=loginUser" :key="index" class="message is-info">
            <div class="message-header">
              <p>{{cmmt.uploader}}</p>
              <span>{{cmmt.updateDate}}</span>
            </div>
            <div class="message-body">{{cmmt.text}}</div>
            <br>
          </article>
        </el-col>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        previewForm: {
          uploader: '',
          updateDate: '',
          text: ''
        },
        previewFormRules: {
          text: [{
            required: true,
            message: 'コメントは空きです。',
            trigger: 'blur'
          }],
        },
        total: 0,
        btnText:''
      }
    },
    props: ['previewData', 'loginUser'],
    methods: {
      close(formName) {
        this.$emit('close');
      },
      comment(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('comment', this.previewForm);        
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
    mounted() {
      let that = this;
      that.total = that.previewData.cmmt.length;
      if (that.total > 0) {
        that.previewData.cmmt.forEach((cmmt, idx) => {
          if (cmmt.uploader == that.loginUser) {
            that.previewForm.text = cmmt.text;
            that.previewForm.uploader = cmmt.uploader;
          }
        });
      };
      that.btnText=(that.previewForm.text == '') ? '追加' : '修正';
    }
  }

</script>
