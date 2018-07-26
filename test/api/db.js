const faker = require('faker/locale/ja');
const moment = require('moment')
function genTableData () {
  let data = {
    items:[]
  };
  for (let i = 0; i < 2333; i++) {
    data.items.push({
      file_entry_date: moment(faker.date.past()).format('YYYY-MM-DD'),
      doc_nm: faker.system.commonFileName(),
      file_size:(Math.random()*20).toFixed(1),
      file_id:Math.random(),
      file_entry_user: faker.name.findName(),
      business_kbn:['jutaku','seiyaku','kouji','kanri','tsuika'][faker.random.number(4)],
      comment:[{
          user_nm:faker.name.findName(),
          update_date:moment(faker.date.past()).format('YYYY-MM-DD'),
          text:faker.lorem.paragraph()
      }],
      free_format:faker.lorem.text(),
      sales_nm: faker.name.findName(),
      manage_nm: faker.name.findName(),
      owner_nm: faker.name.findName(),
      estate_no: (1000000000*Math.random()).toFixed(0),
      estate_nm: "物件名"+(100000*Math.random()).toFixed(0),
    });
  }
  return data;
}

function genDownloadList(){
  let data = [];
  for (let i = 0; i < faker.random.number(15); i++) {
    data.push({
      download_file_nm:faker.system.commonFileName()
    });
  }
  return data;
}

function genComment(){
  let comment=[];
  for (let i = 0; i < faker.random.number(10); i++) {
    comment.push({
      comment_id:moment(faker.date.past()).format('YYYYMMDDhhmmss'),
      user_id:faker.random.uuid(),
      user_nm:faker.name.findName(),
      comment:faker.lorem.words()
    });
  }
  return comment;
}

function genFilesPreview(){
  let data=[];
  for (let i = 0; i < 5; i++) {
    data.push({
      file_id:faker.random.uuid(),
      doc_nm:faker.system.commonFileName(),
      url:'https://httpbin.org/',
      comment:genComment()
    });
  }
  return data;
}

const signin={
  data: {
    user: {
      user_id: faker.random.uuid(),
      user_nm: faker.name.findName(),
      company_nm: faker.company.companyName(),
      mail: faker.internet.email(),
      control: '東京',
      auth_ptn: 1,
      status: 1,
    },
    token: {
      identityId: 'ap-northeast-1:3fbeb211-b692-48d2-8e13-00fcfdb1a817',
      token: '_dXVAPYLaVwAlA8IOimpigVAPYLaVwAlA8IOimpig'
    }
  }
}

const filesLoad={
  data:{
    items:{
      auth:[{
        auth_kbn:'file_search',
        auth_flg:'1'
      },{
        auth_kbn:'file_delete',
        auth_flg:'1'
      },{
        auth_kbn:'preview',
        auth_flg:'1'
      },{
        auth_kbn:'bulk_preview',
        auth_flg:'1'
      },{
        auth_kbn:'comment_reg',
        auth_flg:'1'
      },{
        auth_kbn:'open_set',
        auth_flg:'1'
      },{
        auth_kbn:'file_dl',
        auth_flg:'1'
      },{
        auth_kbn:'file_bulk_dl',
        auth_flg:'1'
      },{
        auth_kbn:'file_upload',
        auth_flg:'1'
      },{
        auth_kbn:'result_dl',
        auth_flg:'1'
      },{
        auth_kbn:'master_reg',
        auth_flg:'1'
      },{
        auth_kbn:'ope_log_csv',
        auth_flg:'1'
      }],
      business:[{
        label:'受託',
        value:'jutaku',
        children:[{
          label:'受託１',
          value:Math.random()
        },{
          label:'受託２',
          value:Math.random()
        },{
          label:'受託３',
          value:Math.random()
        }],
      },{
        label:'成約',
        value:'seiyaku',
        children:[{
          label:'成約１',
          value:Math.random()
        },{
          label:'成約２',
          value:Math.random()
        },{
          label:'成約３',
          value:Math.random()
        }],
      },{
        label:'工事',
        value:'kouji',
        children:[{
          label:'工事１',
          value:Math.random()
        },{
          label:'工事２',
          value:Math.random()
        },{
          label:'工事３',
          value:Math.random()
        }],
      },{
        label:'管理',
        value:'kanri',
        children:[{
          label:'管理１',
          value:Math.random()
        },{
          label:'管理２',
          value:Math.random()
        },{
          label:'管理３',
          value:Math.random()
        }],
      },{
        label:'追加',
        value:'tsuika',
        children:[{
          label:'追加１',
          value:Math.random()
        },{
          label:'追加２',
          value:Math.random()
        },{
          label:'追加３',
          value:Math.random()
        }],
      }]
    }
  }
}

