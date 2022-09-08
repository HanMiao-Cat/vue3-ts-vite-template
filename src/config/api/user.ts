import { instance as request } from '../request';

export const GetConstellationData = () => {
  console.log(1111);
  return request({
    url: '/mock/goods',
    method: 'get',
  })
}