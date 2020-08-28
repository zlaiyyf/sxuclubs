const db = wx.cloud.database(
  {env:'sxu-ypneu'}
)

function getclubsdetail(id) {
  var promise = new Promise(function (resolve, reject) {
  db.collection('clubs')
  .doc(id)
  .get({
    success: function(res) {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      // console.log(res.data)
      resolve(res.data);
      // return 
    },
    fail:function(res){
      console.log("getclubsdetail错误")
    //  console.log(res)
    reject(res);
    //  return false
    },
  })
})
 return promise
}

function updataclubsdetail(id,data) {

  db.collection('clubs')
  .doc(id)
  .update({
    data:data,
    success: function(res) {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      // console.log(res.data)
      return true
    },
    fail:function(res){
      console.log("updataclubsdetail错误")
     console.log(res)
     return false
    },
  })


}
function removeclubsdetail(id) {
  db.collection('clubs')
  .doc(id)
  .remove({
    success: function(res) {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      // console.log(res.data)
      return true
    },
    fail:function(res){
      console.log("removeclubsdetail错误")
     console.log(res)
     return false
    },
  })

}
function addclubsdetail(data) {
  db.collection('clubs')
  .add({
    data:data,
    success: function(res) {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      // console.log(res.data)
      return true
    },
    fail:function(res){
      console.log("removeclubsdetail错误")
     console.log(res)
     return false
    },
  })

}
function updateauto(id,data) {
  // var promise = new Promise(function (resolve, reject) {
  // db.collection('clubs')
  db.collection('users').doc(id)
  .update({
    data:data,
    success: function(res) {
      // res.data 是包含以上定义的两条记录的数组
      // console.log(res.data)
    }
  // })
})
//  return promise
}
module.exports = {
  getclubsdetail: getclubsdetail,
  updataclubsdetail:updataclubsdetail,
  removeclubsdetail:removeclubsdetail,
  addclubsdetail:addclubsdetail,

  updateauto:updateauto
}