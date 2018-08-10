<template>
  <div>
    <div class="modal is-active">
      <!-- <div class="modal-background"></div> -->
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">アップロード{{total}}</p>
          <el-button type="danger" icon="el-icon-close" circle @click="close('uploadForm')"></el-button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <el-form v-for="(file,index) in uploadForm.files" :key="index" :model="uploadForm.form[index]" :rules="uploadFormRules" ref="uploadForm"
            label-width="115px"  class="demo-ruleForm">
            <h3 style="margin-top:20px;">第{{parseInt(index)+1}}件</h3>
            <el-form-item label="ファイル名" prop="fileinfo">
              <!-- <el-input disabled v-model="uploadForm.form[index].fileinfo"></el-input> -->
              <span>{{uploadForm.form[index].filename}} ({{uploadForm.form[index].file_size}}MB)</span>
            </el-form-item>
            <el-row class="warning-area">
              <el-form-item label="業務区分/書類" prop="business_doc">
                <el-cascader
                  style="width:285px"
                  clearable
                  change-on-select
                  v-model="uploadForm.form[index].business_doc"
                  :options="businessKbn"
                  @change="handleChange(index)">
                </el-cascader>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="オーナーCD" prop="owner_cd">
                  <el-input disabled v-model="uploadForm.form[index].owner_cd"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="入居者名" prop="tenant_nm">
                  <el-input disabled v-model="uploadForm.form[index].tenant_nm"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="物件名" prop="estate_nm">
              <el-input disabled v-model="uploadForm.form[index].estate_nm"></el-input>
            </el-form-item>
            <el-form-item label="フリー" prop="free_format">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="uploadForm.form[index].free_format" placeholder="フリー"></el-input>
            </el-form-item>
            <el-form-item v-if="index==0 && uploadForm.files.length>1">
              <el-checkbox v-model="uploadForm.checked" label="2つ目以降も同じ内容をセット" name="type" @change="copySettings"></el-checkbox>
            </el-form-item>
            <hr>
            <br>
          </el-form>
        </section>
        <footer class="modal-card-foot">
          <el-button type="primary" @click="uploadFiles('uploadForm')">追加</el-button>
          <el-button @click="resetForm('uploadForm')">リセット</el-button>
        </footer>
      </div>
    </div>
  </div>
</template>


<style scoped>
  .el-form-item{
    margin-bottom:10px;
  }
  .warning-area .el-form-item{
    margin-bottom: 20px;
  }
  h3{
    margin-top: 0;
  }
</style>

