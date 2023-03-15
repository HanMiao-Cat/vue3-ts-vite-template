import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Message } from '@arco-design/web-vue';

type Params = {
  url: string;
  method: string;
  params?: Record<string, any>;
  data?: Record<string, any>;
};

export default <T = any>(params: Params, auth = false): Promise<T> => {
  const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_URL,
    timeout: 6000,
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
    if (auth) {
      config.headers.Authorization =
        'Bearer 12bea3a3-4843-4ef1-b241-920fda1cd9ea';
    }
    return config;
  }, errorHandler);

  // response interceptor
  instance.interceptors.response.use(async (response: AxiosResponse) => {
    if (response.status === 200) {
      const data = response.data;
      if (data.code === 0) {
        return data.data;
      }
    }
  }, resErrorHandler);

  return instance(params) as Promise<T>;
};
