<template>
  <div>
    <el-container class="bg-color" style="margin:0 0 5px 0;">
      <el-aside>
        <img src="../assets/logo.png" width="280px" height="70px" style="margin-top:10px">
      </el-aside>
      <el-main>
        <el-form :inline="true" :model="reqData.queryFormTop" class="demo-form-inline">
          <el-row>
            <el-form-item>
              <el-radio-group v-model="reqData.queryFormTop.sArea" size="small">
                <el-radio-button :label="1">東京</el-radio-button>
                <el-radio-button :label="2">大阪</el-radio-button>
                <el-radio-button :label="3">名古屋</el-radio-button>
                <el-radio-button :label="0">指定なし</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <!-- <el-form-item>
              <el-radio-group v-model="reqData.queryFormTop.openStatus" size="small">
                <el-radio-button :label="1">非公開</el-radio-button>
                <el-radio-button :label="2">公開中</el-radio-button>
                <el-radio-button :label="0">指定なし</el-radio-button>
              </el-radio-group>
            </el-form-item> -->
            <el-form-item>
              <el-radio-group v-model="reqData.queryFormTop.date.sDateClass" style="padding-right: 0px;" size="small">
                <el-radio-button :label="1">登録日</el-radio-button>
                <el-radio-button :label="0">指定なし</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-select style="width: 150px;" v-model="reqData.queryFormTop.date.value" placeholder="期間">
                <el-option v-for="option in reqData.queryFormTop.date.options" :key="option.value" :label="option.label" :value="option.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker style="width: 250px" v-if="reqData.queryFormTop.date.value=='0'" v-model="reqData.queryFormTop.date.range"
                type="daterange" value-format="yyyy-MM-dd" range-separator="～" start-placeholder="From" end-placeholder="To">
              </el-date-picker>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :sm="3" :md="3" :lg="3" :xl="3">
              <el-form-item>
                <el-input v-model="reqData.queryFormTop.doc" placeholder="書類名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="3" :md="3" :lg="5" :xl="5" style="margin-right:5px;">
              <el-form-item class="top-query-free">
                <el-input v-model="reqData.queryFormTop.freeFormat" placeholder="フリー"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="9" :md="9" :lg="7" :xl="7">
              <el-row>
                <el-col :span="8">
                  <el-form-item>
                    <el-input v-model="reqData.queryFormTop.entryNm" placeholder="登録者"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item>
                    <el-input v-model="reqData.queryFormTop.salesNm" placeholder="営業担当"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item>
                    <el-input v-model="reqData.queryFormTop.manageNm" placeholder="管理担当"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <!-- <el-col :sm="3" :md="3" :lg="2" :xl="2">
              <el-form-item>
                <el-input v-model="reqData.queryFormTop.salesNm" placeholder="営業担当"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="3" :md="3" :lg="2" :xl="2">
              <el-form-item>
                <el-input v-model="reqData.queryFormTop.manageNm" placeholder="管理担当"></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :sm="3" :md="3" :lg="3" :xl="3">
              <el-form-item>
                <el-input v-model="reqData.queryFormTop.comment" placeholder="コメント"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :md="6" :lg="5" :xl="4">
              <el-form-item>
                <el-button type="primary" plain @click="submitQueryFormTop" style="margin-left:10px;">検索</el-button>
                <el-button type="primary" plain style="margin-left:5px;">CSV出力</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-main>
    </el-container>

    <el-container style="margin:5px 0 0 0;">
      <el-aside class="bg-color" :style="{width:pageConfig.asideWidth+'px'}">
        <div style="margin-left: 20px;">
          <el-form :inline="true" ref="queryFormAside" :model="reqData.queryFormAside">
            <el-row class="query-aside-input">
              <el-form-item prop="sOwner">
              <el-input v-model="reqData.queryFormAside.sOwner" placeholder="オーナーCD、オーナー名"></el-input>
              </el-form-item>
            </el-row>
            <el-row class="query-aside-input">
              <el-form-item prop="sEstate">
              <el-input v-model="reqData.queryFormAside.sEstate" placeholder="物件CD、物件名"></el-input>
              </el-form-item>
            </el-row>
            <el-row class="query-aside-input">
              <el-form-item prop="sTenant">
              <el-input v-model="reqData.queryFormAside.sTenant" placeholder="テナントCD、入居者名"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-button type="primary" @click="queryAside" style="margin-left: 3px">検索</el-button>
                <el-button type="primary" @click="reset('queryFormAside')" plain style="margin-left: 3px">リセット</el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </div>
        <el-tree :class="'bg-color'" :data="respData.treeData" accordion highlight-current node-key="id">
          <span slot-scope="nodeData">
            <span class="tree-mark" v-if="nodeData.node.label[0]=='A'">
              <b>オ</b>
            </span>
            <span class="tree-mark" v-if="nodeData.node.label[0]=='y'">
              <b>物</b>
            </span>
            <span class="tree-mark" v-if="nodeData.node.label[0]=='T'">
              <b>入</b>
            </span>
            <span class="tree-wrap">
              {{nodeData.node.label}}
            </span>
          </span>
        </el-tree>
      </el-aside>
      <label class="dragbar" :style="{
          height:(pageConfig.tableHeight+150)+'px',
          left:pageConfig.asideWidth+'px'
          }" @mousedown="mouseDown">
      </label>
      <el-container :class="'bg-color'" style="margin-top: 0px;margin-bottom: 0px;margin-right:0px;">
        <el-main style="height: auto;">

          <!-- <div class="tabs is-toggle is-fullwidth is-large">
            <ul>
              <li v-for="tab in pageConfig.tabs" :key="tab.id" :class="{ 'is-active':tab.isSelected }">
                <a @click="switchTab(tab.name)">
                  <span>{{tab.label}}</span>
                </a>
              </li>
            </ul>
          </div> -->
            <el-radio-group v-model="pageConfig.currentTabName" style="margin: 5px 0;">
              <el-radio-button label="jutaku">受託</el-radio-button>
              <el-radio-button label="seiyaku">成約</el-radio-button>
              <el-radio-button label="kouji">工事</el-radio-button>
              <el-radio-button label="kanri">管理</el-radio-button>
              <el-radio-button label="kaiyaku">解約</el-radio-button>
              <el-radio-button label="">指定なし</el-radio-button>
              <el-radio-button label="downloadList">ダウンロードリスト</el-radio-button>
            </el-radio-group>
          <transition name="component-fade" mode="out-in">
            <keep-alive>
              <main-table v-if="pageConfig.currentTabName!='downloadList'"
                :table-data="respData.tableData" 
                :table-height="pageConfig.tableHeight" 
                :current-tab-name="pageConfig.currentTabName"
                :records-per-page="pageConfig.recordsPerPage"
                @preview="previewFile"
                @multi-preview="multiPreview">
              </main-table>
              <download-list v-else :download-list="respData.downloadList"></download-list>
            </keep-alive>
          </transition>
        </el-main>
      </el-container>
    </el-container>
    <div class="modal-background"
    v-if="pageConfig.isMultiPreview || pageConfig.isPreview|| pageConfig.isUpload"></div>
    <transition name="component-fade" mode="out-in">
      <upload v-if="pageConfig.isUpload" :upload-form="reqData.uploadForm" @upload="uploadFile" @close="close">
      </upload>
      <preview v-if="pageConfig.isPreview" 
        :loginUser="pageConfig.loginUser"
        :isFromMultiPreview="pageConfig.isMultiPreview"
        @add-comment="addComment"
        @del-comment="delComment"
        @close="close">
      </preview>
    </transition>
    <transition name="component-fade" mode="out-in">
      <multi-preview v-if="pageConfig.isMultiPreview" 
        v-show="pageConfig.showMp"
        :loginUser="pageConfig.loginUser" 
        @preview="previewFile"
        @close="close">
      </multi-preview>
    </transition>

  </div>
