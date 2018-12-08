// pages/me/record/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedDateForamt: '',
    isGather: true //收款记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.clearStorageSync('selectedDate')
  },

  selectDate() {
    wx.navigateTo({
      url: '/pages/me/selectDate/index',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync('selectedDate')) {
      let selectedDate = wx.getStorageSync('selectedDate');
      let date = selectedDate.year + '年' + selectedDate.month + '月' + selectedDate.day + '日';
      this.setData({
        selectedDateForamt: date
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

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
  changeRecord: function () {
    this.setData({
      isGather: !this.data.isGather
    })
  }
})