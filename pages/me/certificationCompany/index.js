// pages/me/certificationCompany/index.js

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
    personSex: ['男', '女'],
    IDcard_list: ['/image/add_pic.png', '/image/add_pic.png', '/image/add_pic.png'],
    imgs: {
      0: "",
      1: "",
      2: ""
    },
    id: 0, //展示的模块id
    company_img_list: [],
    companyName: "",
    creditCode: "",
    name: "",
    sex: "",
    card: "",
  },
  22: function () {
    this.setData({
      show: !this.data.show
    })
  },
  choose: function (e) {
    var id = e.currentTarget.id;
    const index = e.currentTarget.dataset.index
    console.log(index)
    if (id == 1) {
      this.setData({
        sex: index,
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

  },

  toCertificationPerson() {
    wx.redirectTo({
      url: '/pages/me/certificationPerson/index',
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
    console.log(e.detail)
    this.setData({
      company_img_list: e.detail
    })
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
  setCompName(e) {
    this.setData({
      companyName: e.detail.value
    })
  },
  setCreditCode(e) {
    this.setData({
      creditCode: e.detail.value
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
  setCode(e) {
    this.setData({
      card: e.detail.value
    })
  },
  submit() {
    let {
      companyName,
      creditCode,
      name,
      sex,
      card,
      company_img_list,
      imgs
    } = this.data
    var smallimage = "";
    if (companyName.trim() == '') {
      return void wx.showModal({
        title: '提示',
        content: '请填写公司名称',
        showCancel: false
      })
    }
    if (creditCode.trim() == '') {
      return void wx.showModal({
        title: '提示',
        content: '请填写公司三证合一号',
        showCancel: false
      })
    }
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
    if (card.trim() == '') {
      return void wx.showModal({
        title: '提示',
        content: '请填写身份证号',
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
    if (company_img_list.length < 2) {
      return void wx.showModal({
        title: '提示',
        content: '请上传公司证件！',
        showCancel: false
      })
    }
    smallimage = imgs[0] + "," + imgs[1] + "," + imgs[2];
    var licenseimage = company_img_list.join(",");
    util.request({
      url: '/user/companyAuth',
      data: {
        openId: app.globalData.openInfo.openid,
        companyName: companyName,
        creditCode: creditCode,
        name: name,
        sex: sex,
        card: card,
        licenseimages: licenseimage,
        smallimages: smallimage
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
  }
})