// 引入mockjs
import Mock from 'mockjs'
// 获取 mock.Random 对象
const Random = Mock.Random

const produceGoodsData = function (data :any) {
  console.log(data,'接收post参数');
  let body  = JSON.parse(data.body)
  console.log(body);
  let produceGoodsData = []
  for (let i = 0; i < 2; i++) {
    let goodsObject = {
      ...body
    }
    produceGoodsData.push(goodsObject)
  }
 
  return produceGoodsData
}
Mock.mock('/mock/goods','post', produceGoodsData) 