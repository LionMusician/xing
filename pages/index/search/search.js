// pages/index/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchBar:{},
    // tab切换  
    currentTab: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '搜索',
    })
    //查询所有品牌
    wx.request({
      url: `${app.globalData.globalUrl}/u/stores/brands?token=${wx.getStorageSync('token')}&offset=0&limit=5`,
      method: `GET`,
      data: {},
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        this.setData({brandList : res.data.data})
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
    this.setData({ inputOnfocus: true })
    if (this.data.currentTab == e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current
      })
      // this.searchBtn()
    }
  },
  //搜索框点击
  setFocus(){
    this.setData({ inputOnfocus : true})
  },
  //搜索框blur
  clearFocus(){
    this.setData({ inputOnfocus: false})
  },
  //监听输入
  listenSearch(e){
    this.data.searchInput = e.detail.value
  },
  //搜索按钮
  searchBtn(){
    if (this.data.searchInput) {
      this.searchFun(
        this.data.currentTab ? '/u/users' : '/p/products', 
        this.data.currentTab ? `&offset=0&limit=20&nickName=${encodeURIComponent(this.data.searchInput)}` : `&offset=0&limit=20&name=${encodeURIComponent(this.data.searchInput)}`
        )
    }
  },
  //搜索
  searchFun(API, lastUrl){
    console.log(this.data.searchInput)
    wx.request({
      url: `${app.globalData.globalUrl}${API}?token=${wx.getStorageSync('token')}${lastUrl}`,
      method: `GET`,
      data: {},
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        if (!this.data.currentTab){
          this.setData({ goodsList:res.data.data})
        }else{
          this.setData({ userList:res.data.data})
        }
      }
    })
  },
  //跳转到其他用户页面
  toOtherUser(event){
    wx.setStorageSync('otherUserId', event.currentTarget.dataset.userid)
    wx.navigateTo({
      url: '../../user/otherUser/otherUser',
    })
  },
  //跳转到商品专辑
  toBrandPage(event){
    wx.setStorageSync('brandId', event.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../brandPage/brandPage',
    })
  },
  //跳转到商品视频页
  toGoodsVideo(event) {
    wx.setStorageSync("goodsId", event.currentTarget.dataset.goodsid);
    wx.navigateTo({
      url: '../goodsVideo/goodsVideo',
    })
  }
})