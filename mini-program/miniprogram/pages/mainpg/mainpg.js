// miniprogram/pages/mainpg/mainpg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canteenlist:[
      {
        name:"学一",
        people:10,
        id:1

      },
      {
        name: "学二",
        people: 11,
        id: 2

      },
      {
        name: "学三",
        people: 20,
        id: 3

      },
      {
        name: "学四",
        people: 10,
        id: 4

      },
      {
        name: "学五",
        people: 2,
        id: 5

      },
      {
        name: "教一",
        people: 30,
        id: 6

      },
      {
        name: "教二",
        people: 10,
        id: 7

      },
      {
        name: "教三",
        people: 10,
        id: 8

      },
      {
        name: "教四",
        people: 10,
        id: 9

      },
      {
        name: "教五",
        people: 10,
        id: 10

      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  f0: function (event) {
    var canteenId = event.currentTarget.dataset.canteenId
    console.log(canteenId);
    wx.navigateTo({
      url: '/pages/canteen/canteen?id=' + canteenId
    })
  }
})