// pages/manageclubs/manageclubs.js
var util = require('../../utils/db');
// var util = require('../../utils/db');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
          ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 获取自己的可以管理的社团
   getmyclubs:function(openid){
     wx.showLoading({
       title: '加载中',
       mask:true
     })
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getmyclubs',
  
    }).then(res => {
  
      wx.hideLoading({
        complete: (res) => {},
      })
      // output: res.result === 3
      console.log(res)
      this.setData({
        list:res.result.data
      })
    }).catch(err => {
      wx.hideLoading({
        complete: (res) => {},
      })
      // 没有自己的社团
      this.setData({
        list:[]
      })
      // wx.showToast({
      //   title: '加载失败',
      //   icon: 'none',
      //   duration: 2000
      // })

    })

   },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection =='left'){
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  revise:function(e){
    var id = e.currentTarget.dataset.id;
    console.log("修改");
    wx.navigateTo({
      url:'/pages/submitclubs/submitclubs?id='+id,  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
      success:function(){}        //成功后的回调；
      // fail：function(){}          //失败后的回调；
      // complete：function(){}      //结束后的回调(成功，失败都会执行)
    })

  },
  move:function(e){
    console.log("删除")
    // console.log(e.currentTarget.dataset.avatar, "删除")
    console.log(e.currentTarget.dataset)
    console.log(e.currentTarget.dataset.id)
    wx.showModal({
      // title: '提示',
      content: '确定删除吗？',
      success :res=> {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.cloud.deleteFile({
            fileList: [e.currentTarget.dataset.avatar],
            success: res => {
              // handle success
              console.log(e.currentTarget.dataset.avatar, "删除")
            },
            fail: res => {
              console.log(res, "删除")
            }
          })
          util.removeclubsdetail(e.currentTarget.dataset.id)
          this.getmyclubs()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
    // 注意

  },
  add:function(e){
    console.log("添加")
    wx.navigateTo({
      url: '/pages/submitclubs/submitclubs',
     
      success: function(res) {

      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getmyclubs()
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
  // onShareAppMessage: function () {

  // }
})