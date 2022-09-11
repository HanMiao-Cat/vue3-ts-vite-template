import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Message } from "@arco-design/web-vue";

type Params = {
  url: string;
  method: string;
  params?: { [key: string]: any };
  data?: { [key: string]: any };
};

// 请求失败函数
const errorHandler = (err: any) => Promise.reject(err);

// 相应失败函数
const resErrorHandler = (err: any) => {
  Message.error("网络超时或连接超时，请稍后再试");
  errorHandler(err);
};

export default <T = any>(params: Params, auth = false): Promise<T> => {
  // 创建 axios 实例
  const instance: AxiosInstance = axios.create({
    // API 请求的默认前缀
    baseURL: import.meta.env.VITE_APP_URL as string,
    timeout: 6000, // 请求超时时间
    withCredentials: true, // 携带cookie
  });

  // 异常拦截处理器
  const errorHandler = (error: any) => Promise.reject(error);

  // 响应异常拦截处理器
  const resErrorHandler = (error: any) => {
    Message.error(`网络超时，请稍后重试`);
    return errorHandler(error);
  };

  // request interceptor
  instance.interceptors.request.use((config: any) => {
    if(auth) {
      config.headers.Authorization = 'Bearer 12bea3a3-4843-4ef1-b241-920fda1cd9ea'
    }
    return config;
  }, errorHandler);

  // response interceptor
  instance.interceptors.response.use(async (response: AxiosResponse) => {
    // console.log(response)
    if(response.status === 200) {
      let data = response.data;
      if(data.code === 0) {
        return data.data
      }
    }
  }, resErrorHandler);

  return instance(params);
};