// pages/manageauto/manageauto.js
var util = require('../../utils/db');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uselist: [],
    applytext: "",
    auth:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  getauto: function (e) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.cloud.callFunction({
      name: "manageauto"
    }).then(e => {

      var data = e.result.data
      console.log(data)
      this.setData({
        uselist: data
      })
      wx.hideLoading()
    }).catch(e => {
      this.setData({
        uselist: []
      })
      wx.hideLoading()
    })

  },
  onLoad: function (options) {
    this.getauto()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  showModal(e) {
    var id = e.currentTarget.dataset.id;
    var uerlist = this.data.uselist;
    for (var i = 0; i < uerlist.length;i++) {
      // console.log(i,id,uerlist[i]._id,uerlist[i].applytext)

      if (uerlist[i]._id ==id) {
        this.setData({
          applytext: uerlist[i].applytext,
          auth:uerlist[i].applyauth
        })
        break
      }
      // console.info(i +":"+ list2 [i]);

    }
    this.setData({
      modalName: e.currentTarget.dataset.target,
      nowid: id,
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  agree: function (e) {
    var id = e.currentTarget.dataset.id
    // console.log(e.currentTarget.dataset.id)
    var uerlist = this.data.uselist;
    var data = {
      apply: false,
    }
    for (var i = 0; i < uerlist.length; i++) {
      if (uerlist[i]._id = id) {
        data.auth = uerlist[i].applyauth
        // this.setData({
        //   applytext:uerlist[i].applytext
        // })
        break
      }
      // console.info(i +":"+ list2 [i]);

    }
    util.updateauto(id = id, data = data)
    this.hideModal();
    this.getauto()
  },
  refuse: function (e) {
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id
    // console.log(e.currentTarget.dataset.id)
    // var uerlist = this.data.uselist;
    var data = {
      apply: false,

    }
    this.hideModal();
    this.getauto()
    util.updateauto(id = id, data = data)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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