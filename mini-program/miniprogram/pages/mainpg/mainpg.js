// miniprogram/pages/mainpg/mainpg.js
var db = wx.cloud.database()

Page({
  test() {
    wx.navigateTo({
      url: '/pages/test/test',
    })
  },
  // getInfo() {
  //   var my_id = data[0]._openid;
  //   let that = this;

  //   db.add({
  //     data:{
  //       test:my_id,


  //     }
  //   })
  // },

  /**
   * 页面的初始数据
   */
  data: {
    canteenlist:[
      {
        name:"学一",
        people:10,
        id:1,
        num:123456,
        time:20200605,
        num1: 16,
        flag:1

      },
      {
        name: "学二",
        people: 11,
        id: 2,
        num:23456,
        time: 20200605,
        num1:16,
        flag: 0

      },
      {
        name: "学三",
        people: 20,
        id: 3,
        num:456789,
        time: 20200605,
        num1: 16,
        flag: 0

      },
      {
        name: "学四",
        people: 10,
        id: 4,
        num: 456789,
        time: 20200605,
        num1: 16,
        flag: 0

      },
      {
        name: "学五",
        people: 2,
        id: 5,
        num: 456789,
        time: 20200605,
        num1: 16,
        flag: 0

      },
      {
        name: "教一",
        people: 30,
        id: 6,
        num: 456789,
        time: 20200605,
        num1: 16,
        flag: 0

      },
      {
        name: "教二",
        people: 10,
        id: 7,
        num: 456789,
        time: 20200605,
        num1: 16,
        flag: 0

      },
      {
        name: "教三",
        people: 10,
        id: 8,
        num: 456789,
        time: 20200605,
        num1: 16,
        flag: 0

      },
      {
        name: "教四",
        people: 10,
        id: 9,
        num: 456789,
        time: 20200605,
        num1: 16,
        flag: 0

      },
      {
        name: "教五",
        people: 10,
        id: 10,
        num: 456789,
        time: 20200605,
        num1: 16,
        flag: 0

      }
    ],


    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

   var x=this;
    //建立连接
    wx.connectSocket({
      url: "wss://canteencloud.com/ws",
    })

    //连接成功
    wx.onSocketOpen(function () {
      wx.sendSocketMessage({
        data: 'stock',
      })
    })
   
    //接收数据
    wx.onSocketMessage(function (data) {
     

      
      console.log(data.data);
     
     var objData = JSON.parse(data.data);
     x.setData({
       people:objData
     })
     
     
    })

    //连接失败
    wx.onSocketError(function () {
      console.log('websocket连接失败！');

    this.getOpenid();
  })

    this.getOpenid();
  },

  //获取用户openid
  getOpenid() {
    let that = this
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log(res)
        console.log('云函数获取到的openid: ', res.result.openid)
        var openid = res.result.openid
        db.collection("userinfo").add({
          data:{
            // test: res.result.appid
          }
        })
        wx.setStorageSync('openid', openid)
        that.setData({
          openid: openid
        })
      }

    })
  }
  ,

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */


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
  },

  
})