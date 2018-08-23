<template>
  <div>
    <el-button v-if="authPtn.bulk_preview==1" size="small" type="primary" @click="multiPreview" plain :disabled="cantPrev" style="margin-left: 3px">一括PV</el-button>
    <!-- <el-button type="primary" plain style="margin-left: 3px">公開/非公開</el-button> -->
    <el-button v-if="authPtn.file_bulk_dl==1" size="small" type="primary" @click="multiDownload" plain :disabled="cantDwld" style="margin-left: 3px">一括DL</el-button>
    <el-button v-if="authPtn.file_delete==1" size="small" type="primary" @click="multiDelete" plain :disabled="cantDel" style="margin-left: 3px">削除</el-button>
    <el-pagination
      v-if="tableFlag"
      background 
      style="display:inline-block;margin-left:20px;padding:0px;"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="currentPage"
      :page-sizes="[10, 30, 50, 100, 200]"
      :page-size="perPage"
      :pager-count="7"
      :total="totalRecords">
    </el-pagination>
    <el-table 
      ref="table"
      :row-class-name="tableRowClass"
      :row-key="getRowKey"
      :data="showTableData"
      :max-height="maxHeight"
      :default-sort="{prop: 'file_entry_date', order: 'descending'}"
      border fit v-loading="loading"
      @selection-change="select"
      @sort-change="handleSortChange"
      reserve-selection
      style="width: 100%;margin-top:5px;">
      <el-table-column type="selection" width=40>
      </el-table-column>
      <el-table-column align="center"  prop="comment" width=45 fixed>
        <template slot-scope="scope">
<!--          <el-popover	v-if="scope.row.comment.length>0" trigger="hover" placement="right-end" :open-delay=500>
            <div :class="{'hover-text-after':(scope.row.comment[0].text.length>=100)}" class="hover-text">
              <strong>計{{scope.row.comment.length}}件:</strong> {{ scope.row.comment[0].text }}
            </div>
            <div slot="reference" class="name-wrapper">
              <i class="far fa-comment" style="font-size: 20px;"></i>
            </div>
          </el-popover>-->
          <el-popover	v-if="scope.row.comment_count>0" trigger="hover" placement="right-end" :open-delay=500>
            <div class="hover-text" :class="{'hover-text-after':(scope.row.comment.length>=100)}">
              <span><strong>計{{scope.row.comment_count}}件:</strong></span> {{ scope.row.comment }}
            </div>
            <div slot="reference" style="color:#102e54;" class="name-wrapper">
              <fa-icon :icon="['far', 'comment']" size="lg"></fa-icon>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="doc_nm" label="書類名" min-width=270 fixed>
        <template slot-scope="scope">
            <fa-icon  v-if="['xls','xlsx','xlsm'].indexOf(scope.row.file_ext)>-1" :icon="['far', 'file-excel']" size="lg"></fa-icon>
            <fa-icon  v-else-if="['doc','docx'].indexOf(scope.row.file_ext)>-1" :icon="['far', 'file-word']" size="lg"></fa-icon>
            <fa-icon  v-else-if="['ppt','pptx'].indexOf(scope.row.file_ext)>-1" :icon="['far', 'file-powerpoint']" size="lg"></fa-icon>
            <fa-icon  v-else-if="['pdf'].indexOf(scope.row.file_ext)>-1" :icon="['far', 'file-pdf']" size="lg"></fa-icon>
            <fa-icon  v-else-if="['ai','jpg','png','bmp','jpeg','gif','eps','heic','ps','psd','svg','tif','tiff','dcm','dicm','dicom','svs','tga'].indexOf(scope.row.file_ext)>-1" :icon="['far', 'file-image']" size="lg"></fa-icon>
            <fa-icon  v-else-if="['flv','vob','swf','3g2','3gp','avi','m2v','m2ts','m4v','mkv','mov','mp4','mpeg','mpg','ogg','mts','qt','wmv'].indexOf(scope.row.file_ext)>-1" :icon="['far', 'file-video']" size="lg"></fa-icon>
            <fa-icon  v-else-if="['mp3','ogg','wav','flac','ape','aac'].indexOf(scope.row.file_ext)>-1" :icon="['far', 'file-audio']" size="lg"></fa-icon>
            <fa-icon  v-else-if="['py','html','htm','java','rb','js','css','yml','json'].indexOf(scope.row.file_ext)>-1" :icon="['far', 'file-code']" size="lg"></fa-icon>
            <fa-icon  v-else-if="['zip','rar','7z','iso','gz','tar','bz2'].indexOf(scope.row.file_ext)>-1" :icon="['far', 'file-archive']" size="lg"></fa-icon>
            <fa-icon  v-else :icon="['far', 'file-alt']" size="lg"></fa-icon>
            <!-- more ext v-if -->
            <!-- {{scope.row.doc_nm | no_ext}}  -->
          <span class="doc-name" @click="previewFile(scope.row)">
            {{scope.row.doc_nm}} 
          </span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" show-overflow-tooltip prop="free_format" label="書類名補足" min-width=180>
      </el-table-column>
      <el-table-column sortable="custom" prop="file_size" label="サイズ" min-width=100>
        <template slot-scope="scope">
          {{scope.row.file_size}}MB
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="file_entry_date" label="登録日" min-width=100>
      </el-table-column>
      <el-table-column sortable="custom" prop="file_entry_user" label="登録者" min-width=120>
      </el-table-column>
      <el-table-column sortable="custom" prop="sales_nm" label="営業担当" min-width=120>
      </el-table-column>
      <el-table-column sortable="custom" prop="manage_nm" label="管理担当" min-width=120>
      </el-table-column>
      <el-table-column prop="owner_cd" label="オーナー" min-width=120>
      </el-table-column>
      <el-table-column prop="estate_no" label="物件No" min-width=120>
      </el-table-column>
      <el-table-column prop="estate_nm" label="物件名" min-width=210>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
  strong{
    color:#102E54;
  }
  .doc-name{
    line-height: 30px;
    font-weight: 500;
    color: #102E54;
    cursor: pointer;
    font-size: 14px;
    padding: 2px;
  }
