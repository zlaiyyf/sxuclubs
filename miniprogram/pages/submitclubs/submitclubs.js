// pages/submitclubs/submitclubs.js
var util = require('../../utils/db');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // sort:["1"]
    FilePaths: "",
    // update:false,
    clubid: "",
    disabled: false,
    // 如果更新 这是旧数据
    avatar: "",
    name: "",
    sort: [],
    qq: "",
    introduce: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (options.id) {
      // console.log(options.id)
      wx.showLoading({
        title: '加载中...',
        mask: true
      });
      this.data.clubid = options.id;
      var getclubsdetail = util.getclubsdetail(options.id);
      getclubsdetail.then((e) => {
        // console.log(e)
        //  简单点不如下载下图片 想用临时路径
        wx.cloud.downloadFile({
          fileID: e.avatar, // 文件 ID
          success: res => {
            // 返回临时文件路径
            console.log(res.tempFilePath, "返回临时文件路径")
            // var sort = [];
            // console.log(e.type);
            // let type_ = e.type


            // for (var i = 0; i < type_.length; ++i) {
            //   sort[type_[i]] = true
            // }

            // console.log(sort)
            this.setData({
              FilePaths: [res.tempFilePath],
              // avatar: e.avatar,
              // introduce: e.introduce,
              // qq: e.qq,
              // name: e.name,
              // sort: sort,

            })
            wx.hideLoading()
          },
          fail: res => {
            console.log(res)
          wx.hideLoading({
            complete: (res) => {},
          })
          },
          complete:res=>{
            var sort = [];
            console.log(e.type);
            let type_ = e.type


            for (var i = 0; i < type_.length; ++i) {
              sort[type_[i]] = true
            }

            console.log(sort)
            this.setData({
              // FilePaths: [res.tempFilePath],
              avatar: e.avatar,
              introduce: e.introduce,
              qq: e.qq,
              name: e.name,
              sort: sort,

            })
            wx.hideLoading()
          }
        })
      })



    }
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
  showToast: function (e) {
    wx.showToast({
      title: e,
      icon: 'none',
      duration: 2000
    })
  },
  // 上传头像
  upavatar: function (src) {

    var promise = new Promise(function (resolve, reject) {
      // ... some code
      let suffix = /\.[^\.]+$/.exec(src)[0];
      console.log("fia", suffix)
      wx.cloud.uploadFile({
        cloudPath: new Date().getTime() + suffix, // 上传至云端的路径
        filePath: src, // 小程序临时文件路径
        success: res => {
          // 返回文件 ID
          resolve(res.fileID);
        },
        fail: res => {
          // 返回文件 ID
          reject(res);
        },
      })

    })
    return promise
  },
  // up
  // update:function (data){

  // },
  disabled: function (e) {
    this.setData({
      disabled: !this.data.disabled
    })

  },
  // 
  submit: function (e) {
    this.disabled()
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var e = e.detail.value;
    let name = e.name;
    let sort = e.sort;
    let qq = e.qq;
    var textarea = e.textarea;
    if (!this.data.FilePaths) {
      this.showToast("未选择头像")
      this.disabled()
      return
    }
    if (!textarea) {
      this.showToast("未输入社团介绍")
      this.disabled()
      return
    }
    if (!qq) {
      this.showToast("未输入qq")
      this.disabled()
      return
    }
    if (!name) {
      this.showToast("未输入社团名称")
      this.disabled()
      return
    }
    if (sort.length < 1 || sort.length > 4) {
      this.showToast("社团分类最多四个，最少一个")
      this.disabled()
      return
    }
    // console.log(this.data.FilePaths)
    var upavatar = this.upavatar(this.data.FilePaths[0])
    upavatar.then((e) => {
        var fileID = e;
        var data = {
          "avatar": fileID,
          "introduce": textarea,
          "name": name,
          "qq": qq,
          "type": sort
        }
        if (this.data.clubid) {
          // console.log(this.data.avatar,"删除")
          wx.cloud.deleteFile({
            fileList: [this.data.avatar],
            success: res => {
              // handle success
              console.log(this.data.avatar, "删除")
            },
            fail: res => {
              console.log(res, "删除")
            }
          })
          // console.log("gx",data)
          util.updataclubsdetail(this.data.clubid, data);


          wx.showToast({
            title: '更新成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          util.addclubsdetail(data)
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
        }

        this.disabled()
        wx.navigateBack()
      })
      .catch(err => {
        console.log(err)
        // this.disabled()
      });
    // console.log(fileID)
    // this.disabled()
  },
  DelImg: function (e) {
    this.setData({
      FilePaths: ""
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        this.setData({
          FilePaths: res.tempFilePaths
        })
      }
    });
  },
  // 
  checkbox: function (e) {
    let value = e.detail.value;
    if (value.length <= 4) {
      // this.data.sort= e.detail.value;
    } else {
      this.showToast(
        '分类不能超过4个')
    }
    console.log(e.detail.value)

  },
  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})