import Vue from 'vue'
import {upload_bucket_name,download_bucket_name} from './config'
const evtBus=new Vue();
evtBus.upload_bucket_name=upload_bucket_name;
evtBus.download_bucket_name=download_bucket_name;
evtBus.defaultConfig = {
  accessKey: '',
  secretKey: '',
  sessionToken: '',
  region: 'ap-northeast-1',
  apiKey: undefined,
  defaultContentType: 'application/json',
  defaultAcceptType: 'application/json'
};
export default evtBus;