util.request = function(option) {
  // var md5 = require("../../../common/utils/md5.js");
  // var app = getApp();
  var option = option ? option : {};
  option.cachetime = option.cachetime ? option.cachetime : 0;
  option.showLoading = typeof option.showLoading == "undefined" ? true : option.showLoading;

  // var openid = wx.getStorageSync("userInfo").openid;
  var url = option.url;
  if (url.indexOf("http://") == -1 && url.indexOf("https://") == -1) {
    url = util.url(url);
  }
  wx.showNavigationBarLoading();
  if (option.showLoading) {
    util.showLoading();
  }
  if (option.cachetime) {
    var cachekey = md5(url);
    var cachedata = wx.getStorageSync(cachekey);
    var timestamp = Date.parse(new Date());

    if (cachedata && cachedata.data) {
      if (cachedata.expire > timestamp) {
        if (option.complete && typeof option.complete == "function") {
          option.complete(cachedata);
        }
        if (option.success && typeof option.success == "function") {
          option.success(cachedata);
        }
        console.log("cache:" + url);
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        return true;
      } else {
        wx.removeStorageSync(cachekey);
      }
    }
  }
  wx.request({
    url,
    data: option.data ? option.data : {},
    header: option.header ? option.header : {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: option.method ? option.method : 'POST',
    success: function(response) {
      wx.hideNavigationBarLoading();
      wx.hideLoading();
      if (response.data.errno !== 0) {
        if (option.fail && typeof option.fail == 'function') {
          option.fail(response.data);
        } else {
          if (response.data.message) {
            if (response.data.data != null && response.data.data.redirect) {
              var redirect = response.data.data.redirect;
            } else {
              var redirect = "";
            }
            util.message(response.data.message, redirect, "error");
          }
        }
        return;

      } else {
        if (response.data.message) {
          util.message(response.data.message, "", "success");
        }
        if (option.success && typeof option.success == "function") {
          option.success(response.data);
        }
        //写入缓存，减少HTTP请求，并且如果网络异常可以读取缓存数据
        if (option.cachetime) {
          var cachedata = {
            data: response.data,
            expire: timestamp + option.cachetime * 1000
          };
          wx.setStorageSync(cachekey, cachedata);
        }
      }
    },
    fail: function(response) {
      wx.hideNavigationBarLoading();
      wx.hideLoading();
      //如果请求失败，尝试从缓存中读取数据
      // var md5 = require("../../../common/utils/md5.js");
      var cachekey = md5(url);
      var cachedata = wx.getStorageSync(cachekey);
      if (cachedata && cachedata.data) {
        if (option.success && typeof option.success == "function") {
          option.success(cachedata);
        }
        console.log("failreadcache:" + url);
        return true;
      } else {
        util.message('网络请求超时', '', "error");
      }
    },
    complete: function(response) {
      if (option.complete && typeof option.complete == "function") {
        option.complete(response.data);
      }
    }
  });
};

/**
	构造地址,
	@params action 格式为 'wxapp/home/navs'
	@params querystring 格式为 {参数名1 : 值1, 参数名2 : 值2}
*/
util.url = function(action, querystring) {
  var app = getApp();
  var url = app.siteInfo.siteroot + action;

  if (action) {
    action = action.split('/');
    if (action[0]) {
      url += 'c=' + action[0] + '&';
    }
    if (action[1]) {
      url += 'a=' + action[1] + '&';
    }
    if (action[2]) {
      url += 'do=' + action[2] + '&';
    }
  }
  var sessionid = wx.getStorageSync("userInfo").sessionid;
  var state = getUrlParam(url, 'state');
  if (!state && sessionid) {
    url = url + 'state=v8uuid-' + sessionid + "&";
  }

  if (querystring && typeof querystring === "object") {
    for (let param in querystring) {
      if (param && querystring.hasOwnProperty(param) && querystring[param]) {
        url += param + "=" + querystring[param] + "&";
      }
    }
  }
  return url;
};