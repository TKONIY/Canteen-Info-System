// miniprogram/pages/djy/djy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canteenlist: [
      {
        name: "小格冰箱",
        people: "包含冷藏，适用于存放化妆品，少量饮料",
        id: 1

      },
      {
        name: "中格冰箱",
        people: "包含冷藏，适用于存放化妆品，少量饮料",
        id: 2

      },
      {
        name: "大格冰箱",
        people: "包含冷藏，适用于存放化妆品，少量饮料",
        id: 3

      },
      {
        name: "小格冰箱",
        people: "包含冷冻，适用于存放化妆品，少量饮料",
        id: 4

      },
      {
        name: "中格冰箱",
        people: "包含冷冻，适用于存放化妆品，少量饮料",
        id: 5

      },
      {
        name: "大格冰箱",
        people: "包含冷冻，适用于存放化妆品，少量饮料",
        id: 6

      }
    ],

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
  f1: function (event) {
    var dishId = event.currentTarget.dataset.dishId
    wx.setStorageSync('dishId', dishId)
    console.log(dishId);
    wx.navigateTo({
      url: '/pages/dish/dish?id=' + dishId
    })
  }
})