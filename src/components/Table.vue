<template>
  <div>
    <div class="pagination-span">
      <el-pagination background layout="prev, pager, next" :total="200" style="display:inline-block;"></el-pagination>
      <span>（{{ totalRecords }}件中1-{{ totalRecords }}件表示）</span>
    </div>

    <el-table :row-class-name="tableRowClass" :data="tableData" :max-height="tableHeight" border fit v-loading="isLoading" :default-sort="{prop: 'uploadDate', order: 'descending'}"
      style="width: 100%">
      <el-table-column type="selection" min-width=40>
      </el-table-column>
      <el-table-column align="center" fixed prop="cmmt" min-width=50>
        <template slot-scope="scope">
          <el-popover v-if="scope.row.cmmt.length!=0" trigger="hover" placement="right-end" :open-delay=500>
            <p class="hover-text">注釈: {{ scope.row.cmmt[0].text }}</p>
            <div slot="reference" class="name-wrapper">
              <i class="far fa-comment" style="font-size: 20px"></i>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column sortable prop="filename" label="書類名" min-width=280 fixed>
        <template slot-scope="scope">
          <el-button type="text" size="medium" @click="previewFile(scope.row)">
            <i v-if="['xls','xlsx'].indexOf(scope.row.filetype)>-1" class="far fa-file-excel" style="font-size: 16px;"></i>
            <i v-else-if="scope.row.filetype=='pdf'" class="far fa-file-pdf" style="font-size: 16px;"></i>
            <i v-else-if="['doc','docx'].indexOf(scope.row.filetype)>-1" class="far fa-file-word" style="font-size: 16px;"></i>
            <i v-else-if="['jpg','png','bmp'].indexOf(scope.row.filetype)>-1" class="far fa-images" style="font-size: 16px;"></i>
            {{scope.row.filename | no_ext}} ({{scope.row.filesize}})
          </el-button>
        </template>
      </el-table-column>
      <el-table-column sortable show-overflow-tooltip prop="free" label="フリー" min-width=180>
      </el-table-column>
      <el-table-column sortable prop="uploadDate" label="登録日" min-width=120>
      </el-table-column>
      <el-table-column sortable prop="uploader" label="登録者" min-width=100>
      </el-table-column>
      <el-table-column sortable prop="salesman" label="営業担当" min-width=110>
      </el-table-column>
      <el-table-column sortable prop="manager" label="管理担当" min-width=110>
      </el-table-column>
      <el-table-column prop="owner" label="オーナー" min-width=110>
      </el-table-column>
      <el-table-column prop="propertyNo" label="物件NO." min-width=150>
      </el-table-column>
      <el-table-column prop="propertyName" label="物件名" min-width=150>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
  .el-pagination {
    vertical-align: middle;
  }

  .pagination-span {
    margin: 5px 0;
    vertical-align: middle;
  }

</style>

<script>
  export default {
    data() {
      return {
        isLoading: false,
        previewData: {}
      }
    },
    props: ['tableData', 'tableHeight', 'currentTabName'],
    methods: {
      tableRowClass({
        row,
        idx
      }) {
        if (row.type != this.currentTabName && this.currentTabName != '') {
          return 'unshow-row';
        } else if (row.isNew) {
          return 'success-row';
        }
      },
      previewFile(data) {
        this.previewData = data;
        this.$emit('preview', this.previewData);
      }
    },
    computed: {
      totalRecords: function () {
        let that = this,
          total = 0;
        if (that.currentTabName == '') {
          return that.tableData.length;
        }
        if (that.currentTabName == 'downloadList') {
          return 99999;
        }
        that.tableData.forEach(function (data) {
          if (data.type == that.currentTabName) {
            total++;
          }
        })
        return total;
      },
    },
  }

</script>
