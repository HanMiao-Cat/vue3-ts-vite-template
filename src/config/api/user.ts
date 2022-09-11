import request from '../request';

export const GetLogin = () => {
  return request({
    url: '/exam/exam/info/page',
    method: 'get',
  }, true)
}