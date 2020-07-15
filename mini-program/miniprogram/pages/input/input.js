// pages/deployFunctions/deployFunctions.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    username:"will",
    gender:"男",
    grade:"2019级"

  },


  onLoad: function () {
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

<<<<<<< Updated upstream
  bindKeyInput:function(e) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    let prevPage1 = pages[pages.length - 3]
=======
  f3: function(e) {
    var openid = wx.getStorageSync('openid')
    var id = 'aaa'
    var gender = wx.getStorageSync(gender)
    let that = this
    db.where({
      _openid: openid
    }).get({
      success: function(res){
        console.log("成功")
        console.log(res)
        id = res.data[0]._id
        db.doc(id).update({
          data: {
            nickname: newname.detail.value,
            // gender: gender
          },
          success: function (res) {
            console.log("YEP")
            console.log(res)
            wx.showToast({
              title: '更改成功',
            })
            wx.navigateBack({
              delta:1
            })
          },
          fail: function (res) {
            console.log("too bad!")
          }
        })
      }
    })
  },
>>>>>>> Stashed changes

    prevPage.setData({
      username: e.detail.value
    })
    prevPage1.setData({
      username: e.detail.value
    })
    console.log(this.data.username)
  },

  f3(e) {
    wx.navigateBack({
    })
  }
})


