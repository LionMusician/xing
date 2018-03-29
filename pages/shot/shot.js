// pages/shot/shot.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabBar: {
      width: '100%',
      height: '98rpx',
      padding: '0',
      indexPic: '../images/tabBar/shouye@2x.png',
      addPic: '../images/tabBar/add@2x.png',
      userPic: '../images/tabBar/me-b@2x.png'
    },
    showBuyUrl:false,
    showGoodsInfo: false,
    goodsList: [],
    colorfulPics:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({title:"选择商品"});
    wx.request({
      url: `${app.globalData.globalUrl}/p/products?token=${wx.getStorageSync('token')}`,
      method: `GET`,
      data: {

      },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        this.setData({
          goodsList:res.data.data
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

  //事件处理函数
  toUser: function () {
    wx.redirectTo({
      url: '../user/user'
    })
  },
  toIndex: function () {
    wx.redirectTo({
      url: '../index/index'
    })
  },
  toShot: function () {
    
  },
  //进入拍视频页面
  toShotVideo:function(){
    wx.navigateBack({
      delta:1
    })
  },
  //显示商品链接
  showBuyUrl:function(event){
    var that = this;
    console.log(event.currentTarget.dataset.goods)
    that.setData({ showBuyUrl: true, goodsUrlTarget: event.currentTarget.dataset.goods})
    wx.setStorageSync('videoIdToRecord', that.data.goodsUrlTarget.id)
    wx.setStorageSync('videoNameToRecord', that.data.goodsUrlTarget.name)
  },
  //关闭商品链接
  closeBuyUrl:function(){
    this.setData({ showBuyUrl: false})
  },
  //显示商品详情
  showGoodsInfo:function(){
    this.setData({ showGoodsInfo:true})
  },
  closeGoodsInfo:function(){
    this.setData({ showGoodsInfo: false })
  },
  //监听输入
  listenSearch(e) {
    this.data.searchInput = e.detail.value
  },
  //搜索按钮
  searchBtn() {
    wx.request({
      url: `${app.globalData.globalUrl}/p/products?token=${wx.getStorageSync('token')}&offset=0&limit=20&name=${encodeURIComponent(this.data.searchInput)}`,
      method: `GET`,
      data: {},
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        this.setData({ goodsList: res.data.data })
      },
      complete: res => {
        console.log(res)
      }
    })
  },
})