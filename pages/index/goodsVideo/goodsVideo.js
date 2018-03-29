// pages/index/goodsVideo/goodsVideo.js
const app = getApp()
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
    wx.setNavigationBarTitle({
      title: '商品视频',
    })
    this.setData({goodsId:wx.getStorageSync('goodsId')});
    wx.request({
      url: `${app.globalData.globalUrl}/p/products/${this.data.goodsId}?token=${wx.getStorageSync('token')}`,
      method: `GET`,
      data: {},
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        this.setData({goodsInfo:res.data})
      }
    })
    wx.request({
      url: `${app.globalData.globalUrl}/p/videos?token=${wx.getStorageSync('token')}&refId=${this.data.goodsId}`,
      method: `GET`,
      data: {},
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        this.setData({videoList:res.data.data})
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
  
  }
})