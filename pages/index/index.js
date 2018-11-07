//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
 
  onLoad: function () {
    wx.login({
      success: function (res) {
        console.log(res);
        if (res.code) {
          wx.request({
            url: 'https://apis.vitlf.com/user/getOpenId',
            data: {
              code: res.code
            },
            success(res) {
              console.log(res.data)
            },
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.errMsg,
            showCancel: false
          })
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: res.errMsg,
          showCancel: false
        })
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
