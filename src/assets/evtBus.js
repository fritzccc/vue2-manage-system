import Vue from 'vue'
import {upload_bucket_name,download_bucket_name} from './config'
const evtBus=new Vue();
evtBus.upload_bucket_name=upload_bucket_name;
evtBus.download_bucket_name=download_bucket_name;
export default evtBus;