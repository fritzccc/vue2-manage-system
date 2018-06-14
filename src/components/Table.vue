<template>
  <div>
    <el-row>
      <el-select v-model="recordsPerPage.value" placeholder="選択してください" style="width: 100px;">
        <el-option v-for="option in recordsPerPage.options" :key="option.value" :label="option.label" :value="option.value">
        </el-option>
      </el-select>
      <el-button type="primary" @click="multiPreview" plain :disabled="cantPrev" style="margin-left: 3px">一括PV</el-button>
      <!-- <el-button type="primary" plain style="margin-left: 3px">公開/非公開</el-button> -->
      <el-button type="primary" plain :disabled="cantDwld" style="margin-left: 3px">一括DL</el-button>
      <el-button type="primary" plain :disabled="cantDel" style="margin-left: 3px">削除</el-button>
    </el-row>
    <div class="pagination-span">
      <el-pagination background layout="prev, pager, next" :total="200" style="display:inline-block;"></el-pagination>
      <span>（{{ totalRecords }}件中1-{{ totalRecords }}件表示）</span>
    </div>

    <el-table :row-class-name="tableRowClass" 
      :data="tableData" :max-height="tableHeight"
      row-key="setRowKey" 
      :default-sort="{prop: 'entryDate', order: 'descending'}"
      border fit v-loading="isLoading"
      @select="select" @select-all="selectAll"
      style="width: 100%">
      <el-table-column type="selection" min-width=40>
      </el-table-column>
      <el-table-column align="center" fixed prop="comment" min-width=50>
        <template slot-scope="scope">
          <el-popover	v-if="scope.row.comment.length!=0" trigger="hover" placement="right-end" :open-delay=500>
            <div :class="{'hover-text-after':(scope.row.comment[0].text.length>=100)}" class="hover-text">
              <strong>計{{scope.row.comment.length}}件:</strong> {{ scope.row.comment[0].text }}
            </div>
            <div slot="reference" class="name-wrapper">
              <i class="far fa-comment" style="font-size: 20px"></i>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column sortable prop="docNm" label="書類名" min-width=280 fixed>
        <template slot-scope="scope">
          <el-button type="text" size="medium" @click="previewFile(scope.row)">
            <i v-if="['xls','xlsx'].indexOf(scope.row.filetype)>-1" class="far fa-file-excel" style="font-size: 16px;"></i>
            <i v-else-if="scope.row.filetype=='pdf'" class="far fa-file-pdf" style="font-size: 16px;"></i>
            <i v-else-if="['doc','docx'].indexOf(scope.row.filetype)>-1" class="far fa-file-word" style="font-size: 16px;"></i>
            <i v-else-if="['jpg','png','bmp'].indexOf(scope.row.filetype)>-1" class="far fa-images" style="font-size: 16px;"></i>
            {{scope.row.docNm | no_ext}} 
          </el-button>
        </template>
      </el-table-column>
      <el-table-column sortable prop="filesize" label="サイズ" min-width=90>
      </el-table-column>
      <el-table-column sortable show-overflow-tooltip prop="freeFormat" label="フリー" min-width=180>
      </el-table-column>
      <el-table-column sortable prop="entryDate" label="登録日" min-width=120>
      </el-table-column>
      <el-table-column sortable prop="entryNm" label="登録者" min-width=100>
      </el-table-column>
      <el-table-column sortable prop="salesNm" label="営業担当" min-width=110>
      </el-table-column>
      <el-table-column sortable prop="manageNm" label="管理担当" min-width=110>
      </el-table-column>
      <el-table-column prop="ownerNm" label="オーナー" min-width=110>
      </el-table-column>
      <el-table-column prop="estateNo" label="物件NO." min-width=150>
      </el-table-column>
      <el-table-column prop="estateNm" label="物件名" min-width=150>
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
        selectedItems:null,
        cantDel:true,
        cantPrev:true,
        cantDwld:true,
      }
    },
    props: ['tableData', 'tableHeight', 'currentTabName','recordsPerPage'],
    methods: {
      select(selection,row){
        this.cantPrev=!(selection.length>1 && selection.length<=10);
        this.cantDwld=!(selection.length>0 && selection.length<=10);
        this.cantDel=!(selection.length>0 && selection.length<=10);
        this.selectedItems=selection;
      },
      selectAll(selection){
        this.cantPrev=!(selection.length>1 && selection.length<=10);
        this.cantDwld=!(selection.length>0 && selection.length<=10);
        this.cantDel=!(selection.length>0 && selection.length<=10);
        this.selectedItems=selection;
      },
      tableRowClass({
        row,
        idx
      }) {
        if (row.businessKbn != this.currentTabName && this.currentTabName != '') {
          return 'unshow-row';
        } else if (row.isNew) {
          return 'success-row';
        }
      },
      setRowKey(row){
        return row.key;
      },
      multiPreview(){
        let me=this;
        me.$emit('multi-preview');
        Vue.nextTick(()=>evtBus.$emit('multi-preview',me.selectedItems));
      },
      previewFile(data) {
        this.$emit('preview');
        Vue.nextTick(()=>evtBus.$emit('preview',data));
      }
    },
    computed: {
      totalRecords: function () {
        let me = this,
          total = 0;
        if (me.currentTabName == '') {
          return me.tableData.length;
        }
        if (me.currentTabName == 'downloadList') {
          return 99999;
        }
        me.tableData.forEach(function (data) {
          if (data.businessKbn == me.currentTabName) {
            total++;
          }
        })
        return total;
      },
    },
  }

</script>
