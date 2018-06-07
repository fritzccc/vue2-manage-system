var demo={
    pageConfig:{
        asideWidth:300,
        loginUser: 'テスト花子',
        tableHeight:window.innerHeight-290,
        isUpload: false,
        isPreview:false,
        currentTabName:'',
        recordsPerPage: {
            value: 500,
            options: [{ value: 30, label: '30件' },
                { value: 100, label: '100件' },
                { value: 200, label: '200件' },
                { value: 500, label: '500件' }]
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
            openStatus: 0,
            doc: "",
            free: "",
            uploader: "",
            salesman: "",
            manager: "",
            comment: "",
            date: {
                index: 0,
                range: "",
                options: [
                    { value: 1, label: '過去1週間' },
                    { value: 2, label: '過去1ヶ月' },
                    { value: 3, label: '過去1年' },
                    { value: 0, label: '期間を指定' },
                ]
            },
        },
        queryFormAside:{
            owner:"",
            property:"",
            guest:""
        },
        previewData:{},
        uploadForm:{
            checked:false,
            files:[],
            form:[{
                    cmmt: [{
                        uploader:'',
                        updateDate:'',
                        text:'',
                    }],
                    filename: '',
                    filesize:'',
                    fileinfo:'',
                    free: '',
                    uploader: '',
                    uploadDate: '',
                    owner:'オーナー既定値',
                    property:'物件名既定値',
                    guest:'入居者既定値',
                    salesman: '営業担当既定値',
                    manager: '管理担当既定値',
                    type:'',
                    data:''
                },{
                    cmmt: [{
                        uploader:'',
                        updateDate:'',
                        text:'',
                    }],
                    filename: '',
                    filesize:'',
                    fileinfo:'',
                    free: '',
                    uploader: '',
                    updateDate: '',
                    owner:'オーナー既定値',
                    property:'物件名既定値',
                    guest:'入居者既定値',
                    salesman: '営業担当既定値',
                    manager: '管理担当既定値',
                    type:'',
                    data:''
                },{
                    cmmt: [{
                        uploader:'',
                        updateDate:'',
                        text:'',
                    }],
                    filename: '',
                    filesize:'',
                    fileinfo:'',
                    free: '',
                    uploader: '',
                    uploadDate: '',
                    owner:'オーナー既定値',
                    property:'物件名既定値',
                    guest:'入居者既定値',
                    salesman: '営業担当既定値',
                    manager: '管理担当既定値',
                    type:'',
                    data:''
                },{
                    cmmt: [{
                        uploader:'',
                        updateDate:'',
                        text:'',
                    }],
                    filename: '',
                    filesize:'',
                    fileinfo:'',
                    free: '',
                    uploader: '',
                    uploadDate: '',
                    owner:'オーナー既定値',
                    property:'物件名既定値',
                    guest:'入居者既定値',
                    salesman: '営業担当既定値',
                    manager: '管理担当既定値',
                    type:'',
                    data:''
                },{
                    cmmt: [{
                        uploader:'',
                        updateDate:'',
                        text:'',
                    }],
                    filename: '',
                    filesize:'',
                    fileinfo:'',
                    free: '',
                    uploader: '',
                    uploadDate: '',
                    owner:'オーナー既定値',
                    property:'物件名既定値',
                    guest:'入居者既定値',
                    salesman: '営業担当既定値',
                    manager: '管理担当既定値',
                    type:'',
                    data:''
                },
            ]
        }
    },
    respData:{
        treeData: [],
        downloadList:[
          {
            filename:"2018053117005500.zip",
            url:"https://www.amazon.co.jp"
          },{
            filename:"2018051117004531.zip",
            url:"https://www.google.co.jp"
          },{
            filename:"2018022117003321.zip",
            url:"https://www.yahoo.co.jp"
          }],
        tableData: [{
            uploadDate: '2018-04-03',
            filename: '2018-rd-aaabbbcccddd.xls',
            filesize:'0.3MB',
            uploader: '登録太郎',
            type:'jutaku',
            cmmt:[{
                uploader:'テスト秀吉',
                updateDate:'2018-05-07',
                text:'テスト秀吉からのコメント！テスト秀吉からのコメント！テスト秀吉からのコメント！テスト秀吉からのコメント！テスト秀吉からのコメント！テスト秀吉からのコメント！'
            },],
            free:'フリーテキスト',
            salesman: '営業次郎',
            manager: '管理三郎',
            owner: "オーナー",
            propertyNo: "1234567890",
            propertyName: "物件名",
            isNew: false,
        }, {
            uploadDate: '2018-02-03',
            filename: '2018-rd-aaabbbcccddd.xls',
            filesize:'0.3MB',
            uploader: '登録太郎',
            type:'jutaku',
            cmmt:[{
                uploader:'テスト太郎',
                updateDate:'2018-05-07',
                text:'テスト英二からのコメント！'
            },{
                uploader:'テスト秀吉',
                updateDate:'2018-05-07',
                text:'テスト英二からのコメント！'
            },],
            free:'フリーテキスト',
            salesman: '営業次郎',
            manager: '管理三郎',
            owner: "オーナー",
            propertyNo: "1234567890",
            propertyName: "物件名",
            isNew: false,
        }, {
            uploadDate: '2018-02-03',
            filename: '2018-rd-aaabbbcccddd.xls',
            filesize:'0.3MB',
            uploader: '登録太郎',
            type:'seiyaku',
            cmmt:[{
                uploader:'テスト太郎',
                updateDate:'2018-05-07',
                text:'テスト太郎からのコメント！'
            },{
                uploader:'テスト秀吉',
                updateDate:'2018-05-07',
                text:'テスト秀吉からのコメント！'
            },],
            free:'フリーテキスト',
            salesman: '営業次郎',
            manager: '管理三郎',
            owner: "オーナー",
            propertyNo: "1234567890",
            propertyName: "物件名",
            isNew: false,
        }, {
            uploadDate: '2018-02-03',
            filename: '2017-rd-aaabbbcccddd.pdf',
            filesize:'0.3MB',
            uploader: '登録太郎',
            type:'kouji',
            cmmt:[{
                uploader:'テスト花子',
                updateDate:'2018-05-07',
                text:'テスト花子からのコメント！'
            },{
                uploader:'テスト英二',
                updateDate:'2018-05-07',
                text:'テスト英二からのコメント！'
            },{
                uploader:'テスト太郎',
                updateDate:'2018-05-07',
                text:'テスト太郎からのコメント！'
            },{
                uploader:'テスト秀吉',
                updateDate:'2018-05-07',
                text:'テスト秀吉からのコメント！'
            },],
            free:'フリーテキスト',
            salesman: '営業次郎',
            manager: '管理三郎',
            owner: "オーナー",
            propertyNo: "1234567890",
            propertyName: "物件名",
            isNew: false,
        }, {
            uploadDate: '2018-02-03',
            filename: '2018-rd-aaabbbcccddd.xls',
            filesize:'0.3MB',
            uploader: '登録太郎',
            type:'kanri',
            cmmt:[{
                uploader:'テスト花子',
                updateDate:'2018-05-07',
                text:'テスト花子からのコメント！'
            },{
                uploader:'テスト英二',
                updateDate:'2018-05-07',
                text:'テスト英二からのコメント！'
            },{
                uploader:'テスト太郎',
                updateDate:'2018-05-07',
                text:'テスト太郎からのコメント！'
            },{
                uploader:'テスト秀吉',
                updateDate:'2018-05-07',
                text:'テスト秀吉からのコメント！'
            },],
            free:'フリーテキストフリーテキストフリーテキストフリーテキスト',
            salesman: '営業次郎',
            manager: '管理三郎',
            owner: "オーナー",
            propertyNo: "1234567890",
            propertyName: "物件名",
            isNew: false,
        }, {
            uploadDate: '2018-02-03',
            filename: '2018-rd-aaabbbcccddd.xls',
            filesize:'0.3MB',
            uploader: '登録太郎',
            type:'seiyaku',
            cmmt:[{
                uploader:'テスト英二',
                updateDate:'2018-05-07',
                text:'テスト英二からのコメント！'
            },{
                uploader:'テスト太郎',
                updateDate:'2018-05-07',
                text:'テスト太郎からのコメント！'
            },{
                uploader:'テスト秀吉',
                updateDate:'2018-05-07',
                text:'テスト秀吉からのコメント！'
            },],
            free:'フリーテキスト',
            salesman: '営業次郎',
            manager: '管理三郎',
            owner: "オーナー",
            propertyNo: "1234567890",
            propertyName: "物件名",
            isNew: false,
        }, {
            uploadDate: '2018-02-03',
            filename: '2018-rd-aaabbbcccddd.xls',
            filesize:'0.3MB',
            uploader: '登録太郎',
            type:'jutaku',
            cmmt:[{
                uploader:'テスト英二',
                updateDate:'2018-05-07',
                text:'テスト英二からのコメント！'
            },{
                uploader:'テスト太郎',
                updateDate:'2018-05-07',
                text:'テスト太郎からのコメント！'
            },{
                uploader:'テスト秀吉',
                updateDate:'2018-05-07',
                text:'テスト秀吉からのコメント！'
            },],
            free:'フリーテキストフリーテキストフリーテキストフリーテキストフリーテキスト',
            salesman: '営業次郎',
            manager: '管理三郎',
            owner: "オーナー",
            propertyNo: "1234567890",
            propertyName: "物件名",
            isNew: false,
        }, {
            uploadDate: '2018-02-03',
            filename: '2018-rd-aaabbbcccddd.xls',
            filesize:'0.3MB',
            uploader: '登録太郎',
            type:'kouji',
            cmmt:[],
            free:'フリーテキスト',
            salesman: '営業次郎',
            manager: '管理三郎',
            owner: "オーナー",
            propertyNo: "1234567890",
            propertyName: "物件名",
            isNew: false,
        }, {
            uploadDate: '2018-02-03',
            filename: '2018-rd-aaabbbcccddd.xls',
            filesize:'0.3MB',
            uploader: '登録太郎',
            type:'kaiyaku',
            cmmt:[{
                uploader:'テスト花子',
                updateDate:'2018-05-07',
                text:'テスト花子からのコメント！'
            },{
                uploader:'テスト英二',
                updateDate:'2018-05-07',
                text:'テスト英二からのコメント！'
            },{
                uploader:'テスト太郎',
                updateDate:'2018-05-07',
                text:'テスト太郎からのコメント！'
            },{
                uploader:'テスト秀吉',
                updateDate:'2018-05-07',
                text:'テスト秀吉からのコメント！'
            },],
            free:'フリーテキスト',
            salesman: '営業次郎',
            manager: '管理三郎',
            owner: "オーナー",
            propertyNo: "1234567890",
            propertyName: "物件名",
            isNew: false,
        }, {
            uploadDate: '2018-02-03',
            filename: '2018-rd-aaabbbcccddd.xls',
            filesize:'0.3MB',
            uploader: '登録太郎',
            type:'kaiyaku',
            cmmt:[],
            free:'フリーテキスト',
            salesman: '営業次郎',
            manager: '管理三郎',
            owner: "オーナー",
            propertyNo: "1234567890",
            propertyName: "物件名",
            isNew: false,
        }, {
            uploadDate: '2018-02-03',
            filename: '2018-rd-aaabbbcccddd.xls',
            filesize:'0.3MB',
            uploader: '登録太郎',
            type:'kanri',
            cmmt:[],
            free:'フリーテキスト',
            salesman: '営業次郎',
            manager: '管理三郎',
            owner: "オーナー",
            propertyNo: "1234567890",
            propertyName: "物件名",
            isNew: false,
        }, {
            uploadDate: '2017-02-03',
            filename: '2018-rd-aaabbbcccddd.jpg',
            filesize:'0.3MB',
            uploader: '登録太郎',
            type:'kanri',
            cmmt:[],
            free:'フリーテキスト',
            salesman: '営業次郎',
            manager: '管理三郎',
            owner: "オーナー",
            propertyNo: "1234567890",
            propertyName: "物件名",
            isNew: false,
        }, ],
    }
}
export {
    demo
}