const tree={
  treeData:[{
    'label': 'A000000_リロ太郎',
    'children': [{
      'label': 'yyyymm00000_新橋アパート',
      'children': [{
        'label': 'T000000_新橋太郎'
      },
      {
        'label': 'T000001_新橋次郎'
      },
      {
        'label': 'T000002_新橋三郎'
      }]
    },
    {
      'label': 'yyyymm00000_品川マンション',
      'children': [{
          'label': 'T000003_品川太郎'
        },
        {
          'label': 'T000004_品川次郎'
        },
        {
          'label': 'T000005_品川三郎'
        }]
      }]
    },
    {
    'label': 'A000000_リロ次郎',
    'children': [{
      'label': 'yyyymm00000_新宿アパート',
      'children': [{
        'label': 'T000006_新宿太郎'
      },
      {
        'label': 'T000007_新宿次郎'
      },
      {
        'label': 'T000008_新宿三郎'
      }]
    },
    {
      'label': 'yyyymm00000_渋谷マンション',
      'children': [{
          'label': 'T000009_渋谷太郎'
        },
        {
          'label': 'T000010_渋谷次郎'
        },
        {
          'label': 'T000011_渋谷三郎'
        }]
      }]
  },
  {
    'label': 'A000000_リロ次郎',
    'children': [{
      'label': 'yyyymm00000_新宿アパート',
      'children': [{
        'label': 'T000006_新宿太郎'
      },
      {
        'label': 'T000007_新宿次郎'
      },
      {
        'label': 'T000008_新宿三郎'
      }]
    },
    {
      'label': 'yyyymm00000_渋谷マンション',
      'children': [{
          'label': 'T000009_渋谷太郎'
        },
        {
          'label': 'T000010_渋谷次郎'
        },
        {
          'label': 'T000011_渋谷三郎'
        }]
      }]
  },
  {
    'label': 'A000000_リロ次郎',
    'children': [{
      'label': 'yyyymm00000_新宿アパート',
      'children': [{
        'label': 'T000006_新宿太郎'
      },
      {
        'label': 'T000007_新宿次郎'
      },
      {
        'label': 'T000008_新宿三郎'
      }]
    },
    {
      'label': 'yyyymm00000_渋谷マンション',
      'children': [{
          'label': 'T000009_渋谷太郎'
        },
        {
          'label': 'T000010_渋谷次郎'
        },
        {
          'label': 'T000011_渋谷三郎'
        }]
      }]
  },
  {
    'label': 'A000000_リロ次郎',
    'children': [{
      'label': 'yyyymm00000_新宿アパート',
      'children': [{
        'label': 'T000006_新宿太郎'
      },
      {
        'label': 'T000007_新宿次郎'
      },
      {
        'label': 'T000008_新宿三郎'
      }]
    },
    {
      'label': 'yyyymm00000_渋谷マンション',
      'children': [{
          'label': 'T000009_渋谷太郎'
        },
        {
          'label': 'T000010_渋谷次郎'
        },
        {
          'label': 'T000011_渋谷三郎'
        }]
      }]
  },
  {
    'label': 'A000000_リロ次郎',
    'children': [{
      'label': 'yyyymm00000_新宿アパート',
      'children': [{
        'label': 'T000006_新宿太郎'
      },
      {
        'label': 'T000007_新宿次郎'
      },
      {
        'label': 'T000008_新宿三郎'
      }]
    },
    {
      'label': 'yyyymm00000_渋谷マンション',
      'children': [{
          'label': 'T000009_渋谷太郎'
        },
        {
          'label': 'T000010_渋谷次郎'
        },
        {
          'label': 'T000011_渋谷三郎'
        }]
      }]
  },
  {
    'label': 'A000000_リロ次郎',
    'children': [{
      'label': 'yyyymm00000_新宿アパート',
      'children': [{
        'label': 'T000006_新宿太郎'
      },
      {
        'label': 'T000007_新宿次郎'
      },
      {
        'label': 'T000008_新宿三郎'
      }]
    },
    {
      'label': 'yyyymm00000_渋谷マンション',
      'children': [{
          'label': 'T000009_渋谷太郎'
        },
        {
          'label': 'T000010_渋谷次郎'
        },
        {
          'label': 'T000011_渋谷三郎'
        }]
      }]
  },
  {
    'label': 'A000000_リロ次郎',
    'children': [{
      'label': 'yyyymm00000_新宿アパート',
      'children': [{
        'label': 'T000006_新宿太郎'
      },
      {
        'label': 'T000007_新宿次郎'
      },
      {
        'label': 'T000008_新宿三郎'
      }]
    },
    {
      'label': 'yyyymm00000_渋谷マンション',
      'children': [{
          'label': 'T000009_渋谷太郎'
        },
        {
          'label': 'T000010_渋谷次郎'
        },
        {
          'label': 'T000011_渋谷三郎'
        }]
      }]
  },
  {
    'label': 'A000000_リロ次郎',
    'children': [{
      'label': 'yyyymm00000_新宿アパート',
      'children': [{
        'label': 'T000006_新宿太郎'
      },
      {
        'label': 'T000007_新宿次郎'
      },
      {
        'label': 'T000008_新宿三郎'
      }]
    },
    {
      'label': 'yyyymm00000_渋谷マンション',
      'children': [{
          'label': 'T000009_渋谷太郎'
        },
        {
          'label': 'T000010_渋谷次郎'
        },
        {
          'label': 'T000011_渋谷三郎'
        }]
      }]
  },
  {
    'label': 'A000000_リロ次郎',
    'children': [{
      'label': 'yyyymm00000_新宿アパート',
      'children': [{
        'label': 'T000006_新宿太郎'
      },
      {
        'label': 'T000007_新宿次郎'
      },
      {
        'label': 'T000008_新宿三郎'
      }]
    },
    {
      'label': 'yyyymm00000_渋谷マンション',
      'children': [{
          'label': 'T000009_渋谷太郎'
        },
        {
          'label': 'T000010_渋谷次郎'
        },
        {
          'label': 'T000011_渋谷三郎'
        }]
      }]
  },
  {
    'label': 'A000000_リロ次郎',
    'children': [{
      'label': 'yyyymm00000_新宿アパート',
      'children': [{
        'label': 'T000006_新宿太郎'
      },
      {
        'label': 'T000007_新宿次郎'
      },
      {
        'label': 'T000008_新宿三郎'
      }]
    },
    {
      'label': 'yyyymm00000_渋谷マンション',
      'children': [{
          'label': 'T000009_渋谷太郎'
        },
        {
          'label': 'T000010_渋谷次郎'
        },
        {
          'label': 'T000011_渋谷三郎'
        }]
      }]
  },
  {
    'label': 'A000000_リロ次郎',
    'children': [{
      'label': 'yyyymm00000_新宿アパート',
      'children': [{
        'label': 'T000006_新宿太郎'
      },
      {
        'label': 'T000007_新宿次郎'
      },
      {
        'label': 'T000008_新宿三郎'
      }]
    },
    {
      'label': 'yyyymm00000_渋谷マンション',
      'children': [{
          'label': 'T000009_渋谷太郎'
        },
        {
          'label': 'T000010_渋谷次郎'
        },
        {
          'label': 'T000011_渋谷三郎'
        }]
      }]
  },
  {
    'label': 'A000000_リロ次郎',
    'children': [{
      'label': 'yyyymm00000_新宿アパート',
      'children': [{
        'label': 'T000006_新宿太郎'
      },
      {
        'label': 'T000007_新宿次郎'
      },
      {
        'label': 'T000008_新宿三郎'
      }]
    },
    {
      'label': 'yyyymm00000_渋谷マンション',
      'children': [{
          'label': 'T000009_渋谷太郎'
        },
        {
          'label': 'T000010_渋谷次郎'
        },
        {
          'label': 'T000011_渋谷三郎'
        }]
      }]
  },
  {
    'label': 'A000000_リロ次郎',
    'children': [{
      'label': 'yyyymm00000_新宿アパート',
      'children': [{
        'label': 'T000006_新宿太郎'
      },
      {
        'label': 'T000007_新宿次郎'
      },
      {
        'label': 'T000008_新宿三郎'
      }]
    },
    {
      'label': 'yyyymm00000_渋谷マンション',
      'children': [{
          'label': 'T000009_渋谷太郎'
        },
        {
          'label': 'T000010_渋谷次郎'
        },
        {
          'label': 'T000011_渋谷三郎'
        }]
      }]
  },
  {
    'label': 'A000000_リロ次郎',
    'children': [{
      'label': 'yyyymm00000_新宿アパート',
      'children': [{
        'label': 'T000006_新宿太郎'
      },
      {
        'label': 'T000007_新宿次郎'
      },
      {
        'label': 'T000008_新宿三郎'
      }]
    },
    {
      'label': 'yyyymm00000_渋谷マンション',
      'children': [{
          'label': 'T000009_渋谷太郎'
        },
        {
          'label': 'T000010_渋谷次郎'
        },
        {
          'label': 'T000011_渋谷三郎'
        }]
      }]
  },]
}
const signout={
  data:{}
}

const changepass={
  data:{}
}

const commentsDelete={
  data:{
    result_flg:0
  }
}

const commentsAdd={
  data:{
    result_flg:0,
    file_id:faker.random.uuid(),
    user_id:faker.random.uuid(),
    comment_id:moment().format('YYYYMMDDhhmmss'),
    comment:faker.lorem.sentence(),
  }
}

const filesFolder={
  data:{
    folder_id:faker.random.uuid()
  }
}

module.exports = {
  signin:signin,
  filesLoad:filesLoad,
  tableData:genTableData(),
  downloadList:genDownloadList(),
  filesPreview:genFilesPreview(),
  filesFolder:filesFolder,
  tree:tree,
  signout:signout,
  changepass:changepass,
  commentsDelete:commentsDelete,
  commentsAdd:commentsAdd
}