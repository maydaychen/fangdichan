// pages/house/rent/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 31.5285,
    longitude: 120.28429,
    markers: [{
      id: 1,
      latitude: 31.5285,
      longitude: 120.28429,
      name: '测试地点',
    }],
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var info = JSON.parse(options.detail);
    var markers = new Array();
    var item = new Object;
    item.id = 1;
    item.latitude = parseFloat(info.villages.latitude);
    item.longitude = parseFloat(info.villages.longitude);
    item.name = info.villages.name;
    markers.push(item);
    this.setData({
      info: info, //解析得到对象
      banner: (info.indoorimages + "," + info.partmentimages + "," + info.outdoorimages).split(','),
      latitude: parseFloat(info.villages.latitude),
      longitude: parseFloat(info.villages.longitude),
      markers: markers
    })
  },
  detail: function (e) {
    const idx = e.currentTarget.dataset.idx
    let urls = this.data.banner
    wx.previewImage({
      urls,
      current: urls[idx]
    })
  },
  goMap: function () {
    let {
      latitude,
      longitude,
    } = this.data
    wx.openLocation({
      latitude,
      longitude,
      scale: 18
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