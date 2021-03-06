// pages/house/twohand/index.js
var app = getApp();
let util = app.requirejs();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    key: ""
  },
  goto: function () { //add
    if (this.data.id == 1) {
      wx.navigateTo({
        url: '/pages/house/twohand/new/index',
      })
    } else {
      wx.navigateTo({
        url: '/pages/house/rent/new/index?id=' + this.data.id,
      })
    }
  },
  change: function (e) {
    this.setData({
      key: e.detail.value
    })
    this.getList();
  },
  detail: function (e) { //详情
    if (this.data.id == 1) {
      wx.navigateTo({
        url: '/pages/house/twohand/detail/index?detail=' + JSON.stringify(this.data.list[e.currentTarget.id]),
      })
    } else {
      wx.navigateTo({
        url: '/pages/house/rent/detail/index?type=' + '&detail=' + JSON.stringify(this.data.list[e.currentTarget.id]),
      })
    }
  },
  bian: function (e) {
    console.log(e);
    var up = 'list[' + parseInt(e.currentTarget.id) + '].bian';
    this.setData({
      [up]: true
    })
  },
  close: function (e) {
    console.log(e);
    var up = 'list[' + parseInt(e.currentTarget.id) + '].bian';
    this.setData({
      [up]: false
    })
  },
  getList: function () {
    if (this.data.id == 1) {
      wx.setNavigationBarTitle({
        title: '房源列表',
      })
      util.request({
        data: {
          openId: app.globalData.openInfo.openid,
        },
        url: '/House/secondhandHireList',
        success: res => {
          console.log(res);
          for (var index in res.data) {
            var pic_list = new Array();
            pic_list = res.data[index]["indoorimages"].split(',');
            res.data[index]["bian"] = false;
            res.data[index]["logo"] = pic_list[0];
          }
          // console.log(res);
          this.setData({
            list: res.data,
          })
        }
      })
    } else {
      util.request({
        data: {
          openid: app.globalData.openInfo.openid,
          type: this.data.id == 2 ? "整租" : "合租",
          name: this.data.key
        },
        url: '/Renting/list',
        success: res => {
          console.log(res);
          for (var index in res.data) {
            var pic_list = new Array();
            pic_list = res.data[index]["smallimages"].split(',');
            res.data[index]["bian"] = false;
            res.data[index]["logo"] = pic_list[0];
          }
          // console.log(res);
          this.setData({
            list: res.data
          })
        }
      })

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
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
    this.getList();
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