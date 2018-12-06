// pages/house/rent/hezu/new/index.js
const app = getApp();
let util = app.requirejs();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    outside: [],
    inside: [],
    house: [],
    housetype: [],
    only: ['不满两年', '满二', '满五'],
    zhuang: [],
    check: false, //是否同意协议
    id: 2, //展示的模块id
    search: [] //搜索结果
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
  message: function (e) {
    console.log(e.detail.value);
  },
  search: function (e) { //搜索结果
    this.setData({
      key: e.detail.value
    })
  },
  searchenter: function (e) { //回车事件
    console.log(e.detail.value);
  },
  img: function (e) { //选择图片
    if (e.currentTarget.id == 1) {
      app.chooseImg(this.data.inside, res => {
        this.setData({
          inside: res
        })
      })
    }
    if (e.currentTarget.id == 2) {
      app.chooseImg(this.data.outside, res => {
        this.setData({
          outside: res
        })
      })
    }
    if (e.currentTarget.id == 3) {
      app.chooseImg(this.data.house, res => {
        this.setData({
          house: res
        })
      })
    }
  },
  delete: function (e) { //删除图片
    var that = this;
    var index = e.currentTarget.dataset.index;
    if (e.currentTarget.id == 1) {
      that.data.inside.splice(index, 1);
      that.setData({
        inside: that.data.inside
      })
    }
    if (e.currentTarget.id == 2) {
      that.data.outside.splice(index, 1);
      that.setData({
        outside: that.data.outside
      })
    }
    if (e.currentTarget.id == 3) {
      that.data.house.splice(index, 1);
      that.setData({
        house: that.data.house
      })
    }
  },
  check: function () { //是否同意协议 true/false
    this.setData({
      check: !this.data.check
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.request({
        url: '/general/typeHousing',
        success: res => {
          console.log(res);
          var types = new Array;
          for (var i in res.data) {
            types.push(res.data[i].name);
          }
          this.setData({
            housetype: types
          })
        }
      }),
      util.request({
        url: '/general/orientation',
        success: res => {
          console.log(res);
          var types = new Array;
          for (var i in res.data) {
            types.push(res.data[i].name);
          }
          this.setData({
            face: types
          })
        }
      }),
      util.request({
        url: '/general/huxingroom',
        success: res => {
          console.log(res);
          var types = new Array;
          for (var i in res.data) {
            types.push(res.data[i].name);
          }
          this.setData({
            room: types
          })
        }
      }),
      util.request({
        url: '/general/huxinghall',
        success: res => {
          console.log(res);
          var types = new Array;
          for (var i in res.data) {
            types.push(res.data[i].name);
          }
          this.setData({
            hall: types
          })
        }
      }),
      util.request({
        url: '/general/huxingwei',
        success: res => {
          console.log(res);
          var types = new Array;
          for (var i in res.data) {
            types.push(res.data[i].name);
          }
          this.setData({
            wei: types
          })
        }
      }),
      util.request({
        url: '/general/renovation',
        success: res => {
          console.log(res);
          var types = new Array;
          for (var i in res.data) {
            types.push(res.data[i].name);
          }
          this.setData({
            zhuang: types
          })
        }
      }),
      util.request({
        url: '/common/promotionAgreement',
        success: res => {
          this.setData({
            xieyi: res.data
          })
        }
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