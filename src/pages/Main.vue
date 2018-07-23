<template>
  <div class="bg-main">
    <el-container class="bg-color" style="margin:0 0 5px 0;">
      <el-aside style="width:260px;">
        <img src="../assets/logo.png" width="240px" height="60px" style="margin-top:5px">
      </el-aside>
      <el-main>
        <el-row type="flex" justify="space-between" style="margin-bottom:5px;">
          <el-col :sm="17" :md="19" :lg="20" :xl="18">
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
            <el-radio-group v-model="reqData.queryFormTop.date_kbn" size="small" style="margin-right:5px;">
              <el-radio-button :label="1">登録日</el-radio-button>
              <el-radio-button :label="0">指定なし</el-radio-button>
            </el-radio-group>

            <el-date-picker 
              :disabled="reqData.queryFormTop.date_kbn==0 && respData.auth_ptn.ope_log_csv!=1" 
              :picker-options="pageConfig.pickerOptions"
              style="width: 250px;padding:0 10px" 
              v-model="reqData.queryFormTop.dateRange" 
              unlink-panels 
              align="left" 
              type="daterange" 
              value-format="yyyy-MM-dd" 
              range-separator="～" 
              start-placeholder="From"
              end-placeholder="To">
            </el-date-picker>
            <el-button v-if="respData.auth_ptn.ope_log_csv==1"
              :disabled="!reqData.queryFormTop.dateRange"
              type="primary" 
              @click="getOpeLog" 
              size="small" 
              plain style="margin-left:5px;">操作ログ</el-button>
            <el-button v-if="respData.auth_ptn.result_dl==1" type="primary" @click="queryTop('csv')" size="small" plain style="margin-left:5px;">CSV出力</el-button>

          </el-col>
          <el-col :sm="7" :md="5" :lg="4" :xl="2" style="text-align:right">
            <span style="padding-right:5px;font-size:13px;">{{pageConfig.user.user_nm}} さん</span>
            <el-button @click="logout" type="primary" size="mini" circle>
              <i class="fas fa-sign-out-alt"></i>
            </el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="3" :md="3" :lg="3" :xl="3" style="padding-right:5px;">
            <el-input v-model="doc_nm_delay" placeholder="書類名"></el-input>
          </el-col>
          <el-col :sm="3" :md="3" :lg="5" :xl="5" style="padding-right:5px;">
            <el-input v-model="free_format_delay" placeholder="フリー"></el-input>
          </el-col>
          <el-col :sm="9" :md="9" :lg="7" :xl="7">
            <el-row>
              <el-col :span="8" style="padding-right:5px;">
                <el-input v-model="file_entry_user_delay" placeholder="登録者"></el-input>
              </el-col>
              <el-col :span="8" style="padding-right:5px;">
                <el-input v-model="sales_nm_delay" placeholder="営業担当"></el-input>
              </el-col>
              <el-col :span="8" style="padding-right:5px;">
                <el-input v-model="manage_nm_delay" placeholder="管理担当"></el-input>
              </el-col>
            </el-row>
          </el-col>
          <el-col :sm="3" :md="3" :lg="3" :xl="3" style="padding-right:5px;">
            <el-input v-model="reqData.queryFormTop.comment" placeholder="コメント"></el-input>
          </el-col>
          <el-col :sm="12" :md="6" :lg="5" :xl="4">
            <el-button type="primary" size="small" @click="queryTop('search')" style="margin-left:5px;">検索</el-button>
            <el-button type="primary" size="small" plain @click="resetTop" style="margin-left:5px;">リセット</el-button>
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
                <el-button type="primary" size="small" @click="queryAside" style="margin-left: 3px">検索</el-button>
                <el-button type="primary" size="small" @click="resetAside" plain style="margin-left: 3px">リセット</el-button>
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
          <el-radio-group v-model="pageConfig.currentTabName" @change="getDownloadList" style="margin: 5px 0;">
            <el-radio-button v-for="option in respData.business_kbn" :label="option.value" :key="option.id">{{option.label}}</el-radio-button>
            <el-radio-button label="">指定なし</el-radio-button>
            <el-radio-button label="downloadList">ダウンロードリスト</el-radio-button>
          </el-radio-group>
          <transition name="component-fade" mode="out-in">
            <download-list v-if="pageConfig.currentTabName=='downloadList'" 
              key="downloadList" 
              @download="getDownloadList"
              :download-list="respData.downloadList">
            </download-list>
            <main-table v-else 
              :table-data="tableData" 
              :auth-ptn="respData.auth_ptn"
              :key="pageConfig.currentTabName" 
              @sort-change="sortChange"
              @preview="previewFiles" 
              @delete="deleteFiles"
              @error="error">
            </main-table>
          </transition>
        </el-main>
      </el-container>
    </el-container>
    <transition name="component-fade" mode="out-in">
      <div v-if="pageConfig.isUpload || pageConfig.isPreview" class="modal-background"></div>
    </transition>
    <transition name="component-fade" mode="out-in">
      <upload v-if="pageConfig.isUpload" 
        :business-kbn="respData.business_kbn"
        :auth-ptn="respData.auth_ptn"
        :current-tree="respData.currentTree" 
        @upload="uploadFile" 
        @error="error"
        @close="close">
      </upload>
      <preview v-if="pageConfig.isPreview"
        :auth-ptn="respData.auth_ptn"
        @add-comment="addComment" 
        @del-comment="delComment" 
        @error="error"
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
  .top-query-free {
    width: 100%;
  }
