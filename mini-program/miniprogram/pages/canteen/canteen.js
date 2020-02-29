// miniprogram/pages/canteen/canteen.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database().collection("dish")

// 初始化 cloud
wx.cloud.init();

Page({
  data: {
    canteenlist: [
      {
        name: "学一",
        people: 10,
        id: 1

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
    ],

    canteendish0: {
      datalist: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      mid: options.id
    })

    let that = this
    console.log(that.data.mid)
    db.where({
      canteenno: parseInt(that.data.mid)
    })
      .get({
        success(res) {
          console.log("请求成功", res)
          that.setData({
            datalist: res.data
          })
        },
        fail(res) {
          console.log("请求失败", res)
        }
      })
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
    console.log(dishId);
    wx.navigateTo({
      url: '/pages/dish/dish?id=' + dishId
    })
  }
})