// pages/like/like.js
var util = require('../../utils/db');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clubs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // const tasks = []
  //   for (let i = 0; i < batchTimes; i++) {
  //     const promise = db.collection('clubs').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
  //     tasks.push(promise)
  //   }
  //   // 等待所有
  //   return (await Promise.all(tasks)).reduce((acc, cur) => {
  //     return {
  //       data: acc.data.concat(cur.data),
  //       errMsg: acc.errMsg,
  //     }
  //   })
  // 获取自己喜欢的社团信息
  getmylikeclubs: function (e) {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    wx.cloud.callFunction({
      name: "getmylike"
    }).then(e => {
      console.log(e)
      var like = e.result.likelist
      const tasks = []
      for (let i = 0; i < like.length; i++) {
        const promise = util.getclubsdetail(like[i])
        tasks.push(promise)
      }
      // // 等待所有
      Promise.all(tasks.map(function (promiseItem) {
        return promiseItem.catch(function (err) {
          return {
            "error": err,
            name: "已失效",
          }
        })
      })).then(e => {
        Array.prototype.indexOf = function (val) {
          for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
          }
          return -1;
        };
        Array.prototype.remove = function (val) {
          var index = this.indexOf(val);
          if (index > -1) {
            this.splice(index, 1);
          }
        };
        var data = []
        var _like = like.slice()
        // 将失效的社团id删除；更新
        e.forEach(function (element, index, array) {
          if (element.error) {
            // console.info(index);   //当前下标
            var id = like[index]
            _like.remove(id)
            // console.log("sx", id)
          } else {
            data.push(element)
          }
        });
        this.setData({
          clubs: data
        })
        wx.hideLoading({
          // complete: (res) => {},
        })
        if (like.length!=_like.length){
          wx.cloud.callFunction({
            name:"delmylike",
            data:{data:_like}
          }).then(e=>{
             console.log(e,"gx")
          })
        }
    
        // console.log(data, "data"); 
        // console.log(_like,"_like");
        // console.log(like);

        // console.log(e);
      }).catch(err => {
        wx.hideLoading({
          // complete: (res) => {},
        })
        // return {"Error":"错误"}
      })
    }).catch(e=>{
      wx.hideLoading({
        // complete: (res) => {},
      })
    })
  },
  // 跳转
  NavigateTo(e) {
    var id =e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?id='+id,

      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('acceptDataFromOpenerPage', {
        //   data: 'test'
        // })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getmylikeclubs()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '快来选择你合适的社团',
      path: '/pages/index/index',
      // imageUrl: 'http://static.e-mallchina.com/pic/product/brand/detail/hgds.jpg'//自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
    }
  }
})