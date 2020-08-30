
# 山大clubs
一个山大社团矩阵小程序，另外还可以添加收藏社团，还有社团管理员发布端和小程序负责人管理端

# 目的

- 解决校园信息分散以及有些社团人员过少宣传力度不足，导致学生获取信息不及时
- 结合当下的疫情和学生安全，学校内部应该经可能的减少人员的走动，这就不能用原来的宣传方法（走宿舍、走新生楼），通过这种线上的宣传让萌新也能了解学校的社团

# 如何为自己学校制作一个这样的小程序
1. 小程序完全使用小程序的云开发，所以需要开通小程序云开发（真的是方便，而且还不要钱，也不需要维护服务器)
2. 将cloudfunctions函数部署到云，数据库建两个集合users和clubs
3. 然后就进行简单的修改就可以发布适合自己学校的小程序
 
# 用户权限


用户 | 收藏功能 |权限申请| 管理社团 | 管理申请|
:---:| :---: |:---:|:---:|:---:
游客 | √ | √ |✖|✖
社团负责人|  √ | √ |  √|✖
小程序运营者|   √| √ |  √| √
小程序总负责人|  √ | √ |  √| √

# 社团信息实时更新

为了让社团信息实时更新，动手做之前想了不少方法，但翻阅云开发文档发现，原来云数据库已经有这样的功能（厉害啦）， [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

# 部分页面截图



### 首页

[![dbfBuQ.png](https://s1.ax1x.com/2020/08/30/dbfBuQ.png)](https://imgchr.com/i/dbfBuQ)

### 社团详细信息展示（社团介绍、迎新QQ群等）

[![dbfdgS.png](https://s1.ax1x.com/2020/08/30/dbfdgS.png)](https://imgchr.com/i/dbfdgS)

### 用户信息界面（超级管理员截图，其他人功能没有这么多）

[![dbfa38.png](https://s1.ax1x.com/2020/08/30/dbfa38.png)](https://imgchr.com/i/dbfa38)




# 进一步
1. 提供订阅信息给用户提醒
2. 使用微信支付，为社团报名收款
3. 二流的程序猿，即使使用了这么优秀的前端UI框架，前端依旧这么丑，未来可以优化一下

# 体验

[![dbfwjg.jpg](https://s1.ax1x.com/2020/08/30/dbfwjg.jpg)](https://imgchr.com/i/dbfwjg)

# 致谢

- [ColorUI](https://github.com/weilanwl/ColorUI)
- [Mini-add-tips](https://github.com/MakerGYT/mini-add-tips)
- [云开发](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)