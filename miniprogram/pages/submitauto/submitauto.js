// pages/submitauto/submitauto.js
var util = require('../../utils/db');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker: ['社团负责人', '小程序管理员'],
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  submit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var picker = e.detail.value.picker;
    var textarea = e.detail.value.textarea;
    if (picker == 0) {
      var auth = 3
    } else if (picker == 1) {
      var auth = 2
    }
    if (!textarea) {
      wx.showToast({
        title: '请填写理由',
        icon: "none"
      })
      return
    }
    var data = {
      apply: true,
      applyauth: auth,
      applytext: textarea
    }
    wx.cloud.callFunction({
      name: "submitauth",
      data: data
    }).then(e => {
      console.log(e)
      wx.showModal({
        title: '提醒',
        content: '如果需要加速通过申请，请复制微信号添加好友',
        cancelText:'取消',
        confirmText:'复制',
        success(res){
          if(res.cancel){
            // 用户点击了取消属性的按钮
          }else if(res.confirm){
            // 用户点击了确定属性的按钮，对应选择了'男'
            wx.setClipboardData({
              data: "SXU_1902",
              success: function (res) {
                wx.getClipboardData({
                  success: function (res) {
                    wx.showToast({
                      title: '复制成功'
                    })
                  }
                })
              }
            })
          }
        }
      })
    })
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