</style>

<script>
  import Vue from 'vue'
  import _ from 'lodash'
  import mainTable from '@/components/Table.vue'
  import downloadList from '@/components/DownloadList.vue'
  import upload from '@/components/Upload.vue'
  import loading from '@/components/Loading.vue'
  import preview from '@/components/MultiPreview.vue'
  import evtBus from '@/assets/evtBus';
  import moment from "moment";
  import {demo} from "@/assets/demoData";

  export default {
    name: "Main",
    data() {
      //demo
      return demo;
      //TODO
      // return {

      // }
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
    created() {
      let me = this;
      //bind drag event for FF,Chrm,IE
      document.addEventListener("dragstart", e => {
        e.dataTransfer.setData('text/plain', null);
      }, false);
      document.addEventListener("dragenter", me.onDrag, false);
      document.addEventListener("dragover", me.onDrag, false);
      document.addEventListener("drop", me.onDrop, false);
      
      if(!evtBus.apigClient){
        let {check,accessKeyId,secretAccessKey,sessionToken,region}=me.getAWSCookies();
        if(check){
          //logged in
          evtBus.apigClient=me.sessionApigClient(accessKeyId,secretAccessKey,sessionToken,region);
        }else{
          //login status error
          //TODO
          console.log('​mounted -> login status error');
          me.error();
        }
      }
      //set headers
      evtBus.headers={
        Authorization:me.getCookie('sessionToken'),
        'user-id':me.getCookie('user_id')
      };
      //get user info
      me.pageConfig.user.user_id=me.getCookie('user_id');
      me.pageConfig.user.user_nm=unescape(me.getCookie('user_nm'));
      me.pageConfig.user.company_nm=unescape(me.getCookie('company_nm'));
      me.pageConfig.user.auth_ptn=me.getCookie('auth_ptn');
      me.pageConfig.user.mail=me.getCookie('mail');
      me.pageConfig.user.control=me.getCookie('control');
      me.pageConfig.user.status=me.getCookie('status');

      //TODO load business_kbn tab
      let items={
        auth_ptn:me.getCookie('auth_ptn')
      }
      evtBus.apigClient.invokeApi({},'ver1.0.0/files/load','POST',{headers:evtBus.headers},{items:items})
        .then(res => {
          if(!res.error){
            //success
            let {auth,business} = JSON.parse(JSON.stringify(res.data.data.items));
            me.respData.business_kbn = business;
            console.log('mounted -> set!');
            auth.forEach(data=>{
              me.respData.auth_ptn[data.auth_kbn]=data.auth_flg;
            });
            return true;
          }else{
            //get treedata failed
            me.$message.error('エラーが発生しました！'+res.error.message);
            console.log('​queryAside -> res.error', res.error);
          }
        })
        .catch(err => {
          me.$message.error('通信エラーが発生しました！');
          console.log("err: ", err);
        });
    },
    methods: {
      getOpeLog(){
        let me = this;
        let items={
          operation_logdate_from:me.queryFormTop.dateRange[0],
          operation_logdate_to:me.queryFormTop.dateRange[1]
        };
        evtBus.apigClient.invokeApi({},'ver1.0.0/csv/logs','GET',{headers:evtBus.headers},{items:items})
          .then(res => {
            if(!res.error){
              //success
              this.$message.success('操作成功しました！');
              return true;
            }else{
              //get treedata failed
              this.$message.error('エラーが発生しました！'+res.error.message);
              console.log('getOpeLog -> res.error', res.error);
              this.error();
            }
          })
          .catch(err => {
            this.$message.error('通信エラーが発生しました！');
            console.log("err: ", err);
            this.error();
          });
      },
      sortChange(stat){
        let me = this;
        if(stat.order=="descending"){
          //sort
          if (stat.prop=='file_size') {
            //num
            me.respData.tableData=me.respData.tableData.sort((a,b)=>{
              return b.file_size-a.file_size;
            })
          }else{
            //str
            me.respData.tableData=me.respData.tableData.sort((a,b)=>{
              if (a[stat.prop] < b[stat.prop]) {
                return 1;
              }
              if (a[stat.prop] > b[stat.prop]) {
                return -1;
              }
              return 0;
            })
          }
        }else if(stat.order=="ascending"){
          //sort
          if (stat.prop=='file_size') {
            //num
            me.respData.tableData=me.respData.tableData.sort((a,b)=>{
              return a.file_size-b.file_size;
            })
          }else{
            //str
            me.respData.tableData=me.respData.tableData.sort((a,b)=>{
              if (a[stat.prop] < b[stat.prop]) {
                return -1;
                }
              if (a[stat.prop] > b[stat.prop]) {
                return 1;
              }
              return 0;
            })
          }
        }
      },
      setCurrentTree(id){
        let [owner,estate,tenant]=id.split('_');
        let tree=this.respData.treeData;
        this.respData.currentTree.owner_cd=tree[owner].label.split('_')[0];
        this.respData.currentTree.estate_no=estate==undefined ? '' : tree[owner].children[estate].label.split('_')[0];
        this.respData.currentTree.tenant_cd=tenant==undefined ? '' : tree[owner].children[estate].children[tenant].label.split('_')[0];
      },
      nodeClick(nodeData,node,ele) {
        this.setCurrentTree(nodeData.id);
        this.queryTop();
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
        let num=/^.*(?=.*[0-9]).*$/;
        let {sOwner,sEstate,sTenant}=me.reqData.queryFormAside;
        if(!sOwner && !sEstate && !sTenant){
          me.$message.warning("検索条件を入力してください")
          return false;
        }
        let items = {
          owner_cd:'',
          owner_nm:'',
          estate_no:'',
          estate_nm:'',
          tenant_cd:'',
          tenant_nm:'',
        };
        num.test(sOwner) ? items.owner_cd=sOwner : items.owner_nm=sOwner;
        num.test(sEstate) ? items.estate_no=sEstate : items.estate_nm=sEstate;
        num.test(sTenant) ? items.tenant_cd=sTenant : items.tenant_nm=sTenant;
        evtBus.apigClient.invokeApi({},'ver1.0.0/tree','POST',{headers:evtBus.headers},{items:items})
          .then(res => {
            if(!res.error){
              //success
              let temp = JSON.parse(JSON.stringify(res.data.treeData));
              me.genNodeKey(temp);
              me.respData.treeData = temp;
              return true;
            }else{
              //get treedata failed
              this.$message.error('エラーが発生しました！'+res.error.message);
              console.log('​queryAside -> res.error', res.error);
              this.error();
            }
          })
          .catch(err => {
            this.$message.error('通信エラーが発生しました！');
            console.log("err: ", err);
            this.error();
          });
        
      },
      queryTop(from) {
        let me = this;
        let items=JSON.parse(JSON.stringify(me.respData.currentTree));
        if (from=='csv') {
          //CSV出力ボタン
          Object.assign(items,me.reqData.queryFormTop);
          let {date_kbn,dateRange}=me.reqData.queryFormTop;
          let date_flag=(date_kbn!=0 && dateRange.length>0);
          items.from_date=date_flag ? items.dateRange[0] : '';
          items.to_date=date_flag ? items.dateRange[1] : '';
        }else{
          //検索ボタン
          if (items.owner_cd==undefined){
            me.$message.warning('ツリーからデータを選択してください');
            return false;
          }else if(from=='search' && me.reqData.queryFormTop.comment==''){
            me.$message.warning('コメントの検索条件を入力してください');
            return false;
          }else{
            let temp={
              area: "",
              doc_nm: "",
              free_format: "",
              file_entry_user: "",
              sales_nm: "",
              manage_nm: "",
              from_date:"",
              to_date:"",
            };
            Object.assign(items,temp);
            items.comment=me.reqData.queryFormTop.comment;
          }
        }
        evtBus.apigClient.invokeApi({},'ver1.0.0/files/list','POST',{headers:evtBus.headers},{items:items})
          .then(res => {
            if(!res.error){
              //success
              console.log(res)
              let temp = JSON.parse(JSON.stringify(res.data.items));
              me.respData.tableData = temp;
              return true;
            }else{
              //get tableData failed
              me.$message.error('エラーが発生しました！'+res.error.message);
              console.log('queryTop -> res.error', res.error);
              me.error();
            }
          })
          .catch(err => {
            me.$message.error('通信エラーが発生しました！');
            console.log("err: ", err);
            me.error();
          });
        console.log('​queryTop -> items', items);
        
      },
      getDownloadList(tab){
        
        console.log('​getDownloadList -> ', );
        let me = this;
        if(tab!="downloadList") return false;
        let items={
          bucket_nm:evtBus.download_bucket_name,
          user_id:me.getCookie('user_id')
        }
        evtBus.apigClient.invokeApi({},'ver1.0.0/downloads/list','POST',{headers:evtBus.headers},{items:items})
          .then(res => {
            if(!res.error){
              //success
              
              console.log('​getDownloadList -> ', res);
              let {data} = JSON.parse(JSON.stringify(res));
              me.respData.downloadList = data;
              return true;
            }else{
              //get tableData failed
              me.$message.error('エラーが発生しました！'+res.error.message);
              console.log('queryTop -> res.error', res.error);
              me.error();
            }
          })
          .catch(err => {
            me.$message.error('通信エラーが発生しました！');
            console.log("err: ", err);
            me.error();
          });
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
        if (this.respData.auth_ptn.file_upload!=1){
          this.$message.warning('このアカウントにはアップロードする権限はありません！')
          return false;
        }
        let {files} = e.dataTransfer;
        if (files.length < 1 || this.respData.currentTree.owner_cd==""){
          this.$message.warning('アプロードするには、まずツリーにデータを選択してください！');
          return false;
        }
        for (let i = 0; i < files.length; i++) {
          if (files[i].type == "") {
            this.$message.warning('このファイル形式又はフォルダのアプロードは制限されています！');
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
          newData.file_entry_user = me.pageConfig.user.user_nm;
          console.log(me.respData.tableData.unshift(newData));
        }
      },
      previewFiles() {
        this.pageConfig.isPreview = true;
      },
      deleteFiles(items) {
        console.log('​deleteFiles -> items', items);
        evtBus.apigClient.invokeApi({},'ver1.0.0/files/delete','POST',{headers:evtBus.headers},{items:items})
          .then(res => {
            if(!res.error){
              //success
              if(res.data.result_flg==0){
                //delete success
                items.forEach(item => {
                  this.respData.tableData.forEach((data, index) => {
                    if (data.file_id==item.file_id) {
                      this.respData.tableData.splice(index, 1);
                    }
                  });
                });
                this.$message.success('削除されました！');
                return true;
              }else{
                //delete failed
                this.$message.error('ファイル削除は失敗しました！もう一度試してください！');
                return false;
              }
            }else{
              //failed
              this.$message.error('エラーが発生しました！'+res.error.message);
              console.log('​deleteFiles -> res.error', res.error);
            }
          })
          .catch(err => {
            this.$message.error('通信エラーが発生しました！');
            console.log("err: ", err);
          });
        this.error();
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
      resetAside() {
        this.reqData.queryFormAside={
          sOwner:'',
          sEstate:'',
          sTenant:''
        };
        this.respData.treeData = [];
        this.respData.currentTree={
          owner_cd:'',
          estate_no:'',
          tenant_cd:'',
        };
      },
      resetTop(){
        this.reqData.queryFormTop={
          area: 0,
          public_kbn: 0,
          doc_nm: "",
          free_format: "",
          file_entry_user: "",
          sales_nm: "",
          manage_nm: "",
          comment: "",
          dateRange:[],
          date_kbn:0
        }
      },
      error(){
        this.clearAllCookies();
        setTimeout(() => {
          this.resetAside();
          this.resetTop();
          this.pageConfig.isUpload=false;
          this.pageConfig.isPreview=false;
          this.$router.push('/error');
        }, 2000);
      },
      logout() {
        let items={
          // user_id:this.getCookie('user_id'),
          identityId:this.getCookie('identityId')
        };
        evtBus.apigClient.invokeApi({},'signout','POST',{headers:evtBus.headers},{items:items})
          .then(res => {
            if(!res.error){
              //success
              this.clearAllCookies();
              this.$router.push('/login');
            }else{
              //logout failed
              this.$message.error('エラーが発生しました！'+res.error.message);
              console.log('logout -> res.error', res.error);
            }
          })
          .catch(err => {
            this.$message.error('通信エラーが発生しました！');
            console.log("err: ", err);
          });
        //TODO demo
        this.clearAllCookies();
        this.resetAside();
        this.resetTop();
        this.pageConfig.isUpload=false;
        this.pageConfig.isPreview=false;
        this.$router.push('/login');
      }
    },
    computed: {
      doc_nm_delay:{
        get() {
          return this.reqData.queryFormTop.doc_nm;
        },
        set: _.debounce(function(newVal){
          this.reqData.queryFormTop.doc_nm = newVal;
        }, 600)
      },
      free_format_delay:{
        get() {
          return this.reqData.queryFormTop.free_format;
        },
        set: _.debounce(function(newVal){
          this.reqData.queryFormTop.free_format = newVal;
        }, 600)
      },
      file_entry_user_delay:{
        get() {
          return this.reqData.queryFormTop.file_entry_user;
        },
        set: _.debounce(function(newVal){
          this.reqData.queryFormTop.file_entry_user = newVal;
        }, 600)
      },
      sales_nm_delay:{
        get() {
          return this.reqData.queryFormTop.sales_nm;
        },
        set: _.debounce(function(newVal){
          this.reqData.queryFormTop.sales_nm = newVal;
        }, 600)
      },
      manage_nm_delay:{
        get() {
          return this.reqData.queryFormTop.manage_nm;
        },
        set: _.debounce(function(newVal){
          this.reqData.queryFormTop.manage_nm = newVal;
        }, 600)
      },
      tableData() {
        return this.respData.tableData.filter(data => {
          let tab = (this.pageConfig.currentTabName == '') ? true : data.business_kbn == this.pageConfig.currentTabName;
          let {area,public_kbn,doc_nm,free_format,file_entry_user,sales_nm,manage_nm,comment,dateRange,date_kbn}=this.reqData.queryFormTop;
          area=area==0 ? true : data.area==area;
          public_kbn=public_kbn==0 ? true : data.public_kbn==public_kbn;
          doc_nm=doc_nm=='' ? true : data.doc_nm.indexOf(doc_nm)>-1;
          free_format=free_format=='' ? true : data.free_format.indexOf(free_format)>-1;
          file_entry_user=file_entry_user=='' ? true : data.file_entry_user.indexOf(file_entry_user)>-1;
          sales_nm=sales_nm=='' ? true : data.sales_nm.indexOf(sales_nm)>-1;
          manage_nm=manage_nm=='' ? true : data.manage_nm.indexOf(manage_nm)>-1;
          let date=true;
          if(date_kbn!=0 && dateRange.length>0){
            let start=moment(dateRange[0]).subtract(1,'day');
            let end=moment(dateRange[1]).subtract(-1,'day');
            date=moment(data.file_entry_date).isBetween(start,end);
          }
          return (tab&&area&&public_kbn&&doc_nm&&free_format&&file_entry_user&&sales_nm&&manage_nm&&date)
        });
      },
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->