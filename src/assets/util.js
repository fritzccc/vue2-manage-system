import AWS from 'aws-sdk'
import apigClientFactory from 'aws-api-gateway-client';
import {InvokeUrl,IdentityPoolId} from './config'

//set AWS config
AWS.config.region='ap-northeast-1';
AWS.config.credentials=new AWS.CognitoIdentityCredentials({
  IdentityPoolId: IdentityPoolId
});
export {AWS};

//new apigClient instance
export function newApigClient(invokeUrl){
  let apigClient = apigClientFactory.newClient({
    invokeUrl:invokeUrl || InvokeUrl,
  });
  return apigClient
}

//set session apigClient
export function sessionApigClient(accessKey,secretKey,sessionToken,region,invokeUrl){
  let apigClient = apigClientFactory.newClient({
    invokeUrl:invokeUrl || InvokeUrl,
    accessKey: accessKey,
    secretKey: secretKey,
    sessionToken: sessionToken,
    region: region
  });
  return apigClient;
}


//set Cognito Identity Credentials
export function setCognitoIdentityCredentials(identity_id,token){
  let credentials=new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId,
    IdentityId:identity_id,
    Logins: {
      'cognito-identity.amazonaws.com' : token
    }
  });
  return credentials
}


//set AWS cookies
export function setAWSCookies(expiredays){
  setCookie('accessKeyId',AWS.config.credentials.accessKeyId,expiredays);
  setCookie('secretAccessKey',AWS.config.credentials.secretAccessKey,expiredays);
  setCookie('sessionToken',AWS.config.credentials.sessionToken,expiredays);
  setCookie('region',AWS.config.region,expiredays);
}

//get AWS cookies
export function getAWSCookies(){
  let accessKeyId = getCookie('accessKeyId');
  let secretAccessKey = getCookie('secretAccessKey');
  let sessionToken = getCookie('sessionToken');
  let region = getCookie('region');
  if(accessKeyId && secretAccessKey && sessionToken && region){
    return{
      check:true,
      accessKeyId:accessKeyId,
      secretAccessKey:secretAccessKey,
      sessionToken:sessionToken,
      region:region
    }
  }else{
    return {
      check:false
    }
  }
}


//get cookie
export function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return (arr[2]);
    else
      return null;
  }
  
  //set cookie
  export function setCookie (c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
  };
  
  //delete cookie
  export function delCookie (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  };

  //clear all cookies
	export function clearAllCookies() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if(keys) {
      for(var i = keys.length; i--;)
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
  }
