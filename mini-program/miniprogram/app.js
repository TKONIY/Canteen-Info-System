//app.js
App({
  globalData: {
    userInfo: null
  },
  onLaunch: function () {

    wx.cloud.init({
      env: "whattodo-9a20df",
      traceUser: true
    })
  }
})