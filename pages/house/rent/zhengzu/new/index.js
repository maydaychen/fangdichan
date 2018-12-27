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
    tag_list: [],
    tag_select: {},
    tag_select_list: [], //已选中标签列表
    check: false, //是否同意协议
    id: 2, //展示的模块id
    search: [], //搜索结果,
    is_list: ["是", "否"],
    villages_id: "",
    title: "",
    description: "",
    room: "",
    hall: "",
    wei: ""
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
  chooseViliage: function (e) {
    this.setData({
      villages_id: e.currentTarget.id,
      show: !this.data.show
    })
  },
  choose: function (e) {
    var id = e.currentTarget.id;
    const index = e.currentTarget.dataset.index
    console.log(index)
    switch (id) {
      case "12":
        var list = this.data.tag_select;
        var select_list = this.data.tag_select_list;
        list[index] = !list[index];
        if (list[index]) {
          select_list.push(index);
        } else {
          select_list.splice(select_list.indexOf(index), 1)
        }
        this.setData({
          tag_select: list,
          tag_select_list: select_list
        })
        break;
    }
  },
  typeChange: function (e) {
    this.setData({
      type: this.data.housetype_list[e.detail.value]
    })
  },
  payChange: function (e) {
    this.setData({
      pay: this.data.pay_list[e.detail.value]
    })
  },
  faceChange: function (e) {
    this.setData({
      face: this.data.face_list[e.detail.value]
    })
  },
  zhuangChange: function (e) {
    this.setData({
      zhuang: this.data.zhuang_list[e.detail.value]
    })
  },
  levatorChange: function (e) {
    this.setData({
      levator: this.data.is_list[e.detail.value]
    })
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
          var tags = new Array;
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
          for (var i in res.data.tags) {
            tags.push(res.data.tags[i].name);
          }
          this.setData({
            housetype_list: types,
            face_list: orientation,
            zhuang_list: renovation,
            room_list: huxingroom,
            hall_list: huxinghall,
            wei_list: huxingwei,
            tag_list: tags
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
  },

  imgsOnChange2(e) {
    this.setData({
      room_img_list: e.detail
    })
  },

  submit: function (e) {
    let {
      villages_id,
      type,
      pay,
      face,
      zhuang,
      levator,
      company_img_list,
      room_img_list,
      room,
      hall,
      wei,
      check,
      tag_select_list
    } = this.data
    util.request({
      url: '/House/rentingInsert',
      data: {
        openId: app.globalData.openInfo.openid,
        type: "整租",
        villages_id: villages_id,
        huxing: room + hall + wei,
        paymentmethod: pay,
        rentmoney: e.detail.value.money,
        acreage: e.detail.value.acreage,
        typehousing: type,
        orientation: face,
        renovation: zhuang,
        levator: levator,
        floor: e.detail.value.floor,
        totallevel: e.detail.value.totallevel,
        name: e.detail.value.name,
        suitablecrowd: e.detail.value.suitablecrowd,
        peripheralmatching: e.detail.value.peripheralmatching,
        traffictrip: e.detail.value.traffictrip,
        coresellingpoint: e.detail.value.coresellingpoint,
        matching: e.detail.value.matching,
        tags: tag_select_list.join(","),
        indoorimages: company_img_list.join(","),
        partmentimages: room_img_list.join(","),
        promise: check ? 1 : 0,
      },
      success: res => {
        wx.showToast({
          title: res.msg,
          mask: true,
          icon: 'none',
        })
        setTimeout(() => {
          wx.navigateBack()
        })
      }
    })
  },
})