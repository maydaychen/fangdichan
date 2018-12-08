var util = {};

util.upload = function (option, type = 'images') {
  var app = getApp();
  var url = app.globalData.baseUrl + '/common/upload';
  var openid = wx.getStorageSync("userInfo").openid;
  var option = option ? option : {};
  switch (type) {
    case "image":
    default:
      wx.chooseImage({
        count: option.count ? option.count : 1, // 默认1
        sizeType: option.sizeType ? option.sizeType : ["compressed"], // 可以指定是原图还是压缩图，默认压缩图
        sourceType: option.sourceType ? option.sourceType : ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function (files) {
          //返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var responsePath = {};
          var tempFilePaths = files.tempFilePaths;
          responsePath.tempFilePaths = tempFilePaths;
          if (option.complete && typeof option.complete == "function") {
            option.complete(responsePath);
          }
          // const LENGTH = tempFilePaths.length
          // let imgList = [] // {filename:上传至服务器所用字段,status,url:全路径}
          // let longPath = [] // 全路径数组
          // let shortPath = [] // filename数组
          for (let i in tempFilePaths) {
            util.uploadFile(tempFilePaths[i], i, option);
          }
        }
      });
      break;
    case "video":
      wx.chooseVideo({
        maxDuration: option.maxDuration ? option.maxDuration : 60, // 默认最长60s
        compressed: option.compressed != null ? option.compressed : true, // 是否压缩所选的视频源文件，默认值为true
        sourceType: option.sourceType ? option.sourceType : ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function (files) {
          //返回选定视频的本地文件路径
          var responsePath = {};

          responsePath.tempFilePath = files.tempFilePath;

          if (option.complete && typeof option.complete == "function") {
            option.complete(responsePath);
          }
          util.uploadFile(responsePath.tempFilePath, 0, option);
        }
      });
      break;
  }
  /**
   * 上传文件方法
   */
  util.uploadFile = function (tempFilePath, key, option) {
    console.log(url);
    wx.uploadFile({
      url: url,
      filePath: tempFilePath,
      name: "file",
      success: function (result) {
        var data = JSON.parse(result.data);
        console.log(data);
        if (data.code != 1) {
          if (option.fail && typeof option.fail == "function") {
            option.fail(data);
          } else {
            wx.showModal({
              title: "提示",
              content: data.message,
              showCancel: false
            });
          }
        } else {
          var responseData = {}; //图片信息
          responseData = data.data;
          if (option.success && typeof option.success == "function") {
            option.success(responseData);
          }
        }
      }
    })
  };

  //判断是否JSON格式字符串
  function isJSON(str) {
    if (typeof str == "string") {
      try {
        JSON.parse(str);
        return true;
      } catch (e) {
        return false;
      }
    }
  }
}

util.getInfo = function (option) {
  const that = this;
  wx.login({
    success: function (res) {
      if (res.code) {
        wx.request({
          url: 'https://apis.vitlf.com/user/getOpenId',
          data: {
            code: res.code
          },
          success(res) {
            // getApp().globalData.openid = res.data.data.openid;
            getApp().globalData.openInfo['openid'] = res.data.data.openid;
            getApp().globalData.openInfo['session_key'] = res.data.data.session_key;
            if (option.success && typeof option.success == "function") {
              option.success();
            }
          },
        })
      } else {
        wx.showModal({
          title: '提示',
          content: res.errMsg,
          showCancel: false
        })
      }
    },
    fail: function (res) {
      wx.showModal({
        title: '提示',
        content: res.errMsg,
        showCancel: false
      })
    }
  })
}

util.request = function (opt) {
  var app = getApp();
  wx.request({
    url: app.globalData.baseUrl + opt.url,
    data: opt.data || {},
    header: opt.header ? opt.header : {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: opt.method || 'GET',
    dataType: opt.dataType || 'json',
    responseType: opt.responseType || 'text',
    success: function (response) {
      wx.hideNavigationBarLoading();
      wx.hideLoading();
      if (response.data.code !== 1) {
        wx.showToast({
          title: response.data.msg,
          icon: "none"
        })
      } else {
        if (opt.success && typeof opt.success == "function") {
          opt.success(response.data);
        }
      }
    },
    fail: function (res) {
      if (typeof opt.fail === 'function') {
        opt.fail(res.data)
      }
    },
    complete: function (res) {
      //   wx.hideLoading()
      if (typeof opt.complete === 'function') {
        opt.complete(res.data)
      }
    },
  })
}
module.exports = util;