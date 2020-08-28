// 云函数入口文件
const cloud = require('wx-server-sdk')
// 获取我的收藏社团id
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const likes = await db.collection('users')
    .where({
      _openid: wxContext.OPENID
    }).update({
      data:{like: event.data,}
    })
    // .get()
  //   var  likelist=like.data[0].like
  //   // console.log(like.data[0].like)
  return {
    likes
  }
}