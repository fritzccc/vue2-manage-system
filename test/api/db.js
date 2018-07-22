const faker = require('faker')
const moment = require('moment')
faker.locale='ja'
function genTableData () {
    let data = {
      items:[]
    };
    for (let i = 0; i < 5000; i++) {
      data.items.push({
        file_entry_date: moment(faker.date.past()).format('YYYY-MM-DD'),
        doc_nm: faker.system.commonFileName(),
        file_size:Math.random().toFixed(1),
        file_id:Math.random(),
        file_entry_user: faker.name.findName(),
        business_kbn:'jutaku',
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

const file_load={
  data:{
    items:{
      auth:[{
        auth_kbn:'',
        auth_flg:''
      },{
        auth_kbn:'',
        auth_flg:''
      }],
      doc:[{
        doc_cd:faker.random.number(100),
        doc_nm:'',
        business_kbn:'',
        business_kbn_nm:'',
        public_kbn:''
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
  }]
}

module.exports = {
  signin:signin,
  file_load:file_load,//TODO
  tableData:genTableData(),
  tree:tree
}