// miniprogram/pages/commint com/commint com.js
let com = ""
var pages = getCurrentPages();
Page({
  comment(event){
    console.log(event)
    com = event
  },

  res: function (e) {
    let that = this
    console.log(that.data.mid)
    const db = wx.cloud.database()
    var canteenno = (wx.getStorageSync('canteenno'))
    console.log("食堂代号：" + canteenno)
    var dishId = (wx.getStorageSync('dishId'))
    var openid = (wx.getStorageSync('openid'))
    var time = new Date().getTime();

    var jw = db.collection('userinfo').where({
      _openid: openid
    }).get({
      success(res) {
        console.log("获取用户openid成功", res)

        //在每一条评论中加入用户信息！！！！

        //pages[pages.length - 2].onShow();

        db.collection('comment').add({
          data: {
            grade: jw.grade,
            comment: com.detail.value,
            canteenno: canteenno,
            dish_id: dishId,
            time: time
          },
          success: res => {
            // 在返回结果中会包含新创建的记录的 _id
            this.setData({
              comment: com.detail.value
            })
            console.log('[数据库] [新增记录] 成功，记录 内容: ', com.detail.value)
            wx.navigateBack({
            })
            wx.showToast({
              title: '评论提交成功',
            })
          },
          fail: err => {
            console.error('[数据库] [新增记录] 失败：', err)
            wx.navigateBack({
            })
            wx.showToast({
              icon: 'none',
              title: '提交失败'
            })
          }
        })
      },
      fail(res) {

      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {

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
    console.log("route:" + this.route)
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

  }
})