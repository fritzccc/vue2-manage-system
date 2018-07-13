<template>
  <div class="bg-main">
    <el-container class="bg-color" style="margin:0 0 5px 0;">
      <el-aside>
        <img src="../assets/logo.png" width="280px" height="70px" style="margin-top:5px">
      </el-aside>
      <el-main>
        <el-row type="flex" justify="space-between" style="margin-bottom:5px;">
          <el-col :sm="17" :md="19" :lg="19" :xl="18">
            <el-radio-group v-model="reqData.queryFormTop.area" size="small" style="margin-right:5px;">
              <el-radio-button :label="1">東京</el-radio-button>
              <el-radio-button :label="2">大阪</el-radio-button>
              <el-radio-button :label="3">名古屋</el-radio-button>
              <el-radio-button :label="0">指定なし</el-radio-button>
            </el-radio-group>

            <!-- <el-radio-group v-model="reqData.queryFormTop.openStatus" size="small" style="margin-right:5px;">
                <el-radio-button :label="1">非公開</el-radio-button>
                <el-radio-button :label="2">公開中</el-radio-button>
                <el-radio-button :label="0">指定なし</el-radio-button>
              </el-radio-group> -->
            <el-radio-group v-model="reqData.queryFormTop.dateKbn" size="small" style="margin-right:5px;">
              <el-radio-button :label="1">登録日</el-radio-button>
              <el-radio-button :label="0">指定なし</el-radio-button>
            </el-radio-group>

            <el-date-picker style="width: 250px;padding:0 10px" v-model="reqData.queryFormTop.dateRange" :picker-options="pageConfig.pickerOptions"
              unlink-panels align="left" type="daterange" value-format="yyyy-MM-dd" range-separator="～" start-placeholder="From"
              end-placeholder="To">
            </el-date-picker>
            <el-button type="primary" plain style="margin-left:5px;">操作ログ</el-button>
          </el-col>
          <el-col :sm="7" :md="5" :lg="5" :xl="2" style="text-align:right">
            <span style="padding-right:5px;">{{pageConfig.user.user_nm}} さん</span>
            <el-button @click="logout" type="primary" size="mini" circle>
              <i class="fas fa-sign-out-alt"></i>
            </el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="3" :md="3" :lg="3" :xl="3" style="padding-right:5px;">
            <el-input v-model="reqData.queryFormTop.doc" placeholder="書類名"></el-input>
          </el-col>
          <el-col :sm="3" :md="3" :lg="5" :xl="5" style="padding-right:5px;">
            <el-input v-model="reqData.queryFormTop.free_format" placeholder="フリー"></el-input>
          </el-col>
          <el-col :sm="9" :md="9" :lg="7" :xl="7">
            <el-row>
              <el-col :span="8" style="padding-right:5px;">
                <el-input v-model="reqData.queryFormTop.entry_nm" placeholder="登録者"></el-input>
              </el-col>
              <el-col :span="8" style="padding-right:5px;">
                <el-input v-model="reqData.queryFormTop.sales_nm" placeholder="営業担当"></el-input>
              </el-col>
              <el-col :span="8" style="padding-right:5px;">
                <el-input v-model="reqData.queryFormTop.manage_nm" placeholder="管理担当"></el-input>
              </el-col>
            </el-row>
          </el-col>
          <el-col :sm="3" :md="3" :lg="3" :xl="3" style="padding-right:5px;">
            <el-input v-model="reqData.queryFormTop.comment" placeholder="コメント"></el-input>
          </el-col>
          <el-col :sm="12" :md="6" :lg="5" :xl="4">
            <el-button type="primary" plain @click="submitQueryFormTop" style="margin-left:10px;">検索</el-button>
            <el-button type="primary" plain style="margin-left:5px;">CSV出力</el-button>
          </el-col>
        </el-row>
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
        <el-tree ref="tree" 
          :expand-on-click-node="false"
          :class="'bg-color'"
          :data="respData.treeData" 
          accordion highlight-current
          @node-click="nodeClick"
          node-key="id">
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
            <span class="tree-wrap" style="padding:0">
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
            <el-radio-button v-for="option in respData.business_kbn" :label="option.value" :key="option.id">{{option.label}}</el-radio-button>
            <el-radio-button label="">指定なし</el-radio-button>
            <el-radio-button label="downloadList">ダウンロードリスト</el-radio-button>
          </el-radio-group>
          <transition name="component-fade" mode="out-in">
            <download-list v-if="pageConfig.currentTabName=='downloadList'" key="downloadList" :download-list="respData.downloadList"></download-list>
            <main-table v-else :table-data="tableData" :key="pageConfig.currentTabName" @preview="previewFiles" @delete="deleteFiles"></main-table>
          </transition>
        </el-main>
      </el-container>
    </el-container>
    <transition name="component-fade" mode="out-in">
      <div v-if="pageConfig.isUpload || pageConfig.isPreview" class="modal-background"></div>
    </transition>
    <transition name="component-fade" mode="out-in">
      <upload v-if="pageConfig.isUpload" :business-kbn="respData.business_kbn" :current-tree="respData.currentTree" @upload="uploadFile" @close="close"></upload>
      <preview v-if="pageConfig.isPreview" :user="pageConfig.user" @add-comment="addComment" @del-comment="delComment" @close="close"></preview>
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
  .top-query-free {
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
      setCurrentTree(id){
        console.log('​getCurrentTree -> id', id);
        let [owner,estate,tenant]=id.split('_');
        let tree=this.respData.treeData;
        this.respData.currentTree={};
        this.respData.currentTree.owner_cd=tree[owner].label.split('_')[0];
        this.respData.currentTree.owner_nm=tree[owner].label.split('_')[1];
        if(estate!=undefined){
          this.respData.currentTree.estate_cd=tree[owner].children[estate].label.split('_')[0];
          this.respData.currentTree.estate_nm=tree[owner].children[estate].label.split('_')[1];
        }
        if(tenant!=undefined){
          this.respData.currentTree.tenant_cd=tree[owner].children[estate].children[tenant].label.split('_')[0];
          this.respData.currentTree.tenant_nm=tree[owner].children[estate].children[tenant].label.split('_')[1];
        }
      },
      nodeClick(nodeData,node,ele) {
        console.log('​nodeClick -> ele', ele);
        console.log('​nodeClick -> node', node);
        console.log('​nodeClick -> nodeData', nodeData);
        this.setCurrentTree(nodeData.id);
      },
      addKey(data) {
        data.forEach(d => {
          d.key = Math.random();
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
      genNodeKey(data,id_bef) {
        let me = this;
        for (let i = 0; i < data.length; i++) {
          if(id_bef==undefined){
            data[i].id=i+'';
          }else{
            data[i].id=id_bef+('_'+i).repeat(1);
          }
          if (data[i].children != undefined && data[i].children.length > 0) {
            me.genNodeKey(data[i].children,data[i].id);
          }
        }
      },
      queryAside() {
        let me = this;
        let data = {};
        me.$http.post('tree', data)
          .then(resp => {
            let temp = JSON.parse(JSON.stringify(resp.data.treeData));
            me.genNodeKey(temp)
            me.respData.treeData = temp;
          })
          .catch(err => {
            this.$message({
              message: '通信エラーが発生しました！',
              type: 'error'
            })
            console.log("err: ", err);
          });
      },
      resetQueryAside() {
      },
      submitQueryFormTop() {
        console.log(this.searchForm);
      },
      switchTab(tabname) {
        evtBus.$emit('switch-tab')
      },
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
        if (files.length < 1 || this.respData.currentTree.owner_cd==undefined)
          return false;
        for (let i = 0; i < files.length; i++) {
          if (files[i].type == "") {
            this.$message({
              type: 'warning',
              message: 'このファイル形式又はフォルダのアプロードは制限されています'
            });
            return false;
          }
        }
        this.pageConfig.isUpload = true;
        Vue.nextTick(() => {
          evtBus.$emit('upload-files', files, this.pageConfig.currentTabName)
        })
      },
      uploadFile(uploadForm) {
        let me = this;
        for (let i = 0; i < uploadForm.files.length; i++) {
          let newData = JSON.parse(
            JSON.stringify(uploadForm.form[i])
          );
          newData.entry_nm = me.pageConfig.user.user_nm;
          console.log(me.respData.tableData.unshift(newData));
        }
      },
      previewFiles() {
        this.pageConfig.isPreview = true;
      },
      deleteFiles(selectedItems) {
        let flag = false;
        selectedItems.forEach(item => {
          this.respData.tableData.forEach((data, index) => {
            if (item.key == data.key) {
              this.respData.tableData.splice(index, 1);
            }
          })
        })
        //AJAX
        flag = true;
        if (flag) {
          this.$message({
            type: 'success',
            message: '削除されました！'
          });
        } else {
          this.$message({
            type: 'error',
            message: 'エラーが発生しました！'
          });
        }
      },
      addComment(previewData, newComment) {
        previewData.comment.unshift(JSON.parse(JSON.stringify(newComment)));
        // AJAX
      },
      delComment(previewData, index) {
        // console.log('index: ', index);
        this.respData.tableData.forEach(data => {
          if (data.key === previewData.key) {
            data.comment.splice(index, 1);
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
        this.respData.treeData = [];
        this.respData.currentTree={};
      },
      logout() {
        this.clearAllCookies();
        this.$router.push('/login');
      }
    },
    mounted() {
      let me = this;
      document.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData('text/plain', null);
      }, false);
      document.addEventListener("dragenter", me.onDrag, false);
      document.addEventListener("dragover", me.onDrag, false);
      document.addEventListener("drop", me.onDrop, false);
      me.respData.tableData.forEach(data => {
        data.filetype = data.doc_nm.split(".")[1];
        data.key = Math.random();
      }); //need to adjust later...should do when AJAX get the data,not in mounted
    },
    computed: {
      tableData() {
        return this.respData.tableData.filter(data => {
          return (this.pageConfig.currentTabName == '') ? true : data.business_kbn == this.pageConfig.currentTabName
        })
      },
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->