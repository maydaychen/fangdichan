//app.js
let util = require(`./utils/util.js`)
App({
  onLaunch: function() {
    util.getInfo((data) => {})
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