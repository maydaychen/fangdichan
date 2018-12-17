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
    housetype_list: [],
    only_list: ['不满两年', '满二', '满五'],
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
  setTitle: function (e) {
    this.setData({
      title: e.detail.value
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
          only: index,
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
  imgsOnChange1(e) {
    this.setData({
      outdoor_img_list: e.detail
    })
  },
  imgsOnChange2(e) {
    this.setData({
      room_img_list: e.detail
    })
  },
  submit: function (e) {
    let {
      type,
      only,
      face,
      zhuang,
      levator,
      company_img_list,
      outdoor_img_list,
      room_img_list
    } = this.data
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    // util.request({
    //   url: '/House/secondhandHireInsert',
    //   data: {
    //     openId: app.globalData.openInfo.openid,
    //     villages_id: "",
    //     huxing: "",
    //     price: e.detail.value.price,
    //     acreage: e.detail.value.acreage,
    //     typehousing: type,
    //     solehousing: only,
    //     orientation: face,
    //     renovation: zhuang,
    //     levator: levator,
    //     floor: e.detail.value.floor,
    //     totallevel: e.detail.value.totallevel,
    //     propertyright: e.detail.value.propertyright,
    //     housinglife: e.detail.value.housinglife,
    //     name: e.detail.value.name,
    //     description: e.detail.value.description,
    //     matching: "",
    //     indoorimages: company_img_list.join(","),
    //     partmentimages: outdoor_img_list.join(","),
    //     outdoorimages: room_img_list.join(","),
    //     promise: check?1:0,
    //   },
    //   success: res => {
    //     this.setData({
    //       xieyi: res.data,

    //     })
    //   }
    // })
  },
})