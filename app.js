//app.js
let util = require(`./utils/util.js`)
App({
  onLaunch: function () {
    util.getInfo({
      success: res => {
        console.log("check")
        this.getUser();
      }
    })
  },
  getUser() {
    let that = this
    util.request({
      url: '/user/checkOpenid',
      data: {
        openId: this.globalData.openInfo.openid
      },
      success(res) {
        console.log("check")
        if (res.data.isNum < 1) {
          wx.redirectTo({
            url: '/pages/login/welcome/index',
          })
        }
      },
      fail(res) {
        console.log("check1")
        wx.redirectTo({
          url: '/pages/login/welcome/index',
        })
      }
    })
  },
  //选择图片
  chooseImg: function (imgUrl, callback) { //i:选择图片个数，[]对应的图片数组
    wx.showActionSheet({
      itemList: ['相机', '相册'],
      success: res => {
        if (!res.cancel) {
          let type;
          if (res.tapIndex == 0) {
            type = 'camera'
          } else {
            type = 'album'
          }
          wx.chooseImage({
            count: 9, // 默认9  
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
            sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有  
            success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              if (res.tempFilePaths) {
                for (var j = 0; j < res.tempFilePaths.length; j++) {
                  imgUrl.push(res.tempFilePaths[j]);
                }
              }
              callback(imgUrl)
            },
            fail: function (res) {}
          })
        }
      }
    })
  },
  //上传图片
  updataImg: function (imgUrl, callback) {
    wx.uploadFile({
      url: this.globalData.urls + 'common/upload',
      filePath: imgUrl,
      name: 'file',
      success: function (res) {
        var json = JSON.parse(res.data);
        callback(json)
      },
      faile: function (res) {
        console.log(res);
      }
    })
  },
  requirejs: function (e) {
    return require("utils/util.js")
  },
  globalData: {
    userInfo: null,
    baseUrl: "https://apis.vitlf.com",
    openInfo: {
      openid: '',
      session_key: ''
    }
  }
})