// pages/house/twohand/index.js
var app = getApp();
let util = app.requirejs();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      bian: false
    }],
  },
  goto: function () { //add
    if (this.data.id == 1) {
      wx.navigateTo({
        url: '/pages/house/twohand/new/index',
      })
    }
    if (this.data.id == 2) {
      wx.navigateTo({
        url: '/pages/house/rent/zhengzu/new/index',
      })
    }
    if (this.data.id == 3) {
      wx.navigateTo({
        url: '/pages/house/rent/hezu/new/index',
      })
    }
  },
  detail: function (e) { //详情
    if (this.data.id == 1) {
      wx.navigateTo({
        url: '/pages/house/twohand/detail/index?detail=' + JSON.stringify(this.data.list[e.currentTarget.id]),
      })
    } else {
      wx.navigateTo({
        url: '/pages/house/rent/detail/index?detail=' + JSON.stringify(this.data.list[e.currentTarget.id]),
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    if (options.id == 1) {
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
            list: res.data
          })
        }
      })
    } else {
      util.request({
        data: {
          openId: app.globalData.openInfo.openid,
        },
        url: '/House/rentingList',
        success: res => {
          console.log(res);

        }
      })

    }

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