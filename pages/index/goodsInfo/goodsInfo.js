// pages/index/goodsInfo/goodsInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsView: {
      show: false,
      toShotPageWidth: "330",
      toBuyPageWidth: "420"
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商品详情',
    })
    var videoId = wx.getStorageSync('videoId');
    console.log(videoId)
    wx.request({
      url: `${app.globalData.globalUrl}/p/videos/${videoId}?token=${wx.getStorageSync('token')}`,
      method: `GET`,
      data: {

      },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        var goodsInfo = res.data;
        if (goodsInfo.product && goodsInfo.product.name.length > 20) {
          goodsInfo.product.name = goodsInfo.product.name.slice(0, 20) + "...";
          console.log(goodsInfo.product.name.length)
        }
        this.setData({
          goodsInfo,
          "goodsView.goodsUrlTarget": goodsInfo.product,
          "goodsView.unitPrice": parseFloat(goodsInfo.product.skus[0].salesPrice/100),
          "goodsView.show": true,
          videoHide:true
          })
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
    // wx.removeStorageSync("videoId")
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
  //拍这个
  toShotVideo(){
    wx.navigateTo({
      url: '../../shot/shotVideo/shotVideo',
    })
  },
  //关闭商品链接
  closeBuyUrl: function () {
    // this.setData({
    //   "goodsView.show": false,
    //   videoHide: false
    // })
    wx.navigateBack({
      delta:1
    })
  },
  //触摸开始
  touchStart: function (event) {
    // console.log(event);
    this.data.startX = event.touches[0].pageX;
    this.data.startY = event.touches[0].pageY;
  },
  touchMove: function (event) {
    let moveY = event.touches[0].pageY, startY = this.data.startY;
    if (parseInt(moveY - startY) < 0) {
      // console.log(moveY - startY)
      this.setData({ "goodsView.goodsInfoHeightNow": 220 - (parseInt(moveY - startY)), "goodsView.showGoodsInfo": true })
    } else {
      this.setData({ "goodsView.showGoodsInfo": false })
    }
  },
  //显示商品详情
  showGoodsInfo: function () {
    this.setData({ "goodsView.goodsInfoHeightNow": 1000 })
  },
  //关闭商品详情
  closeGoodsInfo: function () {
    this.setData({ "goodsView.showGoodsInfo": false })
  },
  //跳转到购买页面‘
  toBuyPage: function () {
    wx.setStorageSync("goodsToBuy", this.data.goodsView)
    wx.navigateTo({
      url: '../buypage/buypage',
    })
  }
})