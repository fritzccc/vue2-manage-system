import moment from 'moment'
var demo={
    pageConfig:{
        asideWidth:260,
        dragbarHeight: window.innerHeight-120,
        user:{
          user_id:Math.random(),
          user_nm:'テスト花子',
          company_nm:'TEST株式会社',
          control:'名古屋',
          auth_ptn:{
            
          },
          status:0
        },
        isUpload: false,
        isPreview:false,
        cantPrev:true,
        cantDwld:true,
        cantDel:true,
        currentTabName:'',
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
        tabs:[{
            label:'受託',
            isSelected:false,
            name:'jutaku',
        },{
            label:'成約',
            isSelected:false,
            name:'seiyaku',
        },{
            label:'工事',
            isSelected:false,
            name:'kouji',
        },{
            label:'管理',
            isSelected:false,
            name:'kanri',
        },{
            label:'解約',
            isSelected:false,
            name:'kaiyaku',
        },{
            label:'指定なし',
            isSelected:true,
            name:'',
        },{
            label:'ダウンロードリスト',
            isSelected:false,
            name:'downloadList',
        }]
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
        dateRange:[],
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
        business_kbn:[{
          label:'受託',
          value:'jutaku',
          children:[{
            label:'受託受託受託受託１',
            value:1234455
          },{
            label:'受託２',
            value:32423423
          },{
            label:'受託３',
            value:32423
          }],
        },{
          label:'成約',
          value:'seiyaku',
          children:[{
            label:'成約１',
            value:2234324
          },{
            label:'成約２',
            value:345352
          },{
            label:'成約３',
            value:2452454
          }],
        },{
          label:'工事',
          value:'kouji',
          children:[{
            label:'工事１',
            value:6756756
          },{
            label:'工事２',
            value:87685767
          },{
            label:'工事３',
            value:45643453
          }],
        },{
          label:'管理',
          value:'kanri',
          children:[{
            label:'管理１',
            value:65764534
          },{
            label:'管理２',
            value:785643
          },{
            label:'管理３',
            value:24565758
          }],
        },],
        downloadList:[
          {
            doc_nm:"2018053117005500.zip",
            url:"https://www.amazon.co.jp"
          },{
            doc_nm:"2018051117004531.zip",
            url:"https://www.google.co.jp"
          },{
            doc_nm:"2018022117003321.zip",
            url:"https://www.yahoo.co.jp"
          }],
        tableData: [{
            file_entry_date: '2018-04-03',
            doc_nm: '2018-rd-aaabbbcccddd.xls',
            file_size:'0.2',
            file_id:Math.random(),
            file_entry_user: '登録太郎',
            business_kbn:'jutaku',
            comment:[{
                user_nm:'テスト秀吉',
                update_date:'2018-05-07',
                text:'テスト秀吉からのコメント！テスト秀吉からのコメント！テスト秀吉からのコメント！テスト秀吉からのコメント！テスト秀吉からのコメント！テスト秀吉からのコメント！テスト秀吉からのコメント！テスト秀吉からのコメント！テスト秀吉からのコメント！テスト秀吉からのコメント！テスト秀吉からのコメント！テスト秀吉からのコメント！'
            },],
            free_format:'フリーテキスト',
            sales_nm: '営業次郎',
            manage_nm: '管理三郎',
            owner_nm: "オーナー",
            estate_no: "1234567890",
            estate_nm: "物件名",
            
        }, {
            file_entry_date: '2018-02-03',
            doc_nm: '2018-rd-aaabbbcccddd.xls',
            file_size:'0.3',
            file_id:Math.random(),
            file_entry_user: '登録太郎',
            business_kbn:'jutaku',
            comment:[{
                user_nm:'テスト太郎',
                update_date:'2018-05-07',
                delPop:false,
                text:'テスト英二からのコメント！テスト英二からのコメント'
            },{
                user_nm:'テスト秀吉',
                update_date:'2018-05-07',
                delPop:false,
                text:'テスト英二からのコメント！'
            },],
            free_format:'フリーテキスト',
            sales_nm: '営業次郎',
            manage_nm: '管理三郎',
            owner_nm: "オーナー",
            estate_no: "1234567890",
            estate_nm: "物件名",
            
        }, {
            file_entry_date: '2018-06-03',
            doc_nm: '2018-rd-aaabbbcccddd.xls',
            file_size:'0.4',
            file_id:Math.random(),
            file_entry_user: '登録太郎',
            business_kbn:'seiyaku',
            comment:[{
                user_nm:'テスト太郎',
                update_date:'2018-05-07',
                delPop:false,
                text:'テスト太郎からのコメント！'
            },{
                user_nm:'テスト秀吉',
                update_date:'2018-05-07',
                delPop:false,
                text:'テスト秀吉からのコメント！'
            },],
            free_format:'フリーテキスト',
            sales_nm: '営業次郎',
            manage_nm: '管理三郎',
            owner_nm: "オーナー",
            estate_no: "1234567890",
            estate_nm: "物件名",
            
        }, {
            file_entry_date: '2018-02-03',
            doc_nm: '2017-rd-aaabbbcccddd.pdf',
            file_size:'0.5',
            file_id:Math.random(),
            file_entry_user: '登録太郎',
            business_kbn:'kouji',
            comment:[{
                user_nm:'テスト花子',
                update_date:'2018-05-07',
                delPop:false,
                text:'テスト花子からのコメント！'
            },{
                user_nm:'テスト英二',
                update_date:'2018-05-07',
                delPop:false,
                text:'テスト英二からのコメント！'
            },{
                user_nm:'テスト太郎',
                update_date:'2018-05-07',
                delPop:false,
                text:'テスト太郎からのコメント！'
            },{
                user_nm:'テスト秀吉',
                update_date:'2018-05-07',
                delPop:false,
                text:'テスト秀吉からのコメント！'
            },],
            free_format:'フリーテキスト',
            sales_nm: '営業次郎',
            manage_nm: '管理三郎',
            owner_nm: "オーナー",
            estate_no: "1234567890",
            estate_nm: "物件名",
            
        }, {
            file_entry_date: '2018-02-03',
            doc_nm: '2018-rd-aaabbbcccddd.xls',
            file_size:'0.8',
            file_id:Math.random(),
            file_entry_user: '登録太郎',
            business_kbn:'kanri',
            comment:[{
                user_nm:'テスト花子',
                update_date:'2018-05-07',
                delPop:false,
                text:'テスト花子からのコメント！'
            },{
                user_nm:'テスト英二',
                update_date:'2018-05-07',
                delPop:false,
                text:'テスト英二からのコメント！'
            },{
                user_nm:'テスト太郎',
                update_date:'2018-05-07',
                delPop:false,
                text:'テスト太郎からのコメント！'
            },{
                user_nm:'テスト秀吉',
                update_date:'2018-05-07',
                delPop:false,
                text:'テスト秀吉からのコメント！'
            },],
            free_format:'フリーテキストフリーテキストフリーテキストフリーテキスト',
            sales_nm: '営業次郎',
            manage_nm: '管理三郎',
            owner_nm: "オーナー",
            estate_no: "1234567890",
            estate_nm: "物件名",
            
        }, {
            file_entry_date: '2018-02-03',
            doc_nm: '2018-rd-aaabbbcccddd.xls',
            file_size:'1.3',
            file_id:Math.random(),
            file_entry_user: '登録太郎',
            business_kbn:'seiyaku',
            comment:[{
                user_nm:'テスト英二',
                update_date:'2018-05-07',
                delPop:false,
                text:'テスト英二からのコメント！'
            },{
                user_nm:'テスト太郎',
                update_date:'2018-05-07',
                delPop:false,
                text:'テスト太郎からのコメント！'
            },{
                user_nm:'テスト秀吉',
                update_date:'2018-05-07',
                delPop:false,
                text:'テスト秀吉からのコメント！'
            },],
            free_format:'フリーテキスト',
            sales_nm: '営業次郎',
            manage_nm: '管理三郎',
            owner_nm: "オーナー",
            estate_no: "1234567890",
            estate_nm: "物件名",
            
        }, {
            file_entry_date: '2018-02-03',
            doc_nm: '2018-rd-aaabbbcccddd.xls',
            file_size:'2.3',
            file_id:Math.random(),
            file_entry_user: '登録太郎',
            business_kbn:'jutaku',
            comment:[{
                user_nm:'テスト英二',
                update_date:'2018-05-07',
                delPop:false,
                text:'テスト英二からのコメント！'
            },{
                user_nm:'テスト太郎',
                update_date:'2018-05-07',
                delPop:false,
                text:'テスト太郎からのコメント！'
            },{
                user_nm:'テスト秀吉',
                update_date:'2018-05-07',
                delPop:false,
                text:'テスト秀吉からのコメント！'
            },],
            free_format:'フリーテキストフリーテキストフリーテキストフリーテキストフリーテキスト',
            sales_nm: '営業次郎',
            manage_nm: '管理三郎',
            owner_nm: "オーナー",
            estate_no: "1234567890",
            estate_nm: "物件名",
            
        }, {
            file_entry_date: '2018-02-03',
            doc_nm: '2018-rd-aaabbbcccddd.xls',
            file_size:'0.9',
            file_id:Math.random(),
            file_entry_user: '登録太郎',
            business_kbn:'kouji',
            comment:[],
            free_format:'フリーテキスト',
            sales_nm: '営業次郎',
            manage_nm: '管理三郎',
            owner_nm: "オーナー",
            estate_no: "1234567890",
            estate_nm: "物件名",
            
        }, {
            file_entry_date: '2018-02-03',
            doc_nm: '2018-rd-aaabbbcccddd.xls',
            file_size:'0.1',
            file_id:Math.random(),
            file_entry_user: '登録太郎',
            business_kbn:'kaiyaku',
            comment:[{
                user_nm:'テスト花子',
                update_date:'2018-05-07',
                delPop:false,
                text:'テスト花子からのコメント！'
            },{
                user_nm:'テスト英二',
                update_date:'2018-05-07',
                delPop:false,
                text:'テスト英二からのコメント！'
            },{
                user_nm:'テスト太郎',
                update_date:'2018-05-07',
                delPop:false,
                text:'テスト太郎からのコメント！'
            },{
                user_nm:'テスト秀吉',
                update_date:'2018-05-07',
                delPop:false,
                text:'テスト秀吉からのコメント！'
            },],
            free_format:'フリーテキスト',
            sales_nm: '営業次郎',
            manage_nm: '管理三郎',
            owner_nm: "オーナー",
            estate_no: "1234567890",
            estate_nm: "物件名",
            
        }, {
            file_entry_date: '2018-02-03',
            doc_nm: '2018-rd-aaabbbcccddd.xls',
            file_size:'1.7',
            file_id:Math.random(),
            file_entry_user: '登録太郎',
            business_kbn:'kaiyaku',
            comment:[],
            free_format:'フリーテキスト',
            sales_nm: '営業次郎',
            manage_nm: '管理三郎',
            owner_nm: "オーナー",
            estate_no: "1234567890",
            estate_nm: "物件名",
            
        }, {
            file_entry_date: '2018-02-03',
            doc_nm: '2018-rd-aaabbbcccddd.xls',
            file_size:'0.3',
            file_id:Math.random(),
            file_entry_user: '登録太郎',
            business_kbn:'kanri',
            comment:[],
            free_format:'フリーテキスト',
            sales_nm: '営業次郎',
            manage_nm: '管理三郎',
            owner_nm: "オーナー",
            estate_no: "1234567890",
            estate_nm: "物件名",
            
        }, {
            file_entry_date: '2017-02-03',
            doc_nm: '2018-rd-aaabbbcccddd.jpg',
            file_size:'2.2',
            file_id:Math.random(),
            file_entry_user: '登録太郎',
            business_kbn:'kanri',
            comment:[],
            free_format:'フリーテキスト',
            sales_nm: '営業次郎',
            manage_nm: '管理三郎',
            owner_nm: "オーナー",
            estate_no: "1234567890",
            estate_nm: "物件名",
            
        }, ],
    }
}
export {
    demo
}