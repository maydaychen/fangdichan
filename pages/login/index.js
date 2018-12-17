// pages/login/index.js

var app = getApp();
let util = app.requirejs();
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      wx.getUserInfo({
        success: function (res) {
          util.request({
            url: '/user/login',
            data: {
              openId: app.globalData.openInfo.openid,
              sessionKey: app.globalData.openInfo.session_key,
              encrytedData: res.encryptedData,
              iv: res.iv,
            },
            success(res) {
              console.log(res)
              app.globalData.userInfo = res.data;
              // if (res.data.code == 1) {
              wx.switchTab({
                url: '/pages/index/index',
              })
              // }
            }
          })
        }
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '提示',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入',
        showCancel: false,
        success: function (res) {}
      })
    }
  },

  // 获取用户信息
  queryUserInfo: function () {
    wx.request({
      url: 'https://apis.vitlf.com/user/getUserInfo',
      data: {
        openid: app.globalData.openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        // getApp().globalData.userInfo = res.data;
      }
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

  }
})