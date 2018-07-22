<template>
  <div>
      <!-- <el-select v-model="recordsPerPage.value" placeholder="選択してください" style="width: 100px;">
        <el-option v-for="option in recordsPerPage.options" :key="option.value" :label="option.label" :value="option.value">
        </el-option>
      </el-select> -->
    <el-button size="small" type="primary" @click="multiPreview" plain :disabled="cantPrev" style="margin-left: 3px">一括PV</el-button>
    <!-- <el-button type="primary" plain style="margin-left: 3px">公開/非公開</el-button> -->
    <el-button size="small" type="primary" @click="multiDownload" plain :disabled="cantDwld" style="margin-left: 3px">一括DL</el-button>
    <el-button size="small" type="primary" @click="multiDelete" plain :disabled="cantDel" style="margin-left: 3px">削除</el-button>
    <el-pagination
      background
      style="display:inline-block;margin-left:60px;"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="currentPage"
      :page-sizes="[50, 100, 200, 500]"
      :page-size="perPage"
      :pager-count="7"
      :total="totalRecords">
    </el-pagination>
    <!-- <div class="pagination-span">
      <el-pagination background layout="prev, pager, next" :total="200" style="display:inline-block;"></el-pagination>
      <span>（{{ totalRecords }}件中1-{{ totalRecords }}件表示）</span>
    </div> -->

    <el-table 
      ref="table"
      :row-class-name="tableRowClass" 
      :data="showTableData"
      :max-height="maxHeight"
      :default-sort="{prop: 'file_entry_date', order: 'descending'}"
      border fit v-loading="isLoading"
      @selection-change="select"
      @sort-change="handleSortChange"
      reserve-selection
      style="width: 100%;margin-top:5px;">
      <el-table-column type="selection" width=35>
      </el-table-column>
      <el-table-column align="center"  prop="comment" width=45 fixed>
        <template slot-scope="scope">
          <el-popover	v-if="scope.row.comment.length>0" trigger="hover" placement="right-end" :open-delay=500>
            <div :class="{'hover-text-after':(scope.row.comment[0].text.length>=100)}" class="hover-text">
              <strong>計{{scope.row.comment.length}}件:</strong> {{ scope.row.comment[0].text }}
            </div>
            <div slot="reference" class="name-wrapper">
              <i class="far fa-comment" style="font-size: 20px;"></i>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="doc_nm" label="書類名" min-width=280 fixed>
        <template slot-scope="scope">
          <el-button type="text" size="medium" @click="previewFile(scope.row)">
            <i v-if="['xls','xlsx'].indexOf(scope.row.filetype)>-1" class="far fa-file-excel" style="font-size: 16px;"></i>
            <i v-if="scope.row.filetype=='pdf'" class="far fa-file-pdf" style="font-size: 16px;"></i>
            <i v-if="['doc','docx'].indexOf(scope.row.filetype)>-1" class="far fa-file-word" style="font-size: 16px;"></i>
            <i v-if="['jpg','png','bmp','jpeg'].indexOf(scope.row.filetype)>-1" class="far fa-images" style="font-size: 16px;"></i>
            <!-- more ext v-if -->
            {{scope.row.doc_nm | no_ext}} 
          </el-button>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="file_size" label="サイズ" min-width=90>
        <template slot-scope="scope">
          {{scope.row.file_size}}MB
        </template>
      </el-table-column>
      <el-table-column sortable="custom" show-overflow-tooltip prop="free_format" label="フリー" min-width=180>
      </el-table-column>
      <el-table-column sortable="custom" prop="file_entry_date" label="登録日" min-width=120>
      </el-table-column>
      <el-table-column sortable="custom" prop="file_entry_user" label="登録者" min-width=100>
      </el-table-column>
      <el-table-column sortable="custom" prop="sales_nm" label="営業担当" min-width=110>
      </el-table-column>
      <el-table-column sortable="custom" prop="manage_nm" label="管理担当" min-width=110>
      </el-table-column>
      <el-table-column prop="owner_nm" label="オーナー" min-width=110>
      </el-table-column>
      <el-table-column prop="estate_no" label="物件NO." min-width=150>
      </el-table-column>
      <el-table-column prop="estate_nm" label="物件名" min-width=150>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
  .el-pagination {
    vertical-align: middle;
  }
  strong{
    color:#102E54;
  }
  .pagination-span {
    margin: 5px 0;
    vertical-align: middle;
  }
</style>

<script>
  import Vue from 'vue'
  import evtBus from '@/assets/evtBus'
  export default {
    data() {
      return {
        perPage:50,
        currentPage:1,
        isLoading: false,
        slicedTableData:[],
        showTableData:[],
        selectedItems:[],
        maxHeight:window.innerHeight-260,
        windowWidth:window.innerWidth
      }
    },
    props: ['tableData'],
    methods: {
      handleSortChange(stat){
        this.$emit('sort-change',stat);
      },
      sizeChange(perPage){
        this.isLoading=true;
        this.perPage=perPage;
        this.sliceTableData(this.tableData,this.perPage);
        this.showTableData=this.slicedTableData[0];
        var maxPage = Math.ceil(this.totalRecords / perPage);
        if (this.currentPage > maxPage)
          this.currentPage = maxPage;
        else
          this.showTableData=this.slicedTableData[this.currentPage-1];
        this.isLoading=false;        
      },
      sliceTableData(tableData,perPage){
        this.slicedTableData=[];
        for (let i=0;i<Math.ceil(tableData.length/perPage);i++) {
            let start = i*perPage;
            let end = start + perPage;
            this.slicedTableData.push(tableData.slice(start,end));
        }
        
        console.log('​sliceTableData -> done' );
      },
      currentChange(currentPage){
        this.isLoading=true;
        this.currentPage=currentPage;
        this.showTableData=this.slicedTableData[this.currentPage-1];
        this.isLoading=false;
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
        console.log('​previewFile -> row', row);
        this.$emit('preview');
        Vue.nextTick(()=>evtBus.$emit('preview',[row.file_id]));
      },
      multiPreview(){
        let me=this;
        me.$emit('preview');
        Vue.nextTick(()=>evtBus.$emit('preview',me.selectedFileId));
      },
      multiDownload(){

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
        this.maxHeight = window.innerHeight - 220;
        this.windowWidth=window.innerWidth;
      };
    },
    watch:{
      tableData:function(newVal,oldVal){
        this.currentPage=1;
        this.sliceTableData(this.tableData,this.perPage)
        this.showTableData=this.slicedTableData[0]
        console.log('tableData changed​');
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
        return (this.selectedItems.length)? !(this.selectedItems.length>0 && this.selectedItems.length<=10):true;
      },
      cantPrev(){
        return (this.selectedItems.length)? !(this.selectedItems.length>1 && this.selectedItems.length<=10):true;
      },
      cantDwld(){
        return (this.selectedItems.length)? !(this.selectedItems.length>0 && this.selectedItems.length<=10):true;
      },
      selectedFileId(){
        let items=[];
        this.selectedItems.forEach(item=>{
          items.push({file_id:item.file_id});
        });
        return items;
      }
    },
  }

</script>
