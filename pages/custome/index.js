// pages/custome/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:['',''],
    width:50,
    show:true,
    call:true,
    type: ['自住型', '租赁型', '投资型','其他']
  },
  call:function(){//电话
    this.setData({
      call:false
    })
  },
  show:function(e){//筛选
    var index = e.target.id;
    this.setData({
      show: false,
      width:50 + 280 * (index -1)
    })
  },
  sure:function(e){
    this.setData({
      show:true
    })
  },
  choose:function(e){//点击选项
    console.log(e);
    this.setData({
      indexs:e.target.id
    })
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