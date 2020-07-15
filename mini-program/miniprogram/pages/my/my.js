// pages/deployFunctions/deployFunctions.js
const db = wx.cloud.database().collection('userinfo')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    username:"will",
    gender:"男",
    grade:"2019级",

    datalist: []

  },
  

  f0: function (event) {
    wx.navigateTo({
      url: '/pages/input/input'
    })
  },

  onLoad: function () {
    //wx.setStorageSync('avatar', avatarUrl)
    let that = this
    const openid = wx.getStorageSync('openid')
    console.log(that.data.mid)
    console.log("sssss")
    db.where({
      _openid: openid
    }).get({
      success(res) {
        console.log("请求成功", res)
        that.setData({
          datalist: res.data
        })
        db.where({
          _openid: openid
        }).add({
          avatarUrl: './user-unlogin.png'
        })
      },
      fail(res) {
        console.log("请求失败", res)
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function (e) {
    console.log("look here!")
    console.log(e)
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
      db.add({
        //avatar: avatarUrl
      })
    }
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
    this.onLoad()
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

//     f4(e) {
//     wx.request({
//       url: 'https://canteencloud.com/test',
//       data: {
//         x: '1',
//         y: '2'
//       },
//       header: {
//         'content-type': 'application/json' // 默认值
//       },
//       success(res) {
//         console.log(res.data)
//       }
//     })

  getUserInfo: function (e) {
    var openid = wx.getStorageSync('openid')
    var userInfo = e.detail.userInfo
    console.log(e)
    console.log(userInfo)
    // db.where({
    //   _openid: openid
    // }).get({
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })
    wx.setStorageSync('gender', userInfo.gender)

  }
})