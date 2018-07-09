<template>
  <div class="bg-main">
    <el-container class="bg-color" style="margin:0 0 5px 0;">
      <el-aside>
        <img src="../assets/logo.png" width="280px" height="70px" style="margin-top:10px">
      </el-aside>
      <el-main>
        <el-form :inline="true" :model="reqData.queryFormTop" class="demo-form-inline">
          <el-row type="flex" justify="space-between">
            <el-col :sm="17" :md="18" :lg="18" :xl="18">
            <el-form-item>
              <el-radio-group v-model="reqData.queryFormTop.area" size="small">
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
              <el-radio-group v-model="reqData.queryFormTop.dateKbn" style="padding-right: 0px;" size="small">
                <el-radio-button :label="1">登録日</el-radio-button>
                <el-radio-button :label="0">指定なし</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <!-- <el-form-item>
              <el-select style="width: 150px;" v-model="reqData.queryFormTop.date.value" @change="dataSelect" placeholder="期間">
                <el-option v-for="option in reqData.queryFormTop.date.options" :key="option.value" :label="option.label" :value="option.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
                <el-date-picker style="width: 250px;" v-if="reqData.queryFormTop.date.value=='0'" v-model="reqData.queryFormTop.date.range"
                  type="daterange" value-format="yyyy-MM-dd" range-separator="～" start-placeholder="From" end-placeholder="To">
                </el-date-picker>
            </el-form-item> -->
            <el-form-item>
              <el-date-picker style="width: 250px;"
                v-model="reqData.queryFormTop.dateRange"
                :picker-options="pageConfig.pickerOptions"
                unlink-panels
                align="left"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="～"
                start-placeholder="From"
                end-placeholder="To">
              </el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :sm="7" :md="6" :lg="5" :xl="2" style="text-align:right">
              <span style="padding-right:5px;">{{pageConfig.user.userNm}} さん</span>
              <el-button @click="logout" type="primary" size="mini" circle><i class="fas fa-sign-out-alt"></i></el-button>
            </el-col>
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
      <el-aside class="bg-color bg-shadow" :style="{width:pageConfig.asideWidth+'px'}">
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
          left:pageConfig.asideWidth+'px'
          }" @mousedown="mouseDown">
      </label>
      <el-container :class="'bg-color bg-shadow'" style="margin-top: 0px;margin-bottom: 0px;margin-right:0px;">
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
            <el-radio-group v-model="pageConfig.currentTabName" @change="switchTab" style="margin: 5px 0;">
              <el-radio-button label="jutaku">受託</el-radio-button>
              <el-radio-button label="seiyaku">成約</el-radio-button>
              <el-radio-button label="kouji">工事</el-radio-button>
              <el-radio-button label="kanri">管理</el-radio-button>
              <el-radio-button label="kaiyaku">解約</el-radio-button>
              <el-radio-button label="">指定なし</el-radio-button>
              <el-radio-button label="downloadList">ダウンロードリスト</el-radio-button>
            </el-radio-group>
          <transition name="component-fade" mode="out-in">
              <download-list v-if="pageConfig.currentTabName=='downloadList'"
              key="downloadList"
              :download-list="respData.downloadList"></download-list>
              <main-table v-else :table-data="tableData"
                :key="pageConfig.currentTabName"
                @preview="previewFiles"
                @delete="deleteFiles">
              </main-table>
          </transition>
        </el-main>
      </el-container>
    </el-container>
    <transition name="component-fade" mode="out-in">
      <div v-if="pageConfig.isUpload || pageConfig.isPreview" class="modal-background"></div>
    </transition>
    <transition name="component-fade" mode="out-in">
      <upload v-if="pageConfig.isUpload" @upload="uploadFile" @close="close">
      </upload>
      <preview v-if="pageConfig.isPreview" 
        :user="pageConfig.user" 
        @add-comment="addComment"
        @del-comment="delComment"
        @close="close">
      </preview>
    </transition>
  </div>
</template>

