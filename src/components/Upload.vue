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
            label-width="100px" class="demo-ruleForm">
            <h3 style="margin-top:20px;">第{{parseInt(index)+1}}件</h3>
            <el-form-item label="ファイル名" prop="fileinfo">
              <span>{{uploadForm.form[index].filename}} ({{uploadForm.form[index].filesize}})</span>
            </el-form-item>
            <el-row class="warning-area">
              <el-col :span="12">
                <el-form-item label="業務区分" prop="businessKbn">
                  <el-select v-model="uploadForm.form[index].businessKbn" placeholder="業務区分">
                    <el-option label="受託" value="jutaku"></el-option>
                    <el-option label="成約" value="seiyaku "></el-option>
                    <el-option label="工事" value="kouji"></el-option>
                    <el-option label="管理" value="kanri"></el-option>
                    <el-option label="解約" value="kaiyaku"></el-option>
                    <el-option label="指定なし" value=""></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="書類名" prop="docNm">
                  <el-select v-model="uploadForm.form[index].docNm" placeholder="書類名">
                    <el-option label="書類名１" value="書類名１"></el-option>
                    <el-option label="書類名２" value="書類名２"></el-option>
                    <el-option label="書類名３" value="書類名３"></el-option>
                    <el-option label="指定なし" value=""></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="オーナー" prop="ownerCd">
                  <el-input disabled v-model="uploadForm.form[index].ownerCd" placeholder="オーナー"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="入居者" prop="tenantNm">
                  <el-input disabled v-model="uploadForm.form[index].tenantNm" placeholder="入居者"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="物件" prop="estate">
              <el-input disabled v-model="uploadForm.form[index].estate" placeholder="物件"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="営業担当" prop="salesNm">
                  <el-input disabled v-model="uploadForm.form[index].salesNm" placeholder="営業担当者"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="管理担当" prop="manageNm">
                  <el-input disabled v-model="uploadForm.form[index].manageNm" placeholder="管理担当者"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="フリー" prop="freeFormat">
              <el-input v-model="uploadForm.form[index].freeFormat" placeholder="フリー"></el-input>
            </el-form-item>
            <!-- <el-form-item label="注釈" prop="text">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="注釈" v-model="uploadForm.form[index].comment[0].text"></el-input>
            </el-form-item> -->
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
  import evtBus from '../assets/evtBus';
  export default {
    data() {
      return {
        uploadForm:{
            checked:false,
            files:[],
            form:[]
        },
        uploadFormRules: {
          businessKbn: [{
            required: true,
            message: '業務区分未選択です',
            trigger: 'change'
          }],
          docNm: [{
            required: true,
            message: '書類名未選択です',
            trigger: 'change'
          }],
          // salesNm: [
          //     { required: true, message: '営業担当未入力です', trigger: 'blur' },
          // ],
          // manageNm: [
          //     { required: true, message: '管理担当未入力です', trigger: 'blur' }
          // ],
        },
      }
    },
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
            let filesize = me.uploadForm.form[i].filesize;
            let filetype = me.uploadForm.form[i].filetype;
            me.uploadForm.form[i] = JSON.parse(JSON.stringify(me.uploadForm.form[0]));
            me.uploadForm.form[i].filename = filename;
            me.uploadForm.form[i].filesize = filesize;
            me.uploadForm.form[i].filetype = filetype;
          }
        } else {
          for (let i = 1; i < me.uploadForm.files.length; i++) {
            me.uploadForm.form[i].comment = [''];
            me.uploadForm.form[i].freeFormat= '';
            me.uploadForm.form[i].service = '';
            me.uploadForm.form[i].docNm = '';
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
          me.$emit('upload',me.uploadForm);
        } else {
          console.log('submit failed');
          return false;
        }
        me.close(formName);
        me.resetForm(formName);
      },
    },
    computed:{
      total(){
        return this.uploadForm.files.length>1 ? 
          "(計"+this.uploadForm.files.length+"件)" :
          ""
      }
    },
    created(){
      evtBus.$on('upload-files',(files,currentTabName)=>{
        this.uploadForm.files=files;
        for (let i = 0; i < files.length; i++) {
          let filesize = (files[i].size / (1024 * 1024)).toFixed(1);
          filesize = (filesize == '0.0') ? '<0.1MB' : (filesize + 'MB');
          let form={
            docNm: '',
            filename:files[i].name,
            filesize:filesize,
            freeFormat: '',
            entryNm: '',
            entryDate: moment().format("YYYY-MM-DD"),
            ownerCd:'オーナーCD',
            estateCd:'物件CD',
            tenantNm:'入居者',
            salesNm: '営業担当',
            manageNm: '管理担当',
            businessKbn:currentTabName,
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
