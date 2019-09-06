import axios from 'axios';
import config from '@/config';
const http = axios.create({
  baseURL: config.baseUrl,
  timeout: 30000,
  withCredentials: true,
  validateStatus(status) {
    return true;
  }
});

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.url = `${config.url}?timestamp=${new Date().getTime()}`;
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

http.interceptors.response.use(res => {
  return res.data;
}, err => {
  return err;
});

const request = {
  post: function (url, para) {
    return http.post(url, para).then(res => {
      if (res.code === 200) {
        return Promise.resolve(res);
      }
      return Promise.reject(res);
    });
  }
};

export default request;