</style>

<script>
  import Vue from 'vue'
  import evtBus from '@/assets/evtBus'
  export default {
    data() {
      return {
        perPage:30,
        currentPage:1,
        slicedTableData:[],
        showTableData:[],
        selectedItems:[],
        maxHeight:window.innerHeight-210,
        windowWidth:window.innerWidth
      }
    },
    props: ['tableData','authPtn','loading','tableFlag'],
    methods: {
      getRowKey(row){
        return row.file_id;
      },
      handleSortChange(stat){
        this.$emit('sort-change',stat);
      },
      sizeChange(perPage){
        this.perPage=perPage;
        this.sliceTableData(this.tableData,this.perPage);
        this.showTableData=this.slicedTableData[0];
        var maxPage = Math.ceil(this.totalRecords / perPage);
        if (this.currentPage > maxPage)
          this.currentPage = maxPage;
        else
          this.showTableData=this.slicedTableData[this.currentPage-1];    
      },
      sliceTableData(tableData,perPage){
        this.slicedTableData=[];
        for (let i=0;i<Math.ceil(tableData.length/perPage);i++) {
            let start = i*perPage;
            let end = start + perPage;
            this.slicedTableData.push(tableData.slice(start,end));
        }        
      },
      currentChange(currentPage){
        this.currentPage=currentPage;
        this.showTableData=this.slicedTableData[this.currentPage-1];
      },
      select(selection,row){
        this.selectedItems=selection;
      },
      tableRowClass({row,idx}) {
        if (row.isNew) {
          return 'success-row';
        }
      },
      previewFile(row) {
        let me=this;
        me.$emit('preview');
        Vue.nextTick(()=>{
          evtBus.$emit('preview',[{file_id:row.file_id}]);
        });
      },
      multiPreview(){
        let me=this;
        me.$emit('preview');
        Vue.nextTick(()=>{
          evtBus.$emit('preview',me.selectedFileId);
        });
      },
      multiDownload(){
        this.$emit('multi-download',this.selectedFileId)
      },
      multiDelete(){
        this.$confirm('選択した項目を削除してもよろしいですか？', '注意', {
          confirmButtonText: '確定',
          cancelButtonText: 'キャンセル',
          type: 'warning'
        }).then(() => {
          this.$emit('delete',this.selectedFileId);
        }).catch(() => {
          //canceled
          // this.$message({
          //   type: 'info',
          //   message: 'Delete canceled'
          // });
        });
      }
    },
    mounted(){
      window.onresize = () => {
        this.maxHeight = window.innerHeight - 210;
        this.windowWidth=window.innerWidth;
      };
    },
    watch:{
      tableData:function(newVal,oldVal){
        this.currentPage=1;
        this.sliceTableData(this.tableData,this.perPage);
        this.showTableData=this.slicedTableData[0];
      }
    },
    computed: {
      totalRecords () {
        return this.tableData.length;
      },
      // showTableData(){
      //   let offset = (this.currentPage-1)*this.perPage;
      //   return (offset + this.perPage >= this.tableData.length) ? this.tableData.slice(offset, this.tableData.length) : this.tableData.slice(offset, offset + this.perPage);
      // },
      cantDel(){
        // return (this.selectedItems.length)? !(this.selectedItems.length>0 && this.selectedItems.length<=10):true;
        return (this.selectedItems.length)? !(this.selectedItems.length>0):true;
      },
      cantPrev(){
        return (this.selectedItems.length)? !(this.selectedItems.length>0 && this.selectedItems.length<=10):true;
      },
      cantDwld(){
        return (this.selectedItems.length)? !(this.selectedItems.length>0 && this.selectedItems.length<=10):true;
      },
      selectedFileId(){
        let items=[];
        this.selectedItems.forEach(item=>{
          items.push({file_id:item.file_id});
        });
        console.log("items:",items);
        return items;
      }
    },
  }

</script>
