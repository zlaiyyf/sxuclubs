
# 山大clubs
一个山大社团矩阵小程序，另外还可以添加收藏社团，还有社团管理员发布端和小程序负责人管理端
# 目的
- 解决校园信息分散以及有些社团人员过少宣传力度不足，导致学生获取信息不及时
- 结合当下的疫情和学生安全，学校内部应该经可能的减少人员的走动，这就不能用原来的宣传方法（走宿舍、走新生楼），通过这种线上的宣传让萌新也能了解学校的社团

# 如何动手制作一个这样的小程序？
1. 需要开通小程序云开发（真的是方便，而且还不要钱，也不需要维护服务器)
2. 将cloudfunctions函数部署到云，数据库建两个集合users和clubs
3. 然后就进行简单的修改就可以发布适合自己学校的小程序
# 用户权限


用户 | 收藏功能 |权限申请| 管理社团 | 管理申请|
:---:| :---: |:---:|:---:|:---:
游客 | √ | √ |✖|✖
社团负责人|  √ | √ |  √|✖
小程序运营者|   √| √ |  √| √
小程序总负责人|  √ | √ |  √| √
# 截图
![Image text](https://github.com/zlaiyyf/sxuclubs/tree/1.0.0/image/5b99999e732dafae52cb424f1621769.png)
![Image text](https://github.com/zlaiyyf/sxuclubs/tree/1.0.0/image/2175813fb037924ab836e7ec8bcb3d0.png)
![Image text](https://github.com/zlaiyyf/sxuclubs/tree/1.0.0/image/b05a996ab12eba6a77cf860e1135d02.png)
# 进一步
1. 提供订阅信息给用户提醒
2. 使用微信支付，为社团报名收款

#致谢

- [ColorUI](https://github.com/weilanwl/ColorUI)
- [Mini-add-tips](https://github.com/MakerGYT/mini-add-tips)

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)