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

  bindKeyInput:function(e) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    let prevPage1 = pages[pages.length - 3]

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


