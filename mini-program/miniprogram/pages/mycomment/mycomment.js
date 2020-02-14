// pages/deployFunctions/deployFunctions.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    name: "will",
    gender: "男",
    grade: "2019级",

    commentList:[
      {time:"刚刚",
      name:"麻辣烫",
      window:2,
      canteen:"教工餐厅 5楼",
      text:"超好吃！",
      score:5
      },
      {
        time: "2019.10.30 16:46",
        name: "牛肉拉面",
        window: 3,
        canteen: "学生餐厅 2楼",
        text:"超级无敌好吃！！！",
        score:5
      }
    ]
  },

  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none'
    });
  }


})