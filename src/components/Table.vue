<template>
  <div>
    <el-row>
      <el-select v-model="recordsPerPage.value" placeholder="選択してください" style="width: 100px;">
        <el-option v-for="option in recordsPerPage.options" :key="option.value" :label="option.label" :value="option.value">
        </el-option>
      </el-select>
      <el-button type="primary" @click="multiPreview" plain :disabled="cantPrev" style="margin-left: 3px">一括PV</el-button>
      <!-- <el-button type="primary" plain style="margin-left: 3px">公開/非公開</el-button> -->
      <el-button type="primary" @click="multiDownload" plain :disabled="cantDwld" style="margin-left: 3px">一括DL</el-button>
      <el-button type="primary" @click="multiDelete" plain :disabled="cantDel" style="margin-left: 3px">削除</el-button>
    </el-row>
    <div class="pagination-span">
      <el-pagination background layout="prev, pager, next" :total="200" style="display:inline-block;"></el-pagination>
      <span>（{{ totalRecords }}件中1-{{ totalRecords }}件表示）</span>
    </div>

    <el-table 
      :row-class-name="tableRowClass" 
      :data="tableData"
      :max-height="maxHeight"
      :default-sort="{prop: 'entry_date', order: 'descending'}"
      border fit v-loading="isLoading"
      @selection-change="select"
      style="width: 100%">
      <el-table-column type="selection" min-width=40>
      </el-table-column>
      <el-table-column align="center" fixed prop="comment" min-width=50>
        <template slot-scope="scope">
          <el-popover	v-if="scope.row.comment.length>0" trigger="hover" placement="right-end" :open-delay=500>
            <div :class="{'hover-text-after':(scope.row.comment[0].text.length>=100)}" class="hover-text">
              <strong>計{{scope.row.comment.length}}件:</strong> {{ scope.row.comment[0].text }}
            </div>
            <div slot="reference" class="name-wrapper">
              <i class="far fa-comment" style="font-size: 20px"></i>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column sortable prop="doc_nm" label="書類名" min-width=280 fixed>
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
      <el-table-column sortable prop="filesize" label="サイズ" min-width=90>
      </el-table-column>
      <el-table-column sortable show-overflow-tooltip prop="free_format" label="フリー" min-width=180>
      </el-table-column>
      <el-table-column sortable prop="entry_date" label="登録日" min-width=120>
      </el-table-column>
      <el-table-column sortable prop="entry_nm" label="登録者" min-width=100>
      </el-table-column>
      <el-table-column sortable prop="sales_nm" label="営業担当" min-width=110>
      </el-table-column>
      <el-table-column sortable prop="manage_nm" label="管理担当" min-width=110>
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
  import evtBus from '../assets/evtBus'
  export default {
    data() {
      return {
        isLoading: false,
        selectedItems:[],
        maxHeight:window.innerHeight-260,
        recordsPerPage: {
          value: 500,
          options: [{ value: 30, label: '30件' },
            { value: 100, label: '100件' },
            { value: 200, label: '200件' },
            { value: 500, label: '500件' }]
        },
      }
    },
    props: ['tableData'],
    methods: {
      select(selection,row){
        this.selectedItems=selection;
      },
      tableRowClass({row,idx}) {
        if (row.isNew) {
          return 'success-row';
        }
      },
      setRowKey(row){
        return row.key;
      },
      
      multiPreview(){
        let me=this;
        me.$emit('preview');
        Vue.nextTick(()=>evtBus.$emit('preview',me.selectedItems));
      },
      multiDownload(){

      },
      multiDelete(){
        this.$confirm('選択した項目を削除してもよろしいですか？', 'Warning', {
          confirmButtonText: '確定',
          cancelButtonText: 'キャンセル',
          type: 'warning'
        }).then(() => {
          this.$emit('delete',this.selectedItems);
        }).catch(() => {
          //canceled
          // this.$message({
          //   type: 'info',
          //   message: 'Delete canceled'
          // });          
        });
      },
      previewFile(data) {
        this.$emit('preview');
        Vue.nextTick(()=>evtBus.$emit('preview',[data]));
      }
    },
    mounted(){
      window.onresize = () => {
        this.maxHeight = window.innerHeight - 260;
      };
    },
    computed: {
      totalRecords () {
          return this.tableData.length;
      },
      cantDel(){
        return (this.selectedItems.length)? !(this.selectedItems.length>0 && this.selectedItems.length<=10):true
      },
      cantPrev(){
        return (this.selectedItems.length)? !(this.selectedItems.length>1 && this.selectedItems.length<=10):true
      },
      cantDwld(){
        return (this.selectedItems.length)? !(this.selectedItems.length>0 && this.selectedItems.length<=10):true
      },
    },
  }

</script>
