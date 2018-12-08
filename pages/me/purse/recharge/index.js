// pages/me/purse/recharge/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: "0",
    hide: true,
    showPop: false
  },
  showPopup () {
    this.setData({
      showPop: true
    })
  },
  hidePopup () {
    this.setData({
      showPop: false
    })
  },
  controlInput (value) {
    value = parseFloat(value).toFixed(2)
    if (isNaN(value)) {
      value = 0.00
    }
  },
  change: function (e) {
    if (e.detail.value) {
      this.setData({
        hide: false
      })
    } else {
      this.setData({
        hide: true
      })
    }
    let valueWrapper = e.detail.value
    let value = ''
    if (/^\d+\.?\d{0,1}$/.test(valueWrapper)) {
      value = valueWrapper
    } else {
      if ((valueWrapper.split('.')[1] + '').length == 1 || (valueWrapper.split('.')[1] + '').length == 2) {
        value = valueWrapper
      } else {
        if (isNaN(parseInt(valueWrapper))) {
          value = ''
        } else {
          value = parseFloat(e.detail.value).toFixed(2)
        }
      }
    }
    this.setData({
      money: value
    })
  },
  cancel: function () {
    this.setData({
      money: "",
      hide: true
    })
  },
  paySubmit () {
    console.log('立即付款')
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