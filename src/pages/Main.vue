<template>
  <div class="bg-main">
    <el-container class="bg-color" style="margin:0 0 5px 0;">
      <el-aside style="width:260px;">
        <!-- DropZone -->
        <div  v-loading="pageConfig.isUploading" ref="select_frame" class="dz-default" :class='{"dz-active" : pageConfig.isDzActive}'>
          <div class="dz-msg">{{pageConfig.dzMsg}}</div>
        </div>
        <img src="../../static/logo.png" width="240px" height="60px" style="position:absolute;left:5px;top:10px">
      </el-aside>
      <el-main>
        <el-row type="flex" justify="space-between" style="margin-bottom:5px;">
          <el-col :sm="17" :md="19" :lg="21" :xl="18">
            <el-radio-group id="queryFormTop_control" v-model="reqData.queryFormTop.control" size="small" style="margin-right:5px;">
              <el-radio-button label="東京">東京</el-radio-button>
              <el-radio-button label="大阪">大阪</el-radio-button>
              <el-radio-button label="名古屋">名古屋</el-radio-button>
              <el-radio-button label="">指定なし</el-radio-button>
            </el-radio-group>

            <!-- <el-radio-group v-model="reqData.queryFormTop.openStatus" size="small" style="margin-right:5px;">
                <el-radio-button :label="1">非公開</el-radio-button>
                <el-radio-button :label="2">公開中</el-radio-button>
                <el-radio-button :label="0">指定なし</el-radio-button>
              </el-radio-group> -->
            <el-radio-group id="queryFormTop_date_kbn" v-model="reqData.queryFormTop.date_kbn" size="small" @change="changeDateKbn" style="margin-right:5px;">
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
              :disabled="ope_log_csvBtn"
              type="primary" 
              @click="getOpeLog" 
              size="small" 
              plain style="margin-left:5px;">操作ログ</el-button>
            <el-button v-if="respData.auth_ptn.result_dl==1" type="primary" @click="queryTop('csv')" size="small" plain style="margin-left:5px;">CSV出力</el-button>

          </el-col>
          <el-col :sm="7" :md="5" :lg="4" :xl="2" style="text-align:right">
            <span style="padding-right:5px;font-size:13px;">{{pageConfig.user.user_nm}} さん</span>
            <el-button @click="logout" type="primary" size="mini" circle>
              <fa-icon icon="sign-out-alt"></fa-icon>
            </el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="3" :md="3" :lg="3" :xl="3" style="padding-right:5px;">
            <el-input @keyup.enter.native="queryTop('search')" v-model="reqData.queryFormTop.doc_nm" placeholder="書類名"></el-input>
          </el-col>
          <el-col :sm="3" :md="3" :lg="5" :xl="5" style="padding-right:5px;">
            <el-input @keyup.enter.native="queryTop('search')" v-model="reqData.queryFormTop.free_format" placeholder="書類名補足"></el-input>
          </el-col>
          <el-col :sm="9" :md="9" :lg="7" :xl="7">
            <el-row>
              <el-col :span="8" style="padding-right:5px;">
                <el-input @keyup.enter.native="queryTop('search')" v-model="reqData.queryFormTop.file_entry_user" placeholder="登録者"></el-input>
              </el-col>
              <el-col :span="8" style="padding-right:5px;">
                <el-input @keyup.enter.native="queryTop('search')" v-model="reqData.queryFormTop.sales_nm" placeholder="営業担当"></el-input>
              </el-col>
              <el-col :span="8" style="padding-right:5px;">
                <el-input @keyup.enter.native="queryTop('search')" v-model="reqData.queryFormTop.manage_nm" placeholder="管理担当"></el-input>
              </el-col>
            </el-row>
          </el-col>
          <el-col :sm="3" :md="3" :lg="3" :xl="3" style="padding-right:5px;">
            <el-input @keyup.enter.native="queryTop('search')" v-model="reqData.queryFormTop.comment" placeholder="コメント"></el-input>
          </el-col>
          <el-col :sm="12" :md="6" :lg="5" :xl="4">
            <el-button type="primary" size="small" @click="queryTop('search')" style="margin-left:5px;"
            :disabled="queryTopSearchBtn">検索</el-button>
            <el-button type="primary" size="small" plain @click="resetTop(true)" style="margin-left:5px;">リセット</el-button>
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
                <el-input @keyup.enter.native="queryAside" v-model="reqData.queryFormAside.sOwner" placeholder="オーナーCD、オーナー名"></el-input>
              </el-form-item>
            </el-row>
            <el-row class="query-aside-input">
              <el-form-item prop="sEstate">
                <el-input @keyup.enter.native="queryAside" v-model="reqData.queryFormAside.sEstate" placeholder="物件No、物件名"></el-input>
              </el-form-item>
            </el-row>
            <el-row class="query-aside-input">
              <el-form-item prop="sTenant">
                <el-input @keyup.enter.native="queryAside" v-model="reqData.queryFormAside.sTenant" placeholder="テナントCD、入居者名"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-button type="primary" size="small" @click="queryAside" style="margin-left: 3px">検索</el-button>
                <el-button type="primary" size="small" @click="resetAside(true)" plain style="margin-left: 3px">リセット</el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </div>
        <el-tree ref="tree" 
          v-loading="pageConfig.queryAsideLoading"
          class="bg-color tree-scroll"
          :expand-on-click-node="false"
          :data="respData.treeData" 
          accordion highlight-current
          @node-click="nodeClick"
          node-key="id">
          <span slot-scope="nodeData">
            <span class="tree-mark" v-if="nodeData.node.label[0]=='A'">
              <b>オ</b>
            </span>
            <span class="tree-mark" v-if="nodeData.node.label[0]!='A' && nodeData.node.label[0]!='T'" >
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
      <label class="dragbar" 
        :style="{left:pageConfig.asideWidth+'px'}" 
        @mousedown="mouseDown">
      </label>
      <el-container class="bg-color bg-shadow" style="margin-top: 0px;margin-bottom: 0px;margin-right:0px;">
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
              :table-flag="tableFlag"
              :key="pageConfig.currentTabName"
              :loading="pageConfig.tableLoading"
              @multi-download="multiDownload" 
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
      <div v-if="pageConfig.isUpload || pageConfig.isPreview" class="modal-background" :class='{"bg-shadow-opacity" : pageConfig.isLoading}'></div>
    </transition>
    <transition name="component-fade" mode="out-in">
      <upload v-if="pageConfig.isUpload" 
        :business-kbn="respData.business_kbn"
        :current-tree="respData.currentTree" 
        :auth-ptn="respData.auth_ptn"
        @upload-files="uploadFiles" 
        @error="error"
        @close="close">
      </upload>
      <preview v-if="pageConfig.isPreview"
        :auth-ptn="respData.auth_ptn"
        @multi-download="multiDownload"
        @start-loading="previewLoad('start')"
        @end-loading="previewLoad('end')"
        @add-comment="addComment" 
        @del-comment="delComment" 
        @error="error"
        @close="close">
      </preview>
    </transition>
    <!-- <loading v-if="pageConfig.isLoading"></loading> -->
  </div>
