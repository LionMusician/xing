// pages/index/brandPage/brandPage.js
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
      title: '品牌专辑',
    })
    var brandId = wx.getStorageSync('brandId'),that = this;
    wx.request({
      url: `${app.globalData.globalUrl}/p/products?token=${wx.getStorageSync('token')}&offset=0&limit=10&brandId=${brandId}`,
      method: `GET`,
      data: {},
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        that.setData({brandList:res.data.data})
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
  //跳转到商品视频页
  toGoodsVideo(event){
    wx.setStorageSync("goodsId", event.currentTarget.dataset.goodsid);
    wx.navigateTo({
      url: '../goodsVideo/goodsVideo',
    })
  }
})