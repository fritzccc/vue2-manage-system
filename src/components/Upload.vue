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
                  :options="businessKbn"
                  v-model="uploadForm.form[index].business_doc"
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
                <el-form-item label="入居者CD" prop="tenant_cd">
                  <el-input disabled v-model="uploadForm.form[index].tenant_cd"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="物件No." prop="estate_no">
              <el-input disabled v-model="uploadForm.form[index].estate_no"></el-input>
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
  import moment from 'moment'
  import evtBus from '@/assets/evtBus';
  export default {
    data() {
      return {
        uploadForm:{
            checked:false,
            files:[],
            form:[]
        },
        uploadFormRules: {
          business_doc: [{
            required: true,
            message: '業務区分/書類未選択です',
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
            let filesize = me.uploadForm.form[i].file_size;
            let filetype = me.uploadForm.form[i].filetype;
            me.uploadForm.form[i] = JSON.parse(JSON.stringify(me.uploadForm.form[0]));
            me.uploadForm.form[i].filename = filename;
            me.uploadForm.form[i].file_size = filesize;
            me.uploadForm.form[i].filetype = filetype;
          }
        } else {
          for (let i = 1; i < me.uploadForm.files.length; i++) {
            me.uploadForm.form[i].free_format= '';
            me.uploadForm.form[i].doc_cd = '';
            me.uploadForm.form[i].business_kbn= '';
            me.uploadForm.form[i].business_doc=[];
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
          //TODO AJAX
          me.$emit('upload',me.uploadForm);
        } else {
          console.log('submit failed');
          return false;
        }
        me.close(formName);
        me.resetForm(formName);
      },
      handleChange(index){
        this.uploadForm.form[index].business_kbn=this.uploadForm.form[index].business_doc[0];
        this.uploadForm.form[index].doc_cd=this.uploadForm.form[index].business_doc[1];
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
      evtBus.$on('upload-files',(files,currentTabName,folder_id)=>{
        this.uploadForm.files=files;
        
        console.log('​mounted -> upload', );
        for (let i = 0; i < files.length; i++) {
          let filesize = (files[i].size / (1024 * 1024)).toFixed(1);
          filesize = (filesize == '0.0') ? '0.1' : filesize;
          let form={
            doc_cd: 0,
            filename:files[i].name,
            file_size:filesize,
            free_format: '',
            file_entry_user: '',
            file_entry_date: moment().format("YYYY-MM-DD"),
            folder_id:folder_id,
            owner_cd:this.currentTree.owner_cd,
            estate_no:this.currentTree.estate_no,
            tenant_cd:this.currentTree.tenant_cd,
            business_doc:[],
            business_kbn:currentTabName,
            isNew:true,
            filetype:files[i].name.split(".")[1],
            comment:[]
          }
          this.uploadForm.form.push(form);
        }
      })
    }
  }

</script>
