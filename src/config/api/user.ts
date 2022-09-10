import request from '../request';

export const GetLogin = (params: any) => {
  return request({
    url: '/login',
    method: 'post',
    data: params
  })
}