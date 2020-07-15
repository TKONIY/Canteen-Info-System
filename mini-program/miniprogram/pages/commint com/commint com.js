// miniprogram/pages/commint com/commint com.js
const db = wx.cloud.database()
let com = ""
var pages = getCurrentPages();
var time_util = require('../../utils/time.js')
var conv_canteen_util = require('../../utils/convert_canteen.js')
var dishId = (wx.getStorageSync('dishId'))
var openid = (wx.getStorageSync('openid'))
var canteenno = (wx.getStorageSync('canteenno'))
var dish_name = ""
var canteen_name = conv_canteen_util.convert_canteen(canteenno)

Page({
  comment(event){
    console.log(event)
    com = event
    let that = this
    db.collection('dish').where({
      canteenno: canteenno,
      id: dishId
    }).get({
      success(res) {
        dish_name = res.data[0].name
      }
    })
  },

  res: function (e) {
    let that = this 
    console.log(that.data.mid)


    console.log("食堂代号：" + canteenno)

    var time = new Date().getTime();

    db.collection('userinfo').where({
      _openid: openid
    }).get({
      success(res) {
        console.log("获取用户openid成功", res)

        console.log('自定义格式 ' + time_util.formatTime2(new Date().getTime() / 1000, 'Y年M月D日 h:m:s'))
        console.log(com)

        db.collection('comment').add({
          data: {
            nickname: res.data[0].nickname,
            school: res.data[0].school,
            grade: res.data[0].grade,
            comment: com.detail.value,
            canteen_name: canteen_name,
            canteenno: canteenno,
            dish_id: dishId,
            dish_name: dish_name,
            time: time,
            format_time: time_util.formatTime2(new Date().getTime() / 1000, 'Y年M月D日 h:m:s'),
          },
          success: res => {
            // 在返回结果中会包含新创建的记录的 _id
            console.log('[数据库] [新增记录] 成功，记录 内容: ', com.detail.value)
            wx.showToast({
              title: '评论提交成功',
            })
            wx.navigateBack({
              delta: 1
            })
          },
          fail: err => {
            console.error('[数据库] [新增记录] 失败：', err)
            wx.showToast({
              icon: 'none',
              title: '提交失败'
            })
            wx.navigateBack({
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
    console.log(options.id)
    this.setData({
      mid: options.id
    })
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

  btnClick:function(){
    
  },

  onChange(event) {
    this.setData({ value: event.detail });
  }
})