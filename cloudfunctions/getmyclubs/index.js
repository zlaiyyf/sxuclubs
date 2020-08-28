// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const MAX_LIMIT = 100
// 获取自己可以管理的社团
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
  // 先查询取出人的权限1：最高2：小程序管理3：社团管理
  const auth = await db.collection('users')
    .where({
      _openid: wxContext.OPENID
    }).field({
      auth: true,
    }).get()
  // console.log(,"quan")
  var myauth=auth.data[0].auth
  console.log(myauth,"quan")
  if (myauth == 1 || myauth == 2) {
    //  取出符合集合记录总数
    console.log("1：最高2：小程序管理")
    const countResult = await db.collection('clubs').count()
    const total = countResult.total
    // 计算需分几次取
    const batchTimes = Math.ceil(total / 100)
    // 承载所有读操作的 promise 的数组
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('clubs').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
      tasks.push(promise)
    }
    // 等待所有
    return (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data),
        errMsg: acc.errMsg,
      }
    })
  }else if(myauth == 3 ){
    // 符合用户的数据
    console.log("3：社团管理")
    const countResult = await db.collection('clubs').where({
      _openid: wxContext.OPENID
    }).count()
    const total = countResult.total
    // 计算需分几次取
    const batchTimes = Math.ceil(total / 100)
    // 承载所有读操作的 promise 的数组
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('clubs').where({
        _openid: wxContext.OPENID
      })
      .skip(i * MAX_LIMIT)
      .limit(MAX_LIMIT)
      .get()
      tasks.push(promise)
    }
    // 等待所有
    return (await Promise.all(tasks)).reduce((acc, cur) => {
      console.log(cur)
      return {
   
        data: acc.data.concat(cur.data),
        errMsg: acc.errMsg,
      }
    })
  }

}