// pages/user/myOrder/logistics/logistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "traces": [
      {
      "AcceptDate": "06/25",
      "AcceptTime": "08:05:37",
      "AcceptStation": "正在派件..(派件人:邓裕富,电话:18718866310)[深圳市]",
      "Remark": null
    }, {
        "AcceptDate": "06/25",
      "AcceptTime": "04:01:28",
      "AcceptStation": "快件在 深圳集散中心 ,准备送往下一站 深圳 [深圳市]",
      "Remark": null
    }, {
        "AcceptDate": "06/25",
      "AcceptTime": "01:41:06",
      "AcceptStation": "快件在 深圳集散中心 [深圳市]",
      "Remark": null
    }, {
        "AcceptDate": "06/24",
      "AcceptTime": "20:18:58",
      "AcceptStation": "已收件[深圳市]",
      "Remark": null
    }, {
        "AcceptDate": "06/24",
      "AcceptTime": "20:55:28",
      "AcceptStation": "快件在 深圳 ,准备送往下一站 深圳集散中心 [深圳市]",
      "Remark": null
    }, {
        "AcceptDate": "06/25",
      "AcceptTime": "10:23:03",
      "AcceptStation": "派件已签收[深圳市]",
      "Remark": null
    }, {
        "AcceptDate": "06/25",
      "AcceptTime": "10:23:03",
      "AcceptStation": "签收人是：已签收[深圳市]",
      "Remark": null
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '查看物流',
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
  
  }
})