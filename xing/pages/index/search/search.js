// pages/index/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchBar:{},
    // tab切换  
    currentTab: 0, 
    goodsList: [
      {
        id: 1, url: "http://www.mi4c.cn/imgs/sp-tu@2x.png", title: "阿迪达斯滑板拼色潮玩耐用2018新款滑板"
      },
      {
        id: 2, url: "http://www.mi4c.cn/imgs/sp-tu@2x.png", title: "阿迪达斯滑板拼色潮玩耐用2018新款滑板chuang"
      },
      {
        id: 3, url: "http://www.mi4c.cn/imgs/sp-tu@2x.png", title: "阿迪达斯滑板拼色潮玩耐用2018新款滑板asdadsad"
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '搜索',
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
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    // console.log(e)
    if (this.data.currentTab == e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current
      })
    }
  }  
})