<template>
  <div>
    <div class="modal is-active">
      <!-- <div class="modal-background"></div> -->
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">アップロード</p>
          <el-button type="danger" icon="el-icon-delete" circle @click="close('uploadForm')"></el-button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <el-form v-for="(file,index) in uploadForm.files" :key="index" :model="uploadForm.form[index]" :rules="uploadFormRules" ref="uploadForm"
            label-width="100px" class="demo-ruleForm">
            <h3>第{{parseInt(index)+1}}件</h3>
            <el-form-item label="ファイル名" prop="fileinfo">
              <!-- <el-input disabled v-model="uploadForm.form[index].fileinfo"></el-input> -->
              <span>{{uploadForm.form[index].filename}} ({{uploadForm.form[index].filesize}})</span>
            </el-form-item>
            <el-row>
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
  margin-bottom: 10px;
}
h3{
  margin-top: 0;
}
</style>

<script>
  export default {
    data() {
      return {
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
    props: ['uploadForm'],
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
            me.uploadForm.form[i] = JSON.parse(JSON.stringify(me.uploadForm.form[0]));
            me.uploadForm.form[i].filename = filename;
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
        this.$emit('reset', formName);
      },
      uploadFiles(formName) {
        let me = this;
        let checkflag = true;
        me.$refs[formName].forEach((formData, idx) => {
          formData.validate(valid => {
            if (!valid) checkflag = false;
          })
          if (me.uploadForm.form[idx].comment[0].text == '') {
            console.log('text: ', me.uploadForm.form[idx].comment[0].text);
            me.uploadForm.form[idx].comment = [];
          }
        });
        if (checkflag) {
          me.$emit('upload');
        } else {
          console.log('submit failed');
          return false;
        }
        me.close(formName);
        me.resetForm(formName);
      },
    }
  }

</script>
