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
            publicKbn: 0,
            doc: "",
            freeFormat: "",
            entryNm: "",
            salesNm: "",
            ManageNm: "",
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
            docNm:"2018053117005500.zip",
            url:"https://www.amazon.co.jp"
          },{
            docNm:"2018051117004531.zip",
            url:"https://www.google.co.jp"
          },{
            docNm:"2018022117003321.zip",
            url:"https://www.yahoo.co.jp"
          }],
        tableData: [{
            entryDate: '2018-04-03',
            docNm: '2018-rd-aaabbbcccddd.xls',
            filesize:'0.2MB',
            entryNm: '登録太郎',
            businessKbn:'jutaku',
            comment:[{
                userNm:'テスト秀吉',
                updateDate:'2018-05-07',
                text:'テスト秀吉からのコメント！テスト秀吉からのコメント！テスト秀吉からのコメント！テスト秀吉からのコメント！テスト秀吉からのコメント！テスト秀吉からのコメント！テスト秀吉からのコメント！テスト秀吉からのコメント！テスト秀吉からのコメント！テスト秀吉からのコメント！テスト秀吉からのコメント！テスト秀吉からのコメント！'
            },],
            freeFormat:'フリーテキスト',
            salesNm: '営業次郎',
            manageNm: '管理三郎',
            ownerNm: "オーナー",
            estateNo: "1234567890",
            estateNm: "物件名",
            isNew: false,
        }, {
            entryDate: '2018-02-03',
            docNm: '2018-rd-aaabbbcccddd.xls',
            filesize:'0.3MB',
            entryNm: '登録太郎',
            businessKbn:'jutaku',
            comment:[{
                userNm:'テスト太郎',
                updateDate:'2018-05-07',
                delPop:false,
                text:'テスト英二からのコメント！テスト英二からのコメント'
            },{
                userNm:'テスト秀吉',
                updateDate:'2018-05-07',
                delPop:false,
                text:'テスト英二からのコメント！'
            },],
            freeFormat:'フリーテキスト',
            salesNm: '営業次郎',
            manageNm: '管理三郎',
            ownerNm: "オーナー",
            estateNo: "1234567890",
            estateNm: "物件名",
            isNew: false,
        }, {
            entryDate: '2018-02-03',
            docNm: '2018-rd-aaabbbcccddd.xls',
            filesize:'0.4MB',
            entryNm: '登録太郎',
            businessKbn:'seiyaku',
            comment:[{
                userNm:'テスト太郎',
                updateDate:'2018-05-07',
                delPop:false,
                text:'テスト太郎からのコメント！'
            },{
                userNm:'テスト秀吉',
                updateDate:'2018-05-07',
                delPop:false,
                text:'テスト秀吉からのコメント！'
            },],
            freeFormat:'フリーテキスト',
            salesNm: '営業次郎',
            manageNm: '管理三郎',
            ownerNm: "オーナー",
            estateNo: "1234567890",
            estateNm: "物件名",
            isNew: false,
        }, {
            entryDate: '2018-02-03',
            docNm: '2017-rd-aaabbbcccddd.pdf',
            filesize:'0.5MB',
            entryNm: '登録太郎',
            businessKbn:'kouji',
            comment:[{
                userNm:'テスト花子',
                updateDate:'2018-05-07',
                delPop:false,
                text:'テスト花子からのコメント！'
            },{
                userNm:'テスト英二',
                updateDate:'2018-05-07',
                delPop:false,
                text:'テスト英二からのコメント！'
            },{
                userNm:'テスト太郎',
                updateDate:'2018-05-07',
                delPop:false,
                text:'テスト太郎からのコメント！'
            },{
                userNm:'テスト秀吉',
                updateDate:'2018-05-07',
                delPop:false,
                text:'テスト秀吉からのコメント！'
            },],
            freeFormat:'フリーテキスト',
            salesNm: '営業次郎',
            manageNm: '管理三郎',
            ownerNm: "オーナー",
            estateNo: "1234567890",
            estateNm: "物件名",
            isNew: false,
        }, {
            entryDate: '2018-02-03',
            docNm: '2018-rd-aaabbbcccddd.xls',
            filesize:'0.8MB',
            entryNm: '登録太郎',
            businessKbn:'kanri',
            comment:[{
                userNm:'テスト花子',
                updateDate:'2018-05-07',
                delPop:false,
                text:'テスト花子からのコメント！'
            },{
                userNm:'テスト英二',
                updateDate:'2018-05-07',
                delPop:false,
                text:'テスト英二からのコメント！'
            },{
                userNm:'テスト太郎',
                updateDate:'2018-05-07',
                delPop:false,
                text:'テスト太郎からのコメント！'
            },{
                userNm:'テスト秀吉',
                updateDate:'2018-05-07',
                delPop:false,
                text:'テスト秀吉からのコメント！'
            },],
            freeFormat:'フリーテキストフリーテキストフリーテキストフリーテキスト',
            salesNm: '営業次郎',
            manageNm: '管理三郎',
            ownerNm: "オーナー",
            estateNo: "1234567890",
            estateNm: "物件名",
            isNew: false,
        }, {
            entryDate: '2018-02-03',
            docNm: '2018-rd-aaabbbcccddd.xls',
            filesize:'1.3MB',
            entryNm: '登録太郎',
            businessKbn:'seiyaku',
            comment:[{
                userNm:'テスト英二',
                updateDate:'2018-05-07',
                delPop:false,
                text:'テスト英二からのコメント！'
            },{
                userNm:'テスト太郎',
                updateDate:'2018-05-07',
                delPop:false,
                text:'テスト太郎からのコメント！'
            },{
                userNm:'テスト秀吉',
                updateDate:'2018-05-07',
                delPop:false,
                text:'テスト秀吉からのコメント！'
            },],
            freeFormat:'フリーテキスト',
            salesNm: '営業次郎',
            manageNm: '管理三郎',
            ownerNm: "オーナー",
            estateNo: "1234567890",
            estateNm: "物件名",
            isNew: false,
        }, {
            entryDate: '2018-02-03',
            docNm: '2018-rd-aaabbbcccddd.xls',
            filesize:'2.3MB',
            entryNm: '登録太郎',
            businessKbn:'jutaku',
            comment:[{
                userNm:'テスト英二',
                updateDate:'2018-05-07',
                delPop:false,
                text:'テスト英二からのコメント！'
            },{
                userNm:'テスト太郎',
                updateDate:'2018-05-07',
                delPop:false,
                text:'テスト太郎からのコメント！'
            },{
                userNm:'テスト秀吉',
                updateDate:'2018-05-07',
                delPop:false,
                text:'テスト秀吉からのコメント！'
            },],
            freeFormat:'フリーテキストフリーテキストフリーテキストフリーテキストフリーテキスト',
            salesNm: '営業次郎',
            manageNm: '管理三郎',
            ownerNm: "オーナー",
            estateNo: "1234567890",
            estateNm: "物件名",
            isNew: false,
        }, {
            entryDate: '2018-02-03',
            docNm: '2018-rd-aaabbbcccddd.xls',
            filesize:'0.9MB',
            entryNm: '登録太郎',
            businessKbn:'kouji',
            comment:[],
            freeFormat:'フリーテキスト',
            salesNm: '営業次郎',
            manageNm: '管理三郎',
            ownerNm: "オーナー",
            estateNo: "1234567890",
            estateNm: "物件名",
            isNew: false,
        }, {
            entryDate: '2018-02-03',
            docNm: '2018-rd-aaabbbcccddd.xls',
            filesize:'0.1MB',
            entryNm: '登録太郎',
            businessKbn:'kaiyaku',
            comment:[{
                userNm:'テスト花子',
                updateDate:'2018-05-07',
                delPop:false,
                text:'テスト花子からのコメント！'
            },{
                userNm:'テスト英二',
                updateDate:'2018-05-07',
                delPop:false,
                text:'テスト英二からのコメント！'
            },{
                userNm:'テスト太郎',
                updateDate:'2018-05-07',
                delPop:false,
                text:'テスト太郎からのコメント！'
            },{
                userNm:'テスト秀吉',
                updateDate:'2018-05-07',
                delPop:false,
                text:'テスト秀吉からのコメント！'
            },],
            freeFormat:'フリーテキスト',
            salesNm: '営業次郎',
            manageNm: '管理三郎',
            ownerNm: "オーナー",
            estateNo: "1234567890",
            estateNm: "物件名",
            isNew: false,
        }, {
            entryDate: '2018-02-03',
            docNm: '2018-rd-aaabbbcccddd.xls',
            filesize:'1.7MB',
            entryNm: '登録太郎',
            businessKbn:'kaiyaku',
            comment:[],
            freeFormat:'フリーテキスト',
            salesNm: '営業次郎',
            manageNm: '管理三郎',
            ownerNm: "オーナー",
            estateNo: "1234567890",
            estateNm: "物件名",
            isNew: false,
        }, {
            entryDate: '2018-02-03',
            docNm: '2018-rd-aaabbbcccddd.xls',
            filesize:'0.3MB',
            entryNm: '登録太郎',
            businessKbn:'kanri',
            comment:[],
            freeFormat:'フリーテキスト',
            salesNm: '営業次郎',
            manageNm: '管理三郎',
            ownerNm: "オーナー",
            estateNo: "1234567890",
            estateNm: "物件名",
            isNew: false,
        }, {
            entryDate: '2017-02-03',
            docNm: '2018-rd-aaabbbcccddd.jpg',
            filesize:'2.2MB',
            entryNm: '登録太郎',
            businessKbn:'kanri',
            comment:[],
            freeFormat:'フリーテキスト',
            salesNm: '営業次郎',
            manageNm: '管理三郎',
            ownerNm: "オーナー",
            estateNo: "1234567890",
            estateNm: "物件名",
            isNew: false,
        }, ],
    }
}
export {
    demo
}