// pages/house/rent/new/index.js
const app = getApp();
let util = app.requirejs();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    tag_list: [],
    tag_select: {},
    tag_select_list: [], //已选中标签列表
    facilities_list: [],
    facilities_select: {},
    facilities_select_list: [], //已选中标签列表
    type: 0, //0整租 1合租
    name: "整租",
    check: false, //是否同意协议
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
  choose: function (e) {
    var id = e.currentTarget.id;
    const index = e.currentTarget.dataset.index
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
          tag_select_list: select_list,
          tag: select_list.join(',')
        })
        break;
      case "13":
        var list = this.data.facilities_select;
        var select_list = this.data.facilities_select_list;
        list[index] = !list[index];
        if (list[index]) {
          select_list.push(index);
        } else {
          select_list.splice(select_list.indexOf(index), 1)
        }
        this.setData({
          facilities_select: list,
          facilities_select_list: select_list,
          facilities: select_list.join(',')
        })
        break;
    }
  },
  typeChange: function (e) {
    let id = e.currentTarget.id;
    let name = "";
    if (id == 1) {
      name = "合租";
    } else {
      name = "整租"
    }
    this.setData({
      type: e.currentTarget.id,
      name: name
    })
  },
  nameChange: function (e) {
    this.setData({
      titlename: e.detail.value
    })
  },
  descriptionChange: function (e) {
    this.setData({
      description: e.detail.value
    })
  },
  payChange: function (e) {
    this.setData({
      pay: this.data.pay_list[e.detail.value],
      pay_id: this.data.pay_id_list[e.detail.value],
    })
  },
  selectRoom: function (e) {
    this.setData({
      room: this.data.room_list[e.currentTarget.id].name,
      room_id: this.data.room_list[e.currentTarget.id].id
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
  imgsOnChange(e) {
    this.setData({
      company_img_list: e.detail
    })
  },
  select_address: function () {
    wx.navigateTo({
      url: 'info'
    })
  },
  faceChange: function (e) {
    this.setData({
      face: this.data.face_list[e.detail.value],
      face_id: this.data.face_id_list[e.detail.value]
    })
  },
  zhuangChange: function (e) {
    this.setData({
      zhuang: this.data.zhuang_list[e.detail.value],
      zhuang_id: this.data.zhuang_id_list[e.detail.value]
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
          var orientation = new Array;
          var orientation_id = new Array;
          var renovation = new Array;
          var renovation_id = new Array;
          var huxingroom = new Array;
          var huxinghall = new Array;
          var huxingwei = new Array;
          var tags = new Array;
          var facilities = new Array;

          for (var i in res.data.orientation) {
            orientation.push(res.data.orientation[i].name);
            orientation_id.push(res.data.orientation[i].id);
          }
          for (var i in res.data.renovation) {
            renovation.push(res.data.renovation[i].name);
            renovation_id.push(res.data.renovation[i].id);
          }
          for (var i in res.data.huxingroom) {
            huxingroom.push(res.data.huxingroom[i]);
          }
          for (var i in res.data.huxinghall) {
            huxinghall.push(res.data.huxinghall[i]);
          }
          for (var i in res.data.huxingwei) {
            huxingwei.push(res.data.huxingwei[i]);
          }
          for (var i in res.data.tags) {
            tags.push(res.data.tags[i].name);
          }
          for (var i in res.data.facilities) {
            facilities.push(res.data.facilities[i].name);
          }
          this.setData({
            face_list: orientation,
            face: orientation[0],
            face_id_list: orientation_id,
            face_id: orientation_id[0],
            zhuang_list: renovation,
            zhuang: renovation[0],
            zhuang_id_list: renovation_id,
            zhuang_id: renovation_id[0],
            room_list: huxingroom,
            room: huxingroom[0].name,
            room_id: huxingroom[0].id,
            hall_list: huxinghall,
            hall: huxinghall[0].name,
            hall_id: huxinghall[0].id,
            wei_list: huxingwei,
            wei: huxingwei[0].name,
            wei_id: huxingwei[0].id,
            tag_list: tags,
            facilities_list: facilities
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
          var only_id = new Array;
          for (var i in res.data) {
            only.push(res.data[i].name);
            only_id.push(res.data[i].id);
          }
          this.setData({
            pay_list: only,
            pay_id_list: only_id,
            pay: only[0],
            pay_id: only_id[0]
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
    var that = this;
    wx.getStorage({
      key: 'floor',
      success(res) {
        console.log(res)
        that.setData({
          floor: res.data.split(','),
          villages_id: res.data.split(',')[0],
          viliage_name: res.data.split(',')[1],
          building: res.data.split(',')[2],
          unit: res.data.split(',')[3],
          floor: res.data.split(',')[4],
          housenumber: res.data.split(',')[5]
        })
      }
    })
  },
  submit: function (e) {
    let {
      name,
      villages_id,
      building,
      unit,
      floor,
      housenumber,
      pay_id,
      face_id,
      zhuang_id,
      company_img_list,
      room_id,
      hall_id,
      wei_id,
      tag_select_list,
      description,
      facilities_select_list,
      check,
    } = this.data;
    if (!villages_id) {
      wx.showToast({
        title: '请选择所在小区',
        icon: 'none'
      })
      return
    }
    if (!pay_id || !face_id || !zhuang_id || !tag_select_list || !facilities_select_list) {
      wx.showToast({
        title: '请选择房屋相关选项',
        icon: 'none'
      })
      return
    }
    if (!e.detail.value.acreage || !e.detail.value.name || !e.detail.value.money) {
      wx.showToast({
        title: '请填写房屋相关信息',
        icon: 'none'
      })
      return
    }
    if (!company_img_list) {
      wx.showToast({
        title: '请上传相关图片',
        icon: 'none'
      })
      return
    }
    util.request({
      url: '/Renting/insert',
      data: {
        openid: app.globalData.openInfo.openid,
        type: name,
        quarters_villages_id: villages_id,
        building: building,
        unit: unit,
        floor: floor,
        housenumber: housenumber,
        general_paymentmethod_id: pay_id,
        square: e.detail.value.acreage,
        money: e.detail.value.money,
        apartment_huxingroom_id: room_id,
        apartment_huxinghall_id: hall_id,
        apartment_huxingwei_id: wei_id,
        facilities: facilities_select_list.join(","),
        general_renovation_id: zhuang_id,
        general_orientation_id: face_id,
        name: e.detail.value.name,
        describe: description,
        tagname: tag_select_list.join(","),
        smallimages: company_img_list.join(","),
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
})