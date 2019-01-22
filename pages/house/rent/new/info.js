// pages/house/rent/new/info.js
const app = getApp();
let util = app.requirejs();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
  },
  22: function () {
    this.setData({
      show: !this.data.show
    })
  },
  show: function (e) {
    this.setData({
      show: !this.data.show,
      id: e.currentTarget.id
    })
  },
  search: function (e) { //搜索结果
    this.setData({
      key: e.detail.value
    })
  },
  searchenter: function (e) { //回车事件
    util.request({
      url: '/villages/queryName',
      data: {
        name: this.data.key
      },
      success: res => {
        this.setData({
          search: res.data
        })
      }
    })
  },
  chooseViliage: function (e) {
    this.setData({
      villages_id: e.currentTarget.id,
      villages_name: e.currentTarget.dataset.index,
      show: !this.data.show
    })
  },
  firstChange: function (e) {
    this.setData({
      first: e.detail.value
    })
  },
  secondChange: function (e) {
    this.setData({
      second: e.detail.value
    })
  },
  thirdChange: function (e) {
    this.setData({
      third: e.detail.value
    })
  },
  fourthChange: function (e) {
    this.setData({
      fourth: e.detail.value
    })
  },
  back: function () {
    let {
      villages_id,
      villages_name,
      first,
      second,
      third,
      fourth,
    } = this.data;
    if (!villages_id || !villages_name || !first || !second || !third || !fourth) {
      wx.showToast({
        title: '请填写具体信息',
        icon: 'none'
      })
      return
    }
    wx.setStorage({
      key: 'floor',
      data: villages_id + "," + villages_name + "," + first + "," + second + "," + third + "," + fourth,
    })
    wx.navigateBack({})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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