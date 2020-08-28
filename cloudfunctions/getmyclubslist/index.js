// 云函数入口文件
const cloud = require('wx-server-sdk')
// 获取我的收藏社团信息
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
   cloud.callFunction({
    name:"getmylike"
    // data:
  }).then(e=>{
    return {
      e
    }
  })


}