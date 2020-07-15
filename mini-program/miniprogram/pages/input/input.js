// pages/input/input.js
const db = wx.cloud.database().collection('userinfo')
wx.cloud.init()
var newname
Page({
  name(event) {
    newname = event
  },
  /**
   * 页面的初始数据
   */
  data: {
    // userInfo: {},
    // logged: false,
    // takeSession: false,
    // requestResult: '',
    // username:"will",
    // gender:"男",
    // grade:"2019级"
    datalist: [],

    schoolArray: ['请选择','计算机院','信通院','电子院','国际学院'],
    schoolIndex: 0,
    gradeArray: ['请选择','2018级', '2019级', '2020级', '2021级'],

    gradeIndex: 0,
  },


  onLoad: function () {
    let that = this
    var i = 0, gradeflag = 1
    var schoolIndex = that.data.schoolIndex
    var school = ''
    const openid = wx.getStorageSync('openid')
    //console.log(that.data.mid)
    db.where({
      _openid: openid
    }).get({
      success(res) {
        console.log("请求成功???", res, res.data[0].school)
        school = res.data[0].school
        console.log(school)


        for (let schoolflag=0; schoolflag==0 && i<10; i=i+1) {

          // wx.showToast({
          //   title: 'haha',
          //   success: function () {
          //     console.log("???")
          //     if (schoolArray[schoolIndex] == school)
          //       schoolflag = 0
          //     else
          //       schoolIndex = schoolIndex + 1
          //   },
          //   fail: function () {
          //     console.log("55555失败辽")
          //   }
          // })
          console.log("check1", schoolArray[schoolIndex])
          if (schoolArray[schoolIndex] == school) {
            schoolflag = 0
          }
          else {
            schoolIndex = schoolIndex + 1
          }
          console.log(i)
        }
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
            gender: gender
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

  schoollist: function (e) {
    console.log('school-e:', e)
    console.log('年级：', this.data.schoolArray[e.detail.value])

    var openid = wx.getStorageSync('openid')
    var id = 'aaa'
    let that = this
    db.where({
      _openid: openid
    }).get({
      success: function (res) {
        console.log("成功")
        console.log(res)
        id = res.data[0]._id
        db.doc(id).update({
          data: {
            school: that.data.schoolArray[e.detail.value]
          },
          success: function (res) {
            console.log("写入数据库成功！")
          },
          fail: function (res) {
            console.log("写入数据库失败！")
          }
        })
      }
    })
    this.setData({
      schoolIndex: e.detail.value
    })

  },

  gradelist: function (e) {
    console.log('grade-e:', e)
    console.log('年级：', this.data.gradeArray[e.detail.value])

    var openid = wx.getStorageSync('openid')
    var id = 'aaa'
    let that = this
    db.where({
      _openid: openid
    }).get({
      success: function (res) {
        console.log("成功")
        console.log(res)
        id = res.data[0]._id
        db.doc(id).update({
          data: {
            grade: that.data.gradeArray[e.detail.value]
          },
          success: function (res) {
            console.log("写入数据库成功！")
          },
          fail: function (res) {
            console.log("写入数据库失败！")
          }
        })
      }

    })
    this.setData({
      gradeIndex: e.detail.value
    })


  },
})


