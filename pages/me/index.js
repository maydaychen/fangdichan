// pages/me/index.js
var that = this;
var app = getApp();
let util = require(`../../utils/util.js`)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,
    tele: "0510-88888",
    isConfirmed: true,
    userInfo: null,
    showBindPhoneModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      userInfo: app.globalData.userInfo
    })
    if (app.globalData.userInfo.phone == "") {
      that.setData({
        showBindPhoneModal: true
      })
    }
  },

  getPhoneNumber(e) {
    this.setData({
      showBindPhoneModal: false
    })
    util.request({
      url: '/user/bindPhone',
      data: {
        openId: app.globalData.openInfo.openid,
        sessionKey: app.globalData.openInfo.session_key,
        iv: e.detail.iv,
        encryptedData: e.detail.encryptedData,
      },
      success(res) {
        app.globalData.userInfo.phone = res.data.phone
        wx.showToast({
          title: '绑定成功',
          icon: 'success',
          duration: 1500
        })
      }
    })
  },

  cancel() {
    this.setData({
      showBindPhoneModal: false  
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

  },
  certification: function() {
    that = this;
    if (that.data.type == 0) {
      wx.navigateTo({
        url: 'certificationPerson/index',
      })
    } else {
      wx.navigateTo({
        url: 'certificationCompany/index',
      })
    }

  }
})