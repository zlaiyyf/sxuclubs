// pages/detail/detail.js
var util = require('../../utils/db');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    InputBottom: 0,
    club: [],
    like: false,
    likelist: [],
    id: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.data.id = id
    console.log(this.data.id)
    util.getclubsdetail(id = id)
      .then(e => {
        this.setData({
          club: e
        })
      }).catch(e => {
        this.setData({
          club: {
            name: "社团已经删除"
          }
        })
      })
    wx.cloud.callFunction({
      name: "getmylike"
    }).then(e => {
      var likelist = e.result.likelist
      if(typeof(likelist) == "undefined"){
        likelist=[]

      }
      this.data.likelist = likelist

    

      // console.log(e)
      if (likelist.indexOf(id) != -1) {
        this.setData({
          like: true
        })
      }
      // console.log(e)
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

  },

  like: function (e) {

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
    var id = this.data.id
    var like = this.data.like;
    var likelist = this.data.likelist

    if (like) {
      likelist.remove(id)
    } else {
      likelist.push(id)
    }
    console.log(id)
    wx.cloud.callFunction({
      name: "delmylike",
      data: {
        data: likelist
      }
    }).then(e => {
      console.log(e, "gx")
    })
    this.setData({
      like: !like
    })
    console.log("收藏", like)
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
    console.log(this.data.id)
    return {
      title: "【龙城山大】" + this.data.club.name, // 默认是小程序的名称(可以写slogan等)
      path: '/pages/detail/detail?id=' + this.data.id, // 默认是当前页面，必须是以‘/’开头的完整路径
      imageUrl: this.data.club.avatar,
    }
  },
  // onShareTimeline
  // onShareTimeline: function () {
  //   // //   return {
  //   //   title: that.data.essay_title,
  //   //   path: '/pages/essaydetail/essaydetail?sort='+that.data.sort+'&id='+that.data.id,
  //   //   // imageUrl: 'http://static.e-mallchina.com/pic/product/brand/detail/hgds.jpg'//自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
  //   // }}
  //   return {
  //     title:"【龙城山大】" + this.data.club.name,
  //     query:{id:this.data.id},
  //     imageUrl: this.data.club.avatar
  //   }
  // },
})