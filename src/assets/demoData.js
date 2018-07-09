import moment from 'moment'
var demo={
    pageConfig:{
        asideWidth:300,
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
            doc: "",
            free_format: "",
            entry_nm: "",
            sales_nm: "",
            manage_nm: "",
            comment: "",
            dateRange:[],
            dateKbn:0
        },
        queryFormAside:{
            sOwner:"",
            sEstate:"",
            sTenant:""
        },
    },
    respData:{
        treeData: [],
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
            entry_date: '2018-04-03',
            doc_nm: '2018-rd-aaabbbcccddd.xls',
            filesize:'0.2MB',
            entry_nm: '登録太郎',
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
            isNew: false,
        }, {
            entry_date: '2018-02-03',
            doc_nm: '2018-rd-aaabbbcccddd.xls',
            filesize:'0.3MB',
            entry_nm: '登録太郎',
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
            isNew: false,
        }, {
            entry_date: '2018-02-03',
            doc_nm: '2018-rd-aaabbbcccddd.xls',
            filesize:'0.4MB',
            entry_nm: '登録太郎',
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
            isNew: false,
        }, {
            entry_date: '2018-02-03',
            doc_nm: '2017-rd-aaabbbcccddd.pdf',
            filesize:'0.5MB',
            entry_nm: '登録太郎',
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
            isNew: false,
        }, {
            entry_date: '2018-02-03',
            doc_nm: '2018-rd-aaabbbcccddd.xls',
            filesize:'0.8MB',
            entry_nm: '登録太郎',
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
            isNew: false,
        }, {
            entry_date: '2018-02-03',
            doc_nm: '2018-rd-aaabbbcccddd.xls',
            filesize:'1.3MB',
            entry_nm: '登録太郎',
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
            isNew: false,
        }, {
            entry_date: '2018-02-03',
            doc_nm: '2018-rd-aaabbbcccddd.xls',
            filesize:'2.3MB',
            entry_nm: '登録太郎',
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
            isNew: false,
        }, {
            entry_date: '2018-02-03',
            doc_nm: '2018-rd-aaabbbcccddd.xls',
            filesize:'0.9MB',
            entry_nm: '登録太郎',
            business_kbn:'kouji',
            comment:[],
            free_format:'フリーテキスト',
            sales_nm: '営業次郎',
            manage_nm: '管理三郎',
            owner_nm: "オーナー",
            estate_no: "1234567890",
            estate_nm: "物件名",
            isNew: false,
        }, {
            entry_date: '2018-02-03',
            doc_nm: '2018-rd-aaabbbcccddd.xls',
            filesize:'0.1MB',
            entry_nm: '登録太郎',
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
            isNew: false,
        }, {
            entry_date: '2018-02-03',
            doc_nm: '2018-rd-aaabbbcccddd.xls',
            filesize:'1.7MB',
            entry_nm: '登録太郎',
            business_kbn:'kaiyaku',
            comment:[],
            free_format:'フリーテキスト',
            sales_nm: '営業次郎',
            manage_nm: '管理三郎',
            owner_nm: "オーナー",
            estate_no: "1234567890",
            estate_nm: "物件名",
            isNew: false,
        }, {
            entry_date: '2018-02-03',
            doc_nm: '2018-rd-aaabbbcccddd.xls',
            filesize:'0.3MB',
            entry_nm: '登録太郎',
            business_kbn:'kanri',
            comment:[],
            free_format:'フリーテキスト',
            sales_nm: '営業次郎',
            manage_nm: '管理三郎',
            owner_nm: "オーナー",
            estate_no: "1234567890",
            estate_nm: "物件名",
            isNew: false,
        }, {
            entry_date: '2017-02-03',
            doc_nm: '2018-rd-aaabbbcccddd.jpg',
            filesize:'2.2MB',
            entry_nm: '登録太郎',
            business_kbn:'kanri',
            comment:[],
            free_format:'フリーテキスト',
            sales_nm: '営業次郎',
            manage_nm: '管理三郎',
            owner_nm: "オーナー",
            estate_no: "1234567890",
            estate_nm: "物件名",
            isNew: false,
        }, ],
    }
}
export {
    demo
}