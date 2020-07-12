// miniprogram/pages/dish/dish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  
    commentList: [
      { username:"will",
       xueyuan:"信通院2018级",
        time: "刚刚",
        name: "麻辣烫",
        window: 2,
        canteen: "教工餐厅 5楼",
        text: "超好吃！",
        score: 5
      },
      {
        username: "will",
        xueyuan: "信通院2018级",
        time: "2019.10.30 16:46",
        name: "牛肉拉面",
        window: 3,
        canteen: "学生餐厅 2楼",
        text: "超级无敌好吃！！！",
        score: 5
      }
    ]

  },
 onChange(event){
   this.setData({value:event.detail});
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      mid: options.id
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
  f2: function (event) {
  
    wx.navigateTo({
      url: '/pages/commint com/commint com?id='+options.id
    })
  }
})