</template>

<style scoped>
  .component-fade-enter-active,
  .component-fade-leave-active {
    transition: opacity .3s ease;
  }

  .component-fade-enter,
  .component-fade-leave-to {
    opacity: 0;
  }

  .query-aside-input {
    margin-right: 15px;
  }
  .el-row .el-form-item {
    margin-bottom: 0px;
    padding: 2px;
}

  .top-query-free{
    width: 100%;
  }
</style>

<script>
  import mainTable from '@/components/Table.vue'
  import downloadList from '@/components/DownloadList.vue'
  import upload from '@/components/Upload.vue'
  import preview from '@/components/Preview.vue'
  import multiPreview from '@/components/MultiPreview.vue'
  import moment from "moment";
  import {
    demo
  } from "../assets/demoData";

  export default {
    name: "Main",
    data() {
      return demo;
    },
    components: {
      mainTable,
      downloadList,
      upload,
      preview,
      multiPreview,
    },
    // components: {
    //   mainTable: resolve => {
    //     require(["../components/Table.vue"], resolve);
    //   },
    //   downloadList: resolve => {
    //     require(["../components/DownloadList.vue"], resolve);
    //   },
    //   preview: resolve => {
    //     require(["../components/Preview.vue"], resolve);
    //   },
    //   upload: resolve => {
    //     require(["../components/Upload.vue"], resolve);
    //   }
    // },
    methods: {
      addKey(data){
        data.forEach(d=>{
          d.key=Math.random();
        })
      },
      mouseDown(e) {
        let me = this;
        let x = e.clientX;
        let pos = JSON.parse(JSON.stringify(me.pageConfig.asideWidth));
        window.onmousemove = (evt) => {
          let xx = evt.clientX;
          me.pageConfig.asideWidth = pos + xx - x;
        };
        window.onmouseup = (evt) => {
          window.onmousemove = null;
          window.onmouseup = null;
        };
        if (e.preventDefault) {
          e.preventDefault();
        }
        return false;
      },
      queryAside() {
        let me = this;
        let url =
          "https://nyl0e196gg.execute-api.ap-northeast-1.amazonaws.com/isp/tree";
        me.$http.post(url, {}).then(
          resp => {
            me.respData.treeData = JSON.parse(resp.bodyText).treeData;
          },
          err => {
            console.log("err: ", err);
          }
        );
      },
      resetQueryAside(){
        
      },
      submitQueryFormTop() {
        console.log(this.searchForm);
      },
      treeNodeClick(a,b,c){
        console.log(a);
        console.log(b);
        console.log(c);
      },
      switchTab(tabname) {
        this.pageConfig.currentTabName = tabname;
        this.pageConfig.tabs.forEach(function (tab) {
          tab.isSelected = tab.name == tabname;
        });
        if (tabname == "downloadList") {
          //AJAX Request
        }
      },
      onDrag: function (e) {
        e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        if (e.type != "dragenter" || e.fromElement != null) {
          return false;
        }
      },
      onDrop(e) {
        e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        let dt = e.dataTransfer;
        if (dt.files.length < 1) return;
        console.log("dt.files: ", dt.files);
        if (dt.files.length > this.reqData.uploadForm.form.length) {
          alert(
            "cannot upload >" +
            this.reqData.uploadForm.form.length +
            " files a time!"
          );
          return false;
        }
        this.reqData.uploadForm.files = dt.files;
        for (let i = 0; i < dt.files.length; i++) {
          if (dt.files[i].type == "") {
            alert("cannot upload a folder or such type is not supported!");
            return false;
          }
          this.reqData.uploadForm.form[i].filename = dt.files[i].name;
          let filesize = (dt.files[i].size / (1024 * 1024)).toFixed(1);
          filesize = (filesize == '0.0') ? '<0.1MB' : (filesize + 'MB');
          this.reqData.uploadForm.form[i].filesize = filesize;
          this.reqData.uploadForm.form[i].businessKbn=this.pageConfig.currentTabName;
        }
        this.pageConfig.isUpload = true;
      },
      uploadFile() {
        let me = this;
        for (let i = 0; i < me.reqData.uploadForm.files.length; i++) {
          if (
            me.reqData.uploadForm.form[i].comment.length &&
            me.reqData.uploadForm.form[i].comment[0].text != ""
          ) {
            me.reqData.uploadForm.form[i].comment[0].entryNm =
              me.pageConfig.loginUser;
            me.reqData.uploadForm.form[i].comment[0].updateDate = moment().format(
              "YYYY-MM-DD"
            );
          }
          let newData = JSON.parse(
            JSON.stringify(me.reqData.uploadForm.form[i])
          );
          newData.isNew = true;
          newData.entryDate = moment().format("YYYY-MM-DD");
          newData.filetype = newData.filename.split(".")[1];
          newData.entryNm = me.pageConfig.loginUser;
          me.respData.tableData.unshift(newData);
          me.reqData.uploadForm.form[i].comment = [{
            entryNm: "",
            updateDate: "",
            text: ""
          }];
        }
      },
      previewFile() {
        this.pageConfig.showMp=false;
        this.pageConfig.isPreview = true;
      },
      multiPreview(data){
        //TODO
        this.pageConfig.isMultiPreview=true;
      },
      addComment(previewData,newComment) {
        previewData.comment.unshift(JSON.parse(JSON.stringify(newComment)));
        // AJAX
      },
      delComment(previewData,index){
        // console.log('index: ', index);
        this.respData.tableData.forEach(data=>{
          if(data.key===previewData.key){
            data.comment.splice(index,1);
            previewData.comment.splice(index,1);
          }
        })
        // previewData.comment.splice(index,1);
      },
      close(goBack) {
        if(!goBack) this.pageConfig.isMultiPreview=false;
        this.pageConfig.showMp=true;
        this.pageConfig.isUpload = false;
        this.pageConfig.isPreview = false;
      },
      reset(formName) {
        this.$refs[formName].resetFields();
        this.respData.treeData=[];
      }
    },
    mounted() {
      let me = this;
      window.addEventListener("dragenter", me.onDrag, false);
      window.addEventListener("dragover", me.onDrag, false);
      window.addEventListener("drop", me.onDrop, false);
      me.respData.tableData.forEach(data => {
        data.filetype = data.docNm.split(".")[1];
        data.key=Math.random();
      }); //need to adjust later...should do when AJAX get the data,not in mounted
      window.onresize = () => {
        me.pageConfig.tableHeight = window.innerHeight - 260;
      };

    },
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
