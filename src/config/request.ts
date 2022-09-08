import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Message } from '@arco-design/web-vue';

export const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL as string,
  // baseURL: 'http://192.168.31.31',
  timeout: 10000,
});

// 请求失败函数
const errorHandler = (err: any) =>  Promise.reject(err);

// 相应失败函数
const resErrorHandler = (err: any) => {
  Message.error('网络超时或连接超时，请稍后再试')
  errorHandler(err);
}

// 添加请求拦截器
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  console.log(config);
  return config;
}, errorHandler);

// 添加响应拦截器
instance.interceptors.response.use((response: AxiosResponse) => {
  console.log(response)
  console.log(response);
  return response.data;
}, resErrorHandler);