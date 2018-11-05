var util = {};

util.upload = function(option, type = 'images') {
  var app = getApp();
  var url = app.globalData.baseUrl + 'entry/wxapp/util.uploader.upload';
  var openid = wx.getStorageSync("userInfo").openid;
  url = url + "m=ws_party_const&";
  var option = option ? option : {};
  switch (type) {
    case "image":
    default:
      wx.chooseImage({
        count: option.count ? option.count : 1, // 默认1
        sizeType: option.sizeType ? option.sizeType : ["compressed"], // 可以指定是原图还是压缩图，默认压缩图
        sourceType: option.sourceType ? option.sourceType : ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(files) {
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
        success: function(files) {
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
  util.uploadFile = function(tempFilePath, key, option) {
    wx.uploadFile({
      url: url,
      filePath: tempFilePath,
      name: "file",
      success: function(result) {
        var data = JSON.parse(result.data);
        if (data.errno != 0) {
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
          responseData = data;
          responseData.key = key;
          if (option.success && typeof option.success == "function") {
            option.success(responseData);
          }
        }
      }
    }).onProgressUpdate((res) => {
      var responseProgress = {};
      responseProgress = res;
      responseProgress.key = key;
      if (option.progress && typeof option.progress == "function") {
        option.progress(responseProgress);
      }
    });
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
};
module.exports = util;