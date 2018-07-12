import axios from 'axios'
import {
  getCookie
} from './util'

// axios settings
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'https://nyl0e196gg.execute-api.ap-northeast-1.amazonaws.com/isp/'; //default base url

// http request interceptor，pass cookie to backend
axios.interceptors.request.use(config => {
    console.log('​config', config);
    const token = getCookie('session'); //get cookie
    config.data = JSON.stringify(config.data);
    // config.headers = {
    //   'Content-Type': 'application/x-www-form-urlencoded' //headers setting
    // };
    if (token) {
      config.params = {
        'token': token
      }
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response interceptor,
axios.interceptors.response.use(
  resp => {
    //resp.data.errCode假定值，如果值为2，说明Cookie丢失，然后跳转到登录页
    if (resp.data.errCode == 2) {
      router.push({
        path: '/error',
        query: {
          redirect: router.currentRoute.fullPath
        } //从哪个页面跳转
      })
    }
    return resp;
  },
  err => {
    return Promise.reject(err)
  });

export default axios;

//fetch
export function fetch(url, params = {}) {

  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}

//post
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}

//patch
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}

//put
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}
