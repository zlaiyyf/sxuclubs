// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var eventdata={
    apply:event.apply,
    applyauth:event.applyauth,
    applytext:event.applytext,
    _openid:wxContext.OPENID
  }

  const openid=wxContext.OPENID
  // 查看是否存在用户 没有就创建 有就加入申请权限的字段
  const use = await db.collection('users')
    .where({
      _openid: openid
    }).count()
  if (use.total) {
    // cunzai
  var stute="gx"
    await db.collection('users')
    .where({
      _openid: openid
    }).update({
      data: eventdata
    })
 
  } else {
    var stute="add"
    await db.collection('users')
    .add({
      data: eventdata
    })
  }
  return {
    stute,
    eventdata
  }
}