// pages/house/twohand/new/index.js
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
    housetype_list: [],
    pay_list: [],
    zhuang_list: [],
    check: false, //是否同意协议
    id: 2, //展示的模块id
    search: [], //搜索结果,
    title: "",
    description: ""
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
    this.setData({
      description: e.detail.value
    })
  },
  search: function (e) { //搜索结果
    this.setData({
      key: e.detail.value
    })
  },
  searchenter: function (e) { //回车事件
    console.log(e.detail.value);
  },
  selectRoom: function (e) {
    this.setData({
      room: e.currentTarget.id
    })
  },
  selectHall: function (e) {
    this.setData({
      hall: e.currentTarget.id
    })
  },
  selectWei: function (e) {
    this.setData({
      wei: e.currentTarget.id
    })
  },
  choose: function (e) {
    var id = e.currentTarget.id;
    const index = e.currentTarget.dataset.index
    console.log(index)
    switch (id) {
      case "1":
        break;
      case "2":
        break;
      case "3":
        this.setData({
          type: index,
        })
        break;
      case "4":
        this.setData({
          pay: index,
        })
        break;
      case "5":
        this.setData({
          face: index,
        })
        break;
      case "6":
        this.setData({
          zhuang: index,
        })
        break;
      case "7":
        this.setData({
          levator: index,
        })
        break;

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
        url: '/general/getAll',
        success: res => {
          console.log(res);
          var types = new Array;
          var orientation = new Array;
          var renovation = new Array;
          var huxingroom = new Array;
          var huxinghall = new Array;
          var huxingwei = new Array;
          for (var i in res.data.typeHousing) {
            types.push(res.data.typeHousing[i].name);
          }
          for (var i in res.data.orientation) {
            orientation.push(res.data.orientation[i].name);
          }
          for (var i in res.data.renovation) {
            renovation.push(res.data.renovation[i].name);
          }
          for (var i in res.data.huxingroom) {
            huxingroom.push(res.data.huxingroom[i].name);
          }
          for (var i in res.data.huxinghall) {
            huxinghall.push(res.data.huxinghall[i].name);
          }
          for (var i in res.data.huxingwei) {
            huxingwei.push(res.data.huxingwei[i].name);
          }
          this.setData({
            housetype_list: types,
            face_list: orientation,
            zhuang_list: renovation,
            room_list: huxingroom,
            hall_list: huxinghall,
            wei_list: huxingwei
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
      }),
      util.request({
        url: '/general/paymentMethod',
        success: res => {
          var only = new Array;
          for (var i in res.data) {
            only.push(res.data[i].name);
          }
          this.setData({
            pay_list: only,
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

  },

  imgsOnChange(e) {
    this.setData({
      company_img_list: e.detail
    })
    console.log(this.data.company_img_list.join(","))
  },

  imgsOnChange2(e) {
    this.setData({
      room_img_list: e.detail
    })
  },
  submit: function (e) {
    let {
      type,
      face,
      zhuang,
      company_img_list,
      room_img_list,
      room,
      hall,
      wei
    } = this.data
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    // util.request({
    //   url: '/House/rentingInsert',
    //   data: {
    // openId: app.globalData.openInfo.openid,
    //   type： "整租",
    //   villages_id: "",
    //   huxing: room + hall + wei,
    //   paymentmethod： pay,
    //   rentmoney: e.detail.value.money,
    //   acreage: e.detail.value.acreage,
    //   typehousing: type,
    //   orientation: face,
    //   renovation: zhuang,
    //   floor: e.detail.value.floor,
    //   totallevel: e.detail.value.totallevel,
    //   name: e.detail.value.name,
    //   description: e.detail.value.description,
    //   indoorimages: company_img_list.join(","),
    //   partmentimages: room_img_list.join(","),
    //   promise: check ? 1 : 0,
    //   },
    //   success: res => {
    //     this.setData({
    //       xieyi: res.data,

    //     })
    //   }
    // })
  },
})