// miniprogram/pages/canteen/canteen.js
import wxCharts from '../../dist/wxcharts.js';
var lineChart = null;
Page({

  
  /**
   * 页面的初始数据
   */
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

    canteendish0:[
      {name:"西红柿炒鸡蛋",
      price:5,
      score:4.0,
      id:1
      },
      {
        name: "茄子",
        price: 5,
        score: 4.0,
        id:2
      },
      {
        name: "土豆",
        price: 5,
        score: 4.0,
        id:3
      },
      {
        name: "胡萝卜",
        price: 5,
        score: 4.0,
        id:4
        
      },
      
    ]
  
  

    


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
    var categories = [];
    var data = [];
    for (var i = 0; i < 10; i++) {
        categories.push('201620162-' + (i + 1));
        data.push(Math.random()*(20-10)+10);
    }
    return {
        categories: categories,
        data: data
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var x = this;
    console.log(options.id)
    this.setData({
      mid: options.id
    })
    

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
          people: objData
        })
      

    })

    //连接失败
    wx.onSocketError(function () {
      console.log('websocket连接失败！');
    })

    //折线
    var windowWidth = 320;
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
              return val.toFixed(2);
          }
      }],
      xAxis: {
          disableGrid: false
      },
      yAxis: {
          title: '人流量 (个)',
          format: function (val) {
              return val.toFixed(2);
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

  },


  f1: function (event) {
    var dishId = event.currentTarget.dataset.dishId
    console.log(dishId);
    wx.navigateTo({
      url: '/pages/dish/dish?id=' + dishId
    })
  }
})