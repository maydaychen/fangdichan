// pages/login/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.login({
      success: function(res) {
        if (res.code) {
          wx.request({
            url: 'https://apis.vitlf.com/user/getOpenId',
            data: {
              code: res.code
            },
            success(res) {
              getApp().globalData.openid = res.data.data.openid;
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
      fail: function(res) {
        wx.showModal({
          title: '提示',
          content: res.errMsg,
          showCancel: false
        })
      }
    })
  },

  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      wx.getUserInfo({
        success: function(res) {
          app.globalData.userInfo = res.userInfo;
          wx.request({
            header: {
              'content-type': 'application/json'
            },
            url: app.globalData.baseUrl + '/user/login',
            data: {
              encrytedData: res.encryptedData,
              iv: res.iv,
            },
            success: function(res) {
              console.log(res.data);
              wx.switchTab({
                url: '/pages/index/index',
              })

            }
          })
          console.log(res)
          res.userInfo
          //从数据库获取用户信息
          // this.queryUserInfo();
          //用户已经授权过
          //       wx.switchTab({
          //         url: '/pages/index/index'
          //       })
        }
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '提示',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入',
        showCancel: false,
        success: function(res) {}
      })
    }
  },

  // 获取用户信息
  queryUserInfo: function() {
    wx.request({
      url: 'https://apis.vitlf.com/user/getUserInfo',
      data: {
        openid: app.globalData.openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data);
        // getApp().globalData.userInfo = res.data;
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