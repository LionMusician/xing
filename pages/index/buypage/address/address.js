// pages/index/buypage/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '收货地址',
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
  //输入监听
  listenReceiver(e) {
    this.data.addressInfo.receiver = e.detail.value;
  },
  listenTel(e) {
    this.data.addressInfo.tel = e.detail.value;
  },
  listenAddress(e) {
    this.data.addressInfo.address = e.detail.value;
  },
  submit(){
    console.log(this.data.addressInfo)
    var addressInfo = this.data.addressInfo;
    wx.setStorageSync('addressInfo',addressInfo)
    wx.navigateBack({
      delta:1
    })
  }
})