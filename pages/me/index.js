// pages/me/index.js
var that = this;
var app = getApp();
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
    if (app.globalData.userInfo.verification == "") {
      wx.showModal({
        title: '绑定手机号',
        content: '您当前尚未绑定手机号，建议您绑定以获取更多优惠信息',
        showCancel: true, //是否显示取消按钮
        cancelText: "取消", //默认是“取消”
        cancelColor: '#323232', //取消文字的颜色
        confirmText: "确定", //默认是“确定”
        confirmColor: '#1A84D5', //确定文字的颜色
        success: function(res) {
          if (res.confirm) {
            console.log(res)
            console.log('用户点击确定')
            that.setData({
              showBindPhoneModal: true
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        },
        fail: function(res) {}, //接口调用失败的回调函数
        complete: function(res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
      })
    }
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