// pages/login/welcome/index.js
var app = getApp();
let util = app.requirejs();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userInfo) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  },

  go() {
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              util.request({
                url: '/user/login',
                data: {
                  openId: app.globalData.openInfo.openid,
                  sessionKey: app.globalData.openInfo.session_key,
                  encrytedData: res.encryptedData,
                  iv: res.iv,
                },
                success(res) {
                  app.globalData.userInfo = res.data;
                  wx.switchTab({
                    url: '/pages/index/index',
                  })
                }
              })
            }
          });
        } else {
          wx.redirectTo({
            url: '/pages/login/index',
          })
        }
      },
      fail: function(res) {
        wx.showModal({
          title: '提示',
          content: res.errMsg,
          showCancel: false
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})