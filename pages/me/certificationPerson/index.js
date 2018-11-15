// pages/me/certificationPerson/index.js
let util = require(`../../../utils/util.js`);
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    example_list: ['/image/IDcard1.png', '/image/IDcard2.png', '/image/IDcard3.png'],
    example_text: ['正面', '反面', '半身照'],
    IDcard_list: ['/image/add_pic.png', '/image/add_pic.png', '/image/add_pic.png'],
    imgs: {
      0: "https://apis.vitlf.com/uploads/20181115/89ce2c8936621a21803c7b3049017efb.jpg",
      1: "",
      2: ""
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  add_pic: function(e) {
    var that = this;
    var dataset = e.target.dataset;
    var Index = dataset.index; //拿到是第几个数组
    console.log(that.data.imgs[Index]);
    const D = this.data
    util.upload({
      count: 1,
      success: res => {
        console.log(res);
        that.data.imgs[Index] = app.globalData.baseUrl + res.url;
        // let imgList = D.imgs
        // let longPath = D.longPath
        // let shortPath = D.shortPath
        // imgList.push(res.files[0])
        // longPath.push(res.files[0].url)
        // shortPath.push(res.files[0].filename)
        // this.setData({
        //   imgs: imgList,
        //   shortPath: shortPath,
        //   longPath: longPath
        // });
        // this.triggerEvent('imgs', D.shortPath, {})
      }
    })
  }
})