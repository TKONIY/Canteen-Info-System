// pages/canvas/canvas.js
import wxCharts from '../../dist/wxcharts.js';
var lineChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * line
   */

  touchHandler: function (e) {
    lineChart.scrollStart(e);
  },
  moveHandler: function (e) {
    lineChart.scroll(e);
  },
  touchEndHandler: function (e) {
    lineChart.scrollEnd(e);
    lineChart.showToolTip(e, {
        format: function (item, category) {
            return category + ' ' + item.name + ':' + item.data 
        }
    });        
  },
  createSimulationData: function () {
    var categories = ['14:00','14:05',"14:10","14:15","14:20","14:25","14:30"];
    var data = [10,12,34,21,27,20,18];
    var y = this;
  //  for (var i = 0; i < 7; i++) {
   //     data.push(10);
   // }
    return {
        categories: categories,
        data: data
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var y = this;
    var mid = e.mid;
    wx.connectSocket({
      url: "wss://canteencloud.com/preview"
    })

    //连接成功
    wx.onSocketOpen(function () {
      if (mid = 1) {
        wx.sendSocketMessage({
          data: 'stock1'
        })
      }
      else if(mid = 2){
        wx.sendSocketMessage({
          data: 'stock2'
        })
      }
    })

    //接收数据
    wx.onSocketMessage(function (data) {
      if (/^{[\s\S]*}$/.exec(data.data)) {
        console.log(data.data);

        var objData = JSON.parse(data.data);
        y.setData({
          people: objData
        })
      }

    })

    //连接失败
    wx.onSocketError(function () {
      console.log('websocket连接失败！');
    })

    //折线
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var simulationData = this.createSimulationData();
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: false,
      series: [{
          name: '人流量',
          data: simulationData.data,
          format: function (val, name) {
              return val.toFixed(0);
          }
      }],
      xAxis: {
          disableGrid: false
      },
      yAxis: {
          disabled: false,
          title: '人流量 (个)',
          format: function (val) {
              return val.toFixed(0);
          },
          min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: true,
      dataPointShape: true,
      enableScroll: true,
      extra: {
          lineStyle: 'curve'
      }
    });
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

  }
})