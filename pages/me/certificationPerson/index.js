// pages/me/certificationPerson/index.js
let util = require(`../../../utils/util.js`);
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    example_list: ['/image/IDcard1.png', '/image/IDcard2.png', '/image/IDcard3.png'],
    example_text: ['正面', '反面', '半身照'],
    IDcard_list: ['/image/add_pic.png', '/image/add_pic.png', '/image/add_pic.png'],
    personType: [],
    personSex: ['男', '女'],
    id: 0, //展示的模块id
    imgs: {
      0: "",
      1: "",
      2: ""
    },
    name: "",
    sex: "",
    ID: "",
    type: "",
    code: "",
  },
  22: function () {
    this.setData({
      show: !this.data.show
    })
  },
  choose: function (e) {
    var id = e.currentTarget.id;
    console.log(id)
    const index = e.currentTarget.dataset.index
    console.log(index)
    if (id == 1) {
      this.setData({
        sex: index,
      })
    }
    if (id == 2) {
      this.setData({
        type: index,
      })
    }
  },
  show: function (e) {
    this.setData({
      show: !this.data.show,
      id: e.currentTarget.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.request({
      url: '/brokerage/getType',
      success: res => {
        console.log(res);
        var types = new Array;
        for (var i in res.data) {
          types.push(res.data[i].name);
        }
        this.setData({
          personType: types
        })
      }
    })
  },

  toCertificationCompany() {
    wx.redirectTo({
      url: '/pages/me/certificationCompany/index',
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
  add_pic: function (e) {
    var that = this;
    var dataset = e.target.dataset;
    var Index = dataset.index; //拿到是第几个数组
    console.log(that.data.imgs[Index]);
    const D = this.data
    util.upload({
      count: 1,
      success: res => {
        console.log(res);
        var images = that.data.imgs;
        images[Index] = app.globalData.baseUrl + res.url;
        that.setData({
          imgs: images
        })
      }
    })
  },
  _prevImg(e) {
    var that = this;
    const idx = e.currentTarget.dataset.index
    var list = new Array;
    var images = that.data.imgs;
    list.push(images[idx]);
    wx.previewImage({
      urls: list
    })
  },
  /**
   * 删除已选图片
   */
  _deleteImg(e) {
    var that = this;
    const idx = e.currentTarget.dataset.idx;
    var images = that.data.imgs;
    images[idx] = "";
    that.setData({
      imgs: images
    })
  },
  setName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  setSex(e) {
    this.setData({
      sex: e.detail.value
    })
  },
  setID(e) {
    this.setData({
      ID: e.detail.value
    })
  },
  setType(e) {
    this.setData({
      type: e.detail.value
    })
  },
  setCode(e) {
    this.setData({
      code: e.detail.value
    })
  },
  submit() {
    let {
      name,
      sex,
      ID,
      type,
      code,
      imgs
    } = this.data
    var smallimage = "";
    if (name.trim() == '') {
      return void wx.showModal({
        title: '提示',
        content: '请填写姓名',
        showCancel: false
      })
    }
    if (sex.trim() == '') {
      return void wx.showModal({
        title: '提示',
        content: '请选择性别',
        showCancel: false
      })
    }
    if (ID.trim() == '') {
      return void wx.showModal({
        title: '提示',
        content: '请填写身份证号',
        showCancel: false
      })
    }
    if (type.trim() == '') {
      return void wx.showModal({
        title: '提示',
        content: '请选择经纪人类型',
        showCancel: false
      })
    }
    for (var i in imgs) {
      if (!imgs[i]) {
        return void wx.showModal({
          title: '提示',
          content: '请上传身份证！',
          showCancel: false
        })
      }
    }
    smallimage = imgs[0] + "," + imgs[1] + "," + imgs[2];
    util.request({
      url: '/user/personalAuth',
      data: {
        openId: app.globalData.openInfo.openid,
        type: "personal",
        name: name,
        sex: sex,
        card: ID,
        level: type,
        code: code,
        smallimages: smallimage
      },
      success: res => {
        console.log(res)
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
  }
})