</template>

<style scoped>
  .tree-scroll{
    /* max-height: 750px;
    overflow-y: auto; */
    overflow-x: hidden;
  }
  .dz-default{
    opacity: 0;
    border: 1px solid #102E54;
    margin: 5px;
    background-color:rgba(255, 255, 255, 0);
    height: 75px;
    width: 255px;
    z-index: 999;
    border-radius: 5px;
    position:absolute;left:0;top:0;
    -webkit-transition: opacity 0.3s linear;
    -moz-transition: opacity 0.3s linear;
    -o-transition: opacity 0.3s linear;
    transition: opacity 0.3s linear;
  }
  .dz-active{
    opacity: 0.9;
    border: 1px dashed #102E54;
    background-color:rgba(255, 255, 255, 0.8);
  }
  .dz-msg{
    font-weight: 600;
    font-size: 16px;
    margin: 30px 45px;
    cursor: default;
  }
  .bg-shadow-opacity{
    opacity: 0;
  }
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
  import preview from '@/components/MultiPreview.vue'
  import evtBus from '@/assets/evtBus';
  import moment from "moment";

  export default {
    name: "Main",
    data() {
      //demo
      return {
        pageConfig:{
          asideWidth:260,
          dragbarHeight: window.innerHeight-120,
          dzMsg:'ファイルアップロード',
          queryAsideLoading:false,
          isLoading:false,
          tableLoading:false,
          isDzActive:false,
          isUploading:false,
          isUpload: false,
          isPreview:false,
          cantPrev:true,
          cantDwld:true,
          cantDel:true,
          currentTabName:'',
          user:{},
          pickerOptions: {
            shortcuts: [{
              text: '最近１週',
              onClick(picker) {
                let start=moment().subtract(7,'days').format("YYYY-MM-DD");
                let end=moment().format("YYYY-MM-DD");
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近１ヶ月',
              onClick(picker) {
                let start=moment().subtract(1,'month').format("YYYY-MM-DD");
                let end=moment().format("YYYY-MM-DD");
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近１年',
              onClick(picker) {
                let start=moment().subtract(1,'year').format("YYYY-MM-DD");
                let end=moment().format("YYYY-MM-DD");
                picker.$emit('pick', [start, end]);
              }
            }]
          },
        },
        reqData:{
          queryFormTop: {
            control: "",
            public_kbn: 0,
            doc_nm: "",
            free_format: "",
            file_entry_user: "",
            sales_nm: "",
            manage_nm: "",
            comment: "",
            date_kbn:0
          },
          queryFormAside:{
            sOwner:"",
            sEstate:"",
            sTenant:""
          },
        },
        respData:{
          treeData: [],
          currentTree:{
            owner_cd:'',
            estate_no:'',
            estate_nm:'',
            tenant_cd:'',
            tenant_nm:'',
          },
          auth_ptn:{
            bulk_preview:0,
            comment_reg:0,
            file_bulk_dl:0,
            file_delete:0,
            file_dl:0,
            file_search:0,
            file_upload:0,
            master_reg:0,
            ope_log_csv:0,
            open_set:0,
            preview:0,
            result_dl:0,
          },
          business_kbn:[],
          tableData: [],
          downloadList:[],
        }
      };
    },
    components: {
      mainTable,
      downloadList,
      upload,
      preview,
      // loading,
    },
    mounted() {
      let me = this;
      //bind drag event for FF,Chrm,IE
      // document.addEventListener("dragstart", e => {
      //   e.dataTransfer.setData('text/plain', null);
      // }, false);
      // document.addEventListener("dragenter", me.onDrag, false);
      // document.addEventListener("dragover", me.onDrag, false);
      // document.addEventListener("drop", me.onDrop, false);
      
      document.onkeyup = (e)=>{
        if (e.keyCode==27){
          me.$loading({lock: true}).close()
          me.close();
          console.log('​cancelled by esc');
        }
      }
      me.$refs.select_frame.addEventListener("dragstart", e => {
        e.dataTransfer.setData('text/plain', null);
      }, false);
      me.$refs.select_frame.ondragleave = (e) => {
        e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        me.pageConfig.isDzActive=false;
      };
      me.$refs.select_frame.ondragenter = (e) => {
        e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        me.pageConfig.isDzActive=true;
      };
      me.$refs.select_frame.ondragover = (e) => {
        e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        if(!me.pageConfig.isDzActive) me.pageConfig.isDzActive=true;
      };
      me.$refs.select_frame.ondrop = me.dzFileDropped;
      
      //set headers
      evtBus.headers={
        headers:{
          'Content-Type': 'application/json',
          'user-id':me.getCookie('user_id'),
        }
      };
      
      //get user info
      me.pageConfig.user.user_id=me.getCookie('user_id');
      me.pageConfig.user.user_nm=unescape(me.getCookie('user_nm'));
      me.pageConfig.user.company_nm=unescape(me.getCookie('company_nm'));
      me.pageConfig.user.auth_ptn=me.getCookie('auth_ptn');
      me.pageConfig.user.mail=me.getCookie('mail');
      me.pageConfig.user.control=unescape(me.getCookie('control'));
      me.pageConfig.user.status=me.getCookie('status');
      me.reqData.queryFormTop.control=me.pageConfig.user.control;
      
      //load business_kbn tab
      let items={
        auth_ptn:me.getCookie('auth_ptn')
      };

      me.refreshApigClient().then(()=>{
        evtBus.apigClient.reloApiVer100FilesLoadPost({},{items:items},evtBus.headers)
          .then(res => {
            if(!res.data.error){
              //success
              let {auth,business} = JSON.parse(JSON.stringify(res.data.data.items));
              me.respData.business_kbn = business;
              auth.forEach(data=>{
                me.respData.auth_ptn[data.auth_kbn]=data.auth_flg;
              });
              console.log('​Main mounted');
              return true;
            }else{
              //get treedata failed
              me.$message.error('エラーが発生しました！'+res.data.error.message);
              console.log('​queryAside -> res.data.error', res.data.error);
              me.error();
            }
          })
          .catch(err => {
            console.log("err: ", err);
            if(!err.expired){
              me.$message.error('通信エラーが発生しました！');
              me.error();
            }
          });
      })
    },
    methods: {
      changeDateKbn(val){
        if(!val){
          this.reqData.queryFormTop.dateRange=null;
        }
      },
      previewLoad(status){
        // this.pageConfig.isLoading = status=='start';
        if(status=='start'){
          this.$loading({lock: true});
          axios.defaults.timeout=20000;
          axios.defaults.retry=0;
        }else{
          this.$loading({lock: true}).close()
          axios.defaults.timeout=10000;
          axios.defaults.retry=1;
        }
      },
      dzFileDropped(e){
        let me = this;
        me.pageConfig.isDzActive=false;
        e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        if (me.pageConfig.isUpload) return false;
        if (me.respData.auth_ptn.file_upload!=1){
          me.$message.warning('このアカウントにはアップロードする権限はありません！')
          return false;
        }
        if(!me.respData.currentTree.estate_no){
          me.$message.warning('アップロードには物件 or 入居者を選択する必要があります');
          return false;
        }
        let {files} = e.dataTransfer;
        console.log('onDrop -> files', files);
        if (files.length < 1){
          return false;
        }        
        if (me.respData.currentTree.owner_cd==""){
          me.$message.warning('アプロードするには、まずツリーにデータを選択してください！');
          return false;
        }
        for (let i = 0; i < files.length; i++) {
          if (files[i].type == "") {
            me.$message.warning('このファイル形式又はフォルダのアップロードは制限されています！');
            return false;
          }
        }
        // me.pageConfig.isLoading=true;
        this.$loading({lock: true});
        //get folder_id
        let items = me.respData.currentTree;
        me.refreshApigClient().then(()=>{
          evtBus.apigClient.reloApiVer100FilesFolderPost({},{items:items},evtBus.headers)
            .then(res => {
              this.$loading({lock: true}).close();
              if(!res.data.error){
                //successog("fol:",res.data.data);
                console.log("fol:",res.data.data);
                // let {folder_id} = res.data.data;
                let folder_id = res.data.data;
                // me.pageConfig.isLoading=false;
                me.pageConfig.isUpload = true;
                Vue.nextTick(() => {
                  evtBus.$emit('files-dropped', files, me.pageConfig.currentTabName,folder_id)
                })
                return true;
              }else{
                //get treedata failed
                me.$message.error('エラーが発生しました！'+res.data.error.message);
                console.log('upload -> res.data.error', res.data.error);
                me.error();
              }
            })
            .catch(err => {
              me.$loading({lock: true}).close();
              me.$message.error('通信エラーが発生しました！');
              console.log("err: ", err);
              if(!err.expired)
                me.error();
            });
        })
      },
      multiDownload(items){
        let me = this;
        me.refreshApigClient().then(()=>{
          evtBus.apigClient.reloApiVer100FilesDownloadzipPost({},{items:items},evtBus.headers)
            .then(res => {
              if(!res.data.error){
                //success
                me.$message.success('ファイル一覧の一括ダウンロードをしました。ダウンロードリストをご確認ください');
                return true;
              }else{
                //get treedata failed
                this.$message.error('エラーが発生しました！'+res.data.error.message);
                console.log('preview created -> res.data.error', res.data.error);
                this.$emit('error');
              }
            })
            .catch(err => {
              console.log("preview created err: ", err);
              if(!err.expired){
                this.$message.error('通信エラーが発生しました！');
                this.error()
              }
            });
        })
      },
      getOpeLog(){
        let me = this;
        let items={
          operation_logdate_from:me.reqData.queryFormTop.dateRange[0],
          operation_logdate_to:me.reqData.queryFormTop.dateRange[1]
        };

        me.refreshApigClient().then(()=>{
          evtBus.apigClient.reloApiVer100CsvLogsPost({},{items:items},evtBus.headers)
            .then(res => {
              if(!res.data.error){
                //success
                me.$message.success('操作ログをダウンロードしました。ダウンロードリストよりご確認ください');
                return true;
              }else if(res.data.error.code==204){
                me.$message.error('対象のデータが存在しません');
                return false;
              }else{
                //get treedata failed
                me.$message.error('エラーが発生しました！'+res.data.error.message);
                console.log('getOpeLog -> res.data.error', res.data.error);
                me.error();
              }
            })
            .catch(err => {
              console.log("err: ", err);
              if(!err.expired){
                this.$message.error('通信エラーが発生しました！');
                this.error();
              }
            });
        })
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
        this.respData.currentTree={
          owner_cd:'',
          estate_no:'',
          estate_nm:'',
          tenant_cd:'',
          tenant_nm:'',
        };
        let [owner,estate,tenant]=id.split('_');
        let tree=this.respData.treeData;
        this.respData.currentTree.owner_cd=tree[owner].label.split(' ')[0];
        if(estate!=undefined){
          let estate_node = tree[owner].children[estate].label.split(' ')
          this.respData.currentTree.estate_no=estate_node[0];
          this.respData.currentTree.estate_nm=estate_node.slice(1).join(' ');
        }
        if(tenant!=undefined){
          let tenant_node = tree[owner].children[estate].children[tenant].label.split(' ')
          this.respData.currentTree.tenant_cd=tenant_node[0];
          this.respData.currentTree.tenant_nm=tenant_node.slice(1).join(' ');
        }
      },
      nodeClick(nodeData,node,ele) {
        this.setCurrentTree(nodeData.id);
        this.queryTop();
      },
      mouseDown(e) {
        e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
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
        me.pageConfig.queryAsideLoading=true;
        this.respData.treeData=[];
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
        me.refreshApigClient().then(()=>{
          evtBus.apigClient.reloApiVer100TreePost({},{items:items},evtBus.headers)
            .then(res => {
              me.pageConfig.queryAsideLoading=false;
              if(!res.data.error){
                //success
                let temp = JSON.parse(JSON.stringify(res.data.data));
                me.genNodeKey(temp);
                me.respData.treeData = temp;
                return true;
              }else if(res.data.error.code==204){
                //get treedata failed
                this.$message.error('対象のデータが存在しません');
                console.log('​queryAside -> res.data.error', res.data.error);
                return false;
              }else{
                //get treedata failed
                this.$message.error('エラーが発生しました！'+res.data.error.message);
                console.log('​queryAside -> res.data.error', res.data.error);
                this.error();
              }
            })
            .catch(err => {
              me.pageConfig.queryAsideLoading=false;
              console.log("err: ", err);
              if(!err.expired){
                this.$message.error('通信エラーが発生しました！');
                this.error();
              }
            });
        })
      },
      queryTop(from) {
        let me = this;
        let items=JSON.parse(JSON.stringify(me.respData.currentTree));
        if (from=='csv') {
          //CSV出力ボタン
          Object.assign(items,me.reqData.queryFormTop);
          let {date_kbn,dateRange}=me.reqData.queryFormTop;
          // let date_flag=(date_kbn!=0 && dateRange.length>0);
          // items.from_date=date_flag ? items.dateRange[0] : '';
          // items.to_date=date_flag ? items.dateRange[1] : '';
          items.from_date=items.dateRange==undefined ? '' : items.dateRange[0];
          items.to_date=items.dateRange==undefined ? '' : items.dateRange[1];
          items.bucket_nm=evtBus.download_bucket_name;
        }else{
          //検索ボタン or NodeClick
          //20180810 2246 TO CONFIRM
          if(me.pageConfig.currentTabName=='downloadList')
            me.pageConfig.currentTabName='';
          me.respData.tableData=[];
          me.pageConfig.tableLoading=true;
          let temp=JSON.parse(JSON.stringify(me.reqData.queryFormTop));
          let date_kbn = me.reqData.queryFormTop.date_kbn==1
          temp.from_date= (temp.dateRange && date_kbn) ? temp.dateRange[0]:'';
          temp.to_date= (temp.dateRange && date_kbn) ? temp.dateRange[1]:'';
          Object.assign(items,temp);
          console.log('​queryTop -> items', items);
          let{control,to_date,doc_nm,free_format,manage_nm,sales_nm,comment,file_entry_user} = items
          if((from=='search') && !(control||to_date||doc_nm||free_format||manage_nm||sales_nm||comment||file_entry_user)){
            me.$message.warning('検索条件を入力してください');
            me.pageConfig.tableLoading = false;
            return false;
          }
        }
        if (from=='csv') {
          me.refreshApigClient().then(()=>{
            evtBus.apigClient.reloApiVer100CsvFilesPost({},{items:items},evtBus.headers)
              .then(res => {
                if(!res.data.error){
                  //success
                  this.$message.success('CSV出力が完了しました。ダウンロードリストよりご確認ください');
                  return true;
                }else if(res.data.error.code==204){
                  //get treedata failed
                  this.$message.error('対象のデータが存在しません');
                  console.log('​queryTop -> res.data.error', res.data.error);
                  return false;
                }else{
                  //get tableData failed
                  me.$message.error('エラーが発生しました！'+res.data.error.message);
                  console.log('queryTop csv -> res.data.error', res.data.error);
                  me.error();
                }
              })
              .catch(err => {
                console.log("err: ", err);
                if(!err.expired){
                  me.$message.error('通信エラーが発生しました！');
                  me.error();
                }
              });
          })
        } else {
          me.refreshApigClient().then(()=>{
            evtBus.apigClient.reloApiVer100FilesListPost({},{items:items},evtBus.headers)
            .then(res => {
                me.pageConfig.tableLoading=false;
                if(!res.data.error){
                  //success
                  me.respData.tableData = res.data.data.items;
                  return true;
                }else if(res.data.error.code==204){
                  //get treedata failed
                  if(!this.respData.currentTree.owner_cd)
                    this.$message.error('対象のデータが存在しません');
                  console.log('​queryAside -> res.data.error', res.data.error);
                  return false;
                }else{
                  //get tableData failed
                  me.$message.error('エラーが発生しました！'+res.data.error.message);
                  console.log('queryTop -> res.data.error', res.data.error);
                  me.error();
                }
              })
              .catch(err => {
                me.pageConfig.tableLoading=false;
                console.log("err: ", err);
                if(!err.expired){
                  me.$message.error('通信エラーが発生しました！',err.toString());
                  me.error();
                }
              });
          })
        }
      },
      getDownloadList(tab){
        let me = this;
        if(tab!="downloadList") return false;
        let items={
          s3_download_bucket_nm:evtBus.download_bucket_name,
          user_id:me.getCookie('user_id')
        }
        me.refreshApigClient().then(()=>{
          evtBus.apigClient.reloApiVer100DownloadsListPost({},{items:items},evtBus.headers)
            .then(res => {
              if(!res.data.error){
                //success
                console.log('​getDownloadList -> ', res);
                let {data} = JSON.parse(JSON.stringify(res.data));
                me.respData.downloadList = data;
                me.$message.success('更新しました');
                return true;
              }else{
                //get tableData failed
                me.$message.error('エラーが発生しました！'+res.data.error.message);
                console.log('getDownloadList -> res.data.error', res.data.error);
                me.error();
              }
            })
            .catch(err => {
              console.log("err: ", err);
              if(!err.expired){
                me.$message.error('通信エラーが発生しました！');
                me.error();
              }
            });
        })
          console.log("items:", items);
      },
      onDrag(e) {
        e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
      },
      getUploadInfo(items,folder_id){
        console.log('​uploadFiles -> tomcat');
        return evtBus.apigClient.reloApiVer100FilesInfoPost({},{items:items},evtBus.headers)
          .then(res => {
            if(!res.data.error){
              //lambda API
              let lambdaItems=[];
              for (let i = 0; i < items.length; i++) {
                lambdaItems.push({
                  upload_file_name:items[i].file_nm,
                  s3_upload_bucket_nm:evtBus.upload_bucket_name,
                  folder_id:folder_id
                })
              }
              return Promise.resolve(lambdaItems);
            }else{
              return Promise.reject({err:res.data.error});
            }
          })
      },
      getUploadTempUrl(items){
        console.log('​uploadFiles -> lambda');
        return evtBus.apigClient.reloApiVer100FilesUploadTempurlPost({},{items:items},evtBus.headers)
          .then(res=>{
            if(!res.data.error){
              return Promise.resolve({
                data:res.data.data,
                items:items
              })
            }else{
              return Promise.reject({err:res.data.error})
            }
          })
      },
      getUploadResult(res,files){
        console.log('​uploadFiles -> S3');
        let config = {
          headers: {
            'Content-Type': 'application/octet-stream'
          }
        }
        //lambda success
        //本番
        this.$message({
          type:'success',
          dangerouslyUseHTMLString: true,
          message:'アップロードを受付ました。<br>完了したファイルは再度検索すると画面に反映されます。',
          duration:5000,
        });
        let {data,items} = res;
        for (let j = 0; j < data.length; j++) {
          let index;
          for (let k = 0; k < items.length; k++) {
            if(data[j].upload_file_name==items[k].upload_file_name){
              index = k;
              break;
            }
          }
          axios.put(data[j].url,files[index],config)
            .catch(err=>{
              console.log('​upload failed -> ', files[index]);
            })
        }
        this.pageConfig.isUploading=false;
        this.pageConfig.isDzActive=false;
      },
      uploadFiles(data) {
        let me = this;
        //loading0810
        me.pageConfig.isDzActive=true;
        me.pageConfig.isUploading=true;
        let {forms,files} = data;
        let {folder_id}=forms[0];
        console.log('​uploadFiles -> folder_id', folder_id);
        let items = JSON.parse(JSON.stringify(forms));
        me.refreshApigClient()
          .then(()=>{
            return me.getUploadInfo(items,folder_id)
          })
          .then((temp)=>{
            return me.refreshApigClient(temp)
          })
          .then(res1=>{
            return me.getUploadTempUrl(res1)
          })
          .then(res2=>{
            me.getUploadResult(res2,files)
          })
          .catch(err=>{
            me.pageConfig.isUploading=false;
            me.pageConfig.isDzActive=false;
            console.log("upload err: ", err);
            console.log("upload err -> ", err.err);
            
            if(!err.expired){
              me.$message.error('通信エラーが発生しました！');
              me.error();
            }
          });


        // // if(!me.refreshApigClient()) return false;  
        // evtBus.apigClient.reloApiVer100FilesInfoPost({},{items:items},evtBus.headers)
        //   .then(res => {
        //     if(!res.data.error){
        //       //Insert DB success 
        //       //lambda API
        //       let lambdaItems=[];
        //       for (let i = 0; i < items.length; i++) {
        //         lambdaItems.push({
        //           upload_file_name:items[i].file_nm,
        //           s3_upload_bucket_nm:evtBus.upload_bucket_name,
        //           folder_id:folder_id
        //         })
        //       }
        //       console.log('​uploadFiles -> lambda');
        //       // if(!me.refreshApigClient()) return false;  
        //       evtBus.apigClient.reloApiVer100FilesUploadTempurlPost({},{items:lambdaItems},evtBus.headers)
        //         .then(res=>{
        //           if(!res.data.error){
        //             let config = {
        //               headers: {
        //                 'Content-Type': 'application/octet-stream'
        //               }
        //             }
        //             //lambda success
        //             //AWS S3 upload
        //             // for mock
        //             // for (let j = 0; j < files.length; j++) {
        //             //   let formData=new FormData();
        //             //   formData.append('upload', files[j]);
        //             //   console.log(formData.get('upload'));
        //             //   axios.put('https://httpbin.org/put',formData,config)
        //             //     .then(res=>{
        //             //       console.log('​uploadFiles -> res', res);
        //             //     })
        //             // }
        //             //本番
        //             console.log('​uploadFiles -> S3');
        //             this.$message({
        //               type:'success',
        //               dangerouslyUseHTMLString: true,
        //               message:'アップロードを受付ました。<br>完了したファイルは再度検索すると画面に反映されます。',
        //               duration:5000,
        //             });
        //             for (let j = 0; j < res.data.data.length; j++) {
        //               let index;
        //               for (let k = 0; k < lambdaItems.length; k++) {
        //                 if(res.data.data[j].upload_file_name==lambdaItems[k].upload_file_name){
        //                   index = k;
        //                   break;
        //                 }
        //               }
        //               let lambdaRes=res;
        //               axios.put(res.data.data[j].url,files[index],config)
        //                 .then(res=>{})
        //                 .catch(err=>{
        //                   console.log('​upload failed -> ', forms[index].filename);
        //                 })
        //             }
        //             me.pageConfig.isUploading=false;
        //             me.pageConfig.isDzActive=false;
        //           }else{
        //             me.pageConfig.isUploading=false;
        //             me.pageConfig.isDzActive=false;
        //             me.$message.error('エラーが発生しました！'+res.data.error.message);
        //             console.log('lambda API err -> res.data.error', res.data.error);
        //             me.error();
        //           }
        //         })
        //         .catch(err=>{
        //           me.pageConfig.isUploading=false;
        //           me.pageConfig.isDzActive=false;
        //           console.log("lambda API err: ", err);
        //           if(!err.expired){
        //             me.$message.error('通信エラーが発生しました！');
        //             me.error();
        //           }
        //         })
        //       return true;
        //     }else{
        //       //get treedata failed
        //       me.pageConfig.isUploading=false;
        //       me.pageConfig.isDzActive=false;
        //       me.$message.error('エラーが発生しました！'+res.data.error.message);
        //       console.log('upload -> res.data.error', res.data.error);
        //       me.error();
        //     }
        //   })
        //   .catch(err => {
        //     me.pageConfig.isUploading=false;
        //     me.pageConfig.isDzActive=false;
        //     console.log("Insert DB err: ", err);
        //     if(!err.expired){
        //       me.$message.error('通信エラーが発生しました！');
        //       me.error();
        //     }
        //   });
    },
    previewFiles() {
      this.pageConfig.isPreview = true;
    },
    deleteFiles(items) {
      console.log('​deleteFiles -> items', items);
      this.refreshApigClient().then(()=>{
        evtBus.apigClient.reloApiVer100FilesDeletePost({},{items:items},evtBus.headers)
          .then(res => {
            if(!res.data.error){
              //success
              if(res.data.data.result_flg==0){
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
              this.$message.error('エラーが発生しました！'+res.data.error.message);
              console.log('​deleteFiles -> res.data.error', res.data.error);
              this.error();
            }
          })
          .catch(err => {
            console.log("err: ", err);
            if(!err.expired){
              this.$message.error('通信エラーが発生しました！');
              this.error();
            }
          });

      })      
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
        this.pageConfig.tableLoading = false;
        this.pageConfig.queryAsideLoading = false;
        this.pageConfig.isUpload = false;
        this.pageConfig.isPreview = false;
        this.pageConfig.isLoading = false;
      },
      resetAside(next) {
        this.respData.tableData=[];
        this.respData.treeData = [];
        this.reqData.queryFormAside={
          sOwner:'',
          sEstate:'',
          sTenant:''
        };
        this.respData.currentTree={
          owner_cd:'',
          estate_no:'',
          estate_nm:'',
          tenant_cd:'',
          tenant_nm:'',
        };
        if(next){
          let{to_date,doc_nm,free_format,manage_nm,sales_nm,comment,file_entry_user,dateRange,date_kbn} = this.reqData.queryFormTop;
          if(to_date||doc_nm||free_format||manage_nm||sales_nm||comment||file_entry_user||(dateRange && date_kbn)){
            this.queryTop();
          }
        }
      },
      resetTop(next){
        this.respData.tableData=[];
        this.reqData.queryFormTop={
          control: this.pageConfig.user.control,
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
        if(next){
          if(this.respData.currentTree.owner_cd){
            this.queryTop();
          }
        }
      },
      error(){
        this.clearAllCookies();
        this.clearCachedId();
        setTimeout(() => {
          this.resetAside(false);
          this.resetTop(false);
          this.$loading({lock: true});
          this.$loading({lock: true}).close();
          this.pageConfig.isUpload=false;
          this.pageConfig.isPreview=false;
          this.$router.push('/error');
        }, 1000);
      },
      logout() {
        let items={
          user_id:this.getCookie('user_id'),
          identityId:unescape(this.getCookie('identityId'))
        };
        this.refreshApigClient().then(()=>{
          evtBus.apigClient.reloApiVer100SignoutPost({},{items:items},evtBus.headers)
            .then(res => {
              if(!res.data.error){
                //success
                this.clearAllCookies();
                this.clearCachedId();
                this.$router.push('/login');
              }else{
                //logout failed
                this.$message.error('エラーが発生しました！'+res.data.error.message);
                console.log('logout -> res.data.error', res.data.error);
              }
            })
            .catch(err => {
              if(!err.expired){
                this.$message.error('通信エラーが発生しました！');
                console.log("err: ", err);
              }
            });
        })
        this.clearAllCookies();
        this.clearCachedId();
        this.resetAside(false);
        this.resetTop(false);
        this.pageConfig.isUpload=false;
        this.pageConfig.isPreview=false;
        this.$router.push('/login');
      }
    },
    computed: {
      ope_log_csvBtn(){
        let flg=!this.reqData.queryFormTop.dateRange;
        if(!flg){
          if(!this.reqData.queryFormTop.dateRange.length){
            flg=true;
          }
        }
        return flg;
      },
      // doc_nm_delay:{
      //   get() {
      //     return this.reqData.queryFormTop.doc_nm;
      //   },
      //   set: _.debounce(function(newVal){
      //     this.reqData.queryFormTop.doc_nm = newVal;
      //   }, 500)
      // },
      // free_format_delay:{
      //   get() {
      //     return this.reqData.queryFormTop.free_format;
      //   },
      //   set: _.debounce(function(newVal){
      //     this.reqData.queryFormTop.free_format = newVal;
      //   }, 500)
      // },
      // file_entry_user_delay:{
      //   get() {
      //     return this.reqData.queryFormTop.file_entry_user;
      //   },
      //   set: _.debounce(function(newVal){
      //     this.reqData.queryFormTop.file_entry_user = newVal;
      //   }, 500)
      // },
      // sales_nm_delay:{
      //   get() {
      //     return this.reqData.queryFormTop.sales_nm;
      //   },
      //   set: _.debounce(function(newVal){
      //     this.reqData.queryFormTop.sales_nm = newVal;
      //   }, 500)
      // },
      // manage_nm_delay:{
      //   get() {
      //     return this.reqData.queryFormTop.manage_nm;
      //   },
      //   set: _.debounce(function(newVal){
      //     this.reqData.queryFormTop.manage_nm = newVal;
      //   }, 500)
      // },
      queryTopSearchBtn(){
        // let flag = true;
        // if(this.respData.currentTree.owner_cd=='' || this.respData.currentTree.owner_cd==undefined){
        //   flag=false;
        // }else if(this.reqData.queryFormTop.comment!=''){
        //   flag=false;
        // }
        // return flag;
        return false;
      },
      tableData() {
        return this.respData.tableData.filter(data => {
          let tab = (this.pageConfig.currentTabName == '') ? true : data.business_kbn == this.pageConfig.currentTabName;
          // let {control,public_kbn,doc_nm,free_format,file_entry_user,sales_nm,manage_nm,comment,dateRange,date_kbn}=this.reqData.queryFormTop;
          // control=control==0 ? true : data.control==control;
          // public_kbn=public_kbn==0 ? true : data.public_kbn==public_kbn;
          // doc_nm=doc_nm=='' ? true : data.doc_nm.indexOf(doc_nm)>-1;
          // free_format=free_format=='' ? true : data.free_format.indexOf(free_format)>-1;
          // file_entry_user=file_entry_user=='' ? true : data.file_entry_user.indexOf(file_entry_user)>-1;
          // sales_nm=sales_nm=='' ? true : data.sales_nm.indexOf(sales_nm)>-1;
          // manage_nm=manage_nm=='' ? true : data.manage_nm.indexOf(manage_nm)>-1;
          // let date=true;
          // if(date_kbn!=0 && dateRange!=null ){
          //   if(dateRange.length){
          //     let start=moment(dateRange[0]).subtract(1,'day');
          //     let end=moment(dateRange[1]).subtract(-1,'day');
          //     date=moment(data.file_entry_date).isBetween(start,end);
          //   }
          // }
          // return (tab&&control&&public_kbn&&doc_nm&&free_format&&file_entry_user&&sales_nm&&manage_nm&&date)
          return tab;
        });
      },
      tableFlag(){
        return (this.respData.currentTree.owner_cd || this.respData.tableData.length>0);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->