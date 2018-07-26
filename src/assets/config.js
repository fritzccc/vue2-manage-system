//AWS API
const InvokeUrl='http://localhost:3003/ver1.0.0/';
// const InvokeUrl='https://jfz42d0oyf.execute-api.ap-northeast-1.amazonaws.com/dev/';
const IdentityPoolId='ap-northeast-1:b5a84a4d-1673-498f-b245-7952da648408';

//S3
const upload_bucket_name='s3-relo-dev-upload';
const download_bucket_name='s3-relo-dev-downloadlist';
export{
  InvokeUrl,
  IdentityPoolId,
  upload_bucket_name,
  download_bucket_name
};