<script>
  import Vue from 'vue'
  import moment from 'moment'
  import evtBus from '@/assets/evtBus'
  
  export default {
    data() {
      let docValidator = (rule, value, callback) => {
        if (value.length==0) {
          callback(new Error('業務区分/書類未選択です'));
        } else if (value.length==1){
          callback(new Error('書類未選択です'));
        }
      };
      return {
        uploadForm:{
            checked:false,
            files:[],
            form:[]
        },
        uploadFormRules: {
          business_doc: [{
            required: true,
            validator:docValidator,
            trigger: 'change'
          }]
        },
      }
    },
    props:['businessKbn','authPtn','currentTree'],
    methods: {
      close(formName) {
        this.resetForm(formName);
        this.uploadForm.form.forEach(form => {
          form.filename = '';
        })
        this.$emit('close');
      },
      copySettings() {
        let me = this;
        if (me.uploadForm.checked) {
          for (let i = 1; i < me.uploadForm.files.length; i++) {
            let filename = me.uploadForm.form[i].filename;
            let file_nm = me.uploadForm.form[0].file_nm.split('_');
            file_nm[file_nm.length-1]=i+1;
            file_nm = file_nm.join('_');
            me.uploadForm.form[i].business_doc = me.uploadForm.form[0].business_doc;
            me.uploadForm.form[i].business_kbn=me.uploadForm.form[i].business_doc[0];
            me.uploadForm.form[i].doc_cd=me.uploadForm.form[i].business_doc[1];
            me.uploadForm.form[i].free_format = me.uploadForm.form[0].free_format;
            me.uploadForm.form[i].doc_nm = me.uploadForm.form[0].doc_nm;
            me.uploadForm.form[i].file_nm = file_nm+'.'+filename.split('.').pop();
          }
        } else {
          for (let i = 1; i < me.uploadForm.files.length; i++) {
            me.uploadForm.form[i].free_format= '';
            me.uploadForm.form[i].doc_cd = 0;
            me.uploadForm.form[i].doc_cd='';
            me.uploadForm.form[i].business_kbn= '';
            me.uploadForm.form[i].business_doc=[];
            me.uploadForm.form[i].file_nm = me.uploadForm.form[i].filename;
          }
        }
      },
      resetForm(formName) {
        this.$refs[formName].forEach(formData => {
          formData.resetFields();
        });
      },
      uploadFiles(formName) {
        let me = this;
        let checkflag = true;
        me.$refs[formName].forEach((formData, idx) => {
          formData.validate(valid => {
            if (!valid) checkflag = false;
          })
        });
        if (checkflag) {
          me.$emit('upload-files',{
            forms:me.uploadForm.form,
            files:me.uploadForm.files  
          });
          me.close(formName);
          me.resetForm(formName);
        } else {
          me.$message.warning('追加できませんでした！');
          console.log('submit failed');
          return false;
        }
      },
      handleChange(index){
        this.uploadForm.checked = false
        this.uploadForm.form[index].business_kbn=this.uploadForm.form[index].business_doc[0];
        this.uploadForm.form[index].doc_cd=this.uploadForm.form[index].business_doc[1];
        let {owner_cd,estate_no,tenant_cd,doc_cd}= this.uploadForm.form[index];
        let nowTime=moment().format('YYMMDDHHmmss');
        let doc_nm='';
        this.businessKbn.forEach(data=>{
          data.children.forEach(d=>{
            if (d.value==doc_cd)  doc_nm=d.label;
          })
        })
        let ext = this.uploadForm.form[index].file_nm.split('.').pop();
        this.uploadForm.form[index].file_nm=[owner_cd,estate_no,tenant_cd,doc_cd,doc_nm,nowTime,parseInt(index)+1].join('_')+'.'+ext;
      }
    },
    computed:{
      total(){
        return this.uploadForm.files.length>1 ? 
          "(計"+this.uploadForm.files.length+"件)" :
          ""
      }
    },
    mounted(){
      //TODO
      evtBus.$on('files-dropped',(files,currentTabName,folder_id)=>{
        let {owner_cd,estate_no,estate_nm,tenant_cd,tenant_nm}=this.currentTree;
        this.uploadForm.files=files;
        console.log("files:", files);
        console.log('​mounted -> upload', );
        for (let i = 0; i < files.length; i++) {
          let filesize = (files[i].size / (1024 * 1024)).toFixed(1);
          filesize = (filesize == '0.0') ? '0.1' : filesize;
          let form={
            doc_cd: 0,
            filename:files[i].name,
            file_nm:files[i].name,
            file_seq:i+1,
            file_size:filesize,
            free_format: '',
            file_entry_user: unescape(this.getCookie('user_nm')),
            file_entry_date: moment().format("YYYY-MM-DD"),
            folder_id:folder_id,
            owner_cd:owner_cd,
            estate_no:estate_no,
            estate_nm:estate_nm,
            tenant_cd:tenant_cd,
            tenant_nm:tenant_nm,
            business_doc:[currentTabName,],
            isNew:true,
          }
          this.uploadForm.form.push(form);
          Vue.nextTick(()=>{
            evtBus.$off('files-dropped')
          });
        }
      })
      
      console.log('upload -> mounted', );
    },
  }

</script>
