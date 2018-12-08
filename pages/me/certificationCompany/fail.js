// pages/me/certificationCompany/fail.js
var app = getApp();
let util = app.requirejs();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    example_list: ['/image/IDcard1.png', '/image/IDcard2.png', '/image/IDcard3.png'],
    IDcard_list: ['/image/add_pic.png', '/image/add_pic.png', '/image/add_pic.png'],
    type: 0 //0:审核失败，1：审核成功
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var example_list = new Array();
    var IDcard_list = new Array();
    example_list = app.globalData.userInfo.company.licenseimages.split(',');
    IDcard_list = app.globalData.userInfo.company.smallimages.split(',');
    that.setData({
      company: app.globalData.userInfo.company,
      type: options.id,
      example_list: example_list,
      IDcard_list: IDcard_list
    })
    if (options.id == 1) {
      wx.setNavigationBarTitle({
        title: '审核成功',
      })
    }
  },
  submit: function () {
    wx.navigateTo({
      url: 'index',
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

  },
  _prevImg: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    const idx = e.currentTarget.dataset.index
    if (id == 1) {
      var list = new Array;
      var images = that.data.example_list;
      list.push(images[idx]);
      wx.previewImage({
        urls: list
      })
    } else {
      var list = new Array;
      var images = that.data.IDcard_list;
      list.push(images[idx]);
      wx.previewImage({
        urls: list
      })
    }

  }
})