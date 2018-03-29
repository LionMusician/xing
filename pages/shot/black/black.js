// pages/shot/black/black.js
Page({

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
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var whichToShot = wx.getStorageSync('whichToShot'), direction = wx.getStorageSync('direction');
    switch (whichToShot, direction) {
      case (whichToShot, "in"):
        wx.navigateTo({
          url: '../shotVideo/shotVideo',
        })
        break;
      case ("index", "out"):
        wx.switchTab({
          url: '../../index/index',
        })
        break;
      case ("user", "out"):
        wx.switchTab({
          url: '../../user/user',
        })
    }
  
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