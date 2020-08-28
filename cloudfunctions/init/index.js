// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var statu="已有"
  const wxContext = cloud.getWXContext()
  const uer=await db.collection("users").where({
    _openid: wxContext.OPENID
  }).count()
  const total=uer.total
  if (total==0){
    statu="加入"
    db.collection("users").add({
      data:{_openid: wxContext.OPENID,
      like:[],
      auth:4,}
    })

  }
  return {
    statu
  }
}