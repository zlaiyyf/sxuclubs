const app = getApp()
// var util = require('../../utils/utils');
const db = wx.cloud.database()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [{
        "id": 0,
        "clubs":[],
        "name": "全部"
      },
      {
        "id": 1,
        "clubs":[],
        "name": "大东关"
      },
      {
        "id": 2,
        "clubs":[],
        "name": "坞 城"
      },
      {
        "id": 3,
        "clubs":[],
        "name": "院 级"
      },
      {
        "id": 4,
        "clubs":[],
        "name": "校 级"
      },
      {
        "id": 5,
        "clubs":[],
        "name": "学术类"
      },
      {
        "id": 6,
        "clubs":[],
        "name": "艺术类"
      },
      {
        "id": 7,
        "clubs":[],
        "name": "公益类"
      },
      {
        "id": 8,
        "clubs":[],
        "name": "技能类"
      },
      {
        "id": 9,
        "clubs":[],
        "name": "娱乐类"
      },
      {
        "id": 10,
        "clubs":[],
        "name": "科技类"
      },
      {
        "id": 11,
        "clubs":[],
        "name": "体育类"
      }

    ],
    load: true,
    sort: [11, 10, 11, 10]

  },
  onLoad() {
    
    this.test()
  },
  test: function (e) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    // 采取watch
    db.collection('clubs')
      .watch({
        onChange: snapshot=>{
          wx.showLoading({
            title: '加载中...',
            mask: true
          });
          this.dealdata(snapshot.docs)
          // console.log('docs\'s changed events', snapshot.docChanges)
    
          // console.log('query result snapshot after the event', snapshot.docs)
          console.log('is init data', snapshot.type === 'init')
          // wx.hideLoading()
        },
        onError: function (err) {
          console.error('the watch closed because of error', err)
        }
      })
  },
  to:function(e){
wx.navigateTo({
  url: '/pages/about/about',
})
  },
  // 处理返回的数据
  dealdata:function (e) { 

    let list =[{
      "id": 0,
      "clubs":[],
      "name": "全部"
    },
    {
      "id": 1,
      "clubs":[],
      "name": "大东关"
    },
    {
      "id": 2,
      "clubs":[],
      "name": "坞 城"
    },
    {
      "id": 3,
      "clubs":[],
      "name": "院 级"
    },
    {
      "id": 4,
      "clubs":[],
      "name": "校 级"
    },
    {
      "id": 5,
      "clubs":[],
      "name": "学术类"
    },
    {
      "id": 6,
      "clubs":[],
      "name": "艺术类"
    },
    {
      "id": 7,
      "clubs":[],
      "name": "公益类"
    },
    {
      "id": 8,
      "clubs":[],
      "name": "技能类"
    },
    {
      "id": 9,
      "clubs":[],
      "name": "娱乐类"
    },
    {
      "id": 10,
      "clubs":[],
      "name": "科技类"
    },
    {
      "id": 11,
      "clubs":[],
      "name": "体育类"
    }

  ];
    e.forEach((item1,index,array)=>{
      //执行代码
      list[0].clubs.push(item1);
      item1.type.forEach((item,index,array)=>{
        list[item].clubs.push(item1);
      })
  })


    this.setData({
      list: list,
      listCur: list[0]
    })
    wx.hideLoading()
  },
  onShow() {
    
  },
  onReady() {

  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50,
      // sort:[4,5]
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  },
  // 跳转
  NavigateTo(e) {
    console.log(e.currentTarget.dataset.id,"id")
    wx.navigateTo({
      url: '/pages/detail/detail?id='+e.currentTarget.dataset.id,
    })
  },

  onShareAppMessage(e) {
    

  },
  // onShareTimeline: function (){
  //   // return {
  //   //   title: "测试小程序朋友圈分享",
  //   //   query: "id=110101&name=heyzqt",
  //   //   imageUrl: "https://example.cn/test.png"
  //   // }
  // },
})