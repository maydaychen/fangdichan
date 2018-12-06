// pages/me/index.js
var that = this;
var app = getApp();
let util = require(`../../utils/util.js`)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0, //0:个人
    tele: "0510-88888",
    isConfirmed: false,
    userInfo: null,
    showBindPhoneModal: false,
    isRefresh: false,
    failure: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      userInfo: app.globalData.userInfo
    })

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
  checkConfirm: function () {
    if (that.data.type == 0) {
      wx.navigateTo({
        url: 'certificationPerson/fail?id=0',
      })
    } else {
      wx.navigateTo({
        url: 'certificationCompany/fail?id=0',
      })
    }
  },
  cancel() {
    this.setData({
      showBindPhoneModal: false
    })
  },

  getUserInfo: function () {
    util.request({
      url: '/user/info',
      data: {
        openId: app.globalData.openInfo.openid,
      },
      success: res => {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        app.globalData.userInfo = res.data.info;
        that.setData({
          userInfo: res.data.info
        })
        if (app.globalData.userInfo.mobile == "") {
          that.setData({
            showBindPhoneModal: true
          })
        }
        if (app.globalData.userInfo.verification == "company") {
          that.setData({
            type: 1
          })
        }
        if (!app.globalData.userInfo.company.status == "审核中") {
          that.setData({
            isConfirmed: true
          })
        }
        if (app.globalData.userInfo.company.status == "审核失败") {
          that.setData({
            failure: true
          })
        }
      },
      fail: function () {
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
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
    that = this;
    that.getUserInfo();
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

  },
  certification: function () {
    that = this;
    // if (that.data.type == 0) {
    //   wx.navigateTo({
    //     url: 'certificationPerson/index',
    //   })
    // } else {
    //   wx.navigateTo({
    //     url: 'certificationCompany/index',
    //   })
    // }
    if (that.data.type == 0) {
      wx.navigateTo({
        url: 'certificationPerson/fail?id=1',
      })
    } else {
      wx.navigateTo({
        url: 'certificationCompany/fail?id=1',
      })
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    that = this;
    that.setData({
      isRefresh: true,
    })
    that.getUserInfo();
  },
})