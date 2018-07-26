import moment from 'moment'
var demo={
    pageConfig:{
        asideWidth:260,
        dragbarHeight: window.innerHeight-120,
        user:{},
        isUpload: false,
        isPreview:false,
        cantPrev:true,
        cantDwld:true,
        cantDel:true,
        currentTabName:'',
        dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          headers: { "My-Awesome-Header": "header value" },
          addRemoveLinks: true,
          autoProcessQueue: false,
          dictDefaultMessage: '<img width="240px" height="60px" title="ファイルアップロード" src="https://s1.ax1x.com/2018/07/26/PNAxit.png" border="0" style="margin-top:5px;" />',
          previewTemplate: '<div style="display:none></div>',
          accept(file, done) {
            console.log(file);
            done();
          },
        },
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
        area: 0,
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
          tenant_cd:'',
        },
        auth_ptn:{},
        business_kbn:[],
        tableData: [],
        downloadList:[],
    }
}
export {
    demo
}