<style scoped>
  .component-fade-enter-active,
  .component-fade-leave-active {
    z-index: 4;
    transition: opacity .2s ease;
  }

  .component-fade-enter,
  .component-fade-leave-to {
    z-index: 4;
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
  import Vue from 'vue'
  import mainTable from '@/components/Table.vue'
  import downloadList from '@/components/DownloadList.vue'
  import upload from '@/components/Upload.vue'
  import loading from '@/components/Loading.vue'
  // import preview from '@/components/Preview.vue'
  import preview from '@/components/MultiPreview.vue'
  import moment from "moment";
  import {
    demo
  } from "../assets/demoData";
  import evtBus from '../assets/evtBus';

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
      loading
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
        document.onmousemove = (evt) => {
          let xx = evt.clientX;
          me.pageConfig.asideWidth = pos + xx - x;
        };
        document.onmouseup = (evt) => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
        if (e.preventDefault) {
          e.preventDefault();
        }
        return false;
      },
      queryAside() {
        let me = this;
        let data = {};
        me.$http.post('tree', data)
          .then(resp => {
            me.respData.treeData = resp.data.treeData;
          })
          .catch(err => {
            this.$message({
              message: '通信エラーが発生しました！',
              type: 'error'
            })
            console.log("err: ", err);
          });
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
        evtBus.$emit('switch-tab')
      },
      // dataSelect(val){
      //   switch (val) {
      //     case 0://期間指定
      //       this.reqData.queryFormTop.date.range=[];
      //       break;
      //     case 1://過去1週
      //       this.reqData.queryFormTop.date.range[0]=moment().subtract(7,'days').format("YYYY-MM-DD");
      //       this.reqData.queryFormTop.date.range[1]=moment().format("YYYY-MM-DD");
      //       break;
      //     case 2://過去1ヶ月
      //       this.reqData.queryFormTop.date.range[0]=moment().subtract(1,'month').format("YYYY-MM-DD");
      //       this.reqData.queryFormTop.date.range[1]=moment().format("YYYY-MM-DD");
      //       break;
      //     case 3://過去1年
      //       this.reqData.queryFormTop.date.range[0]=moment().subtract(1,'year').format("YYYY-MM-DD");
      //       this.reqData.queryFormTop.date.range[1]=moment().format("YYYY-MM-DD");
      //       break;
      //   }
      // },
      onDrag(e) {
        e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        if (e.type != "dragenter" || e.fromElement != null) {
          return false;
        }
      },
      onDrop(e) {
        e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        let {files} = e.dataTransfer;
        if (files.length < 1) return;
        for (let i = 0; i < files.length; i++) {
          if (files[i].type == "") {
            alert("cannot upload a folder or such type is not supported!");
            return false;
          }
        }
        this.pageConfig.isUpload = true;
        Vue.nextTick(()=>{
          evtBus.$emit('upload-files',files,this.pageConfig.currentTabName)
        })
      },
      uploadFile(uploadForm) {
        let me = this;
        for (let i = 0; i < uploadForm.files.length; i++) {
          let newData = JSON.parse(
            JSON.stringify(uploadForm.form[i])
          );
          newData.entryNm = me.pageConfig.user.userNm;
          console.log(me.respData.tableData.unshift(newData));
        }
      },
      previewFiles(){
        this.pageConfig.isPreview=true;
      },
      deleteFiles(selectedItems){
        let flag=false;
        selectedItems.forEach(item=>{
          this.respData.tableData.forEach((data,index)=>{
            if(item.key==data.key){
              this.respData.tableData.splice(index,1);
            }
          })
        })
        //AJAX
        flag=true;
        if(flag){
          this.$message({
            type: 'success',
            message: '削除されました！'
          });
        }else{
          this.$message({
            type: 'error',
            message: 'エラーが発生しました！'
          });
        }
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
          }
        })
        // previewData.comment.splice(index,1);
      },
      close() {
        this.pageConfig.isUpload = false;
        this.pageConfig.isPreview = false;
      },
      reset(formName) {
        this.$refs[formName].resetFields();
        this.respData.treeData=[];
      },
      logout(){
        this.delCookie('session');
        this.delCookie('username');
        this.delCookie('u_uuid');
        this.$router.push('/login');
      }
    },
    mounted() {
      let me = this;
      document.addEventListener("dragstart",(e)=>{
        e.dataTransfer.setData('text/plain',null);        
      }, false);      
      document.addEventListener("dragenter", me.onDrag, false);
      document.addEventListener("dragover", me.onDrag, false);
      document.addEventListener("drop", me.onDrop, false);
      me.respData.tableData.forEach(data => {
        data.filetype = data.docNm.split(".")[1];
        data.key=Math.random();
      }); //need to adjust later...should do when AJAX get the data,not in mounted
    },
    computed:{
      tableData(){
        return this.respData.tableData.filter(data=>{
          return (this.pageConfig.currentTabName=='') ? true : data.businessKbn==this.pageConfig.currentTabName
        }) 
      },
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
