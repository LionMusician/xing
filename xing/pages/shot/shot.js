// pages/shot/shot.js
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
    goodsList: [
      {
        id:1,url: "http://www.mi4c.cn/imgs/sp-tu@2x.png", title: "阿迪达斯滑板拼色潮玩耐用2018新款滑板"
      },
      {
        id: 2,url: "http://www.mi4c.cn/imgs/sp-tu@2x.png", title: "阿迪达斯滑板拼色潮玩耐用2018新款滑板chuang"
      },
      {
        id: 3,url: "http://www.mi4c.cn/imgs/sp-tu@2x.png", title: "阿迪达斯滑板拼色潮玩耐用2018新款滑板asdadsad"
      }
    ],
    colorfulPics:[
      {
        id: 1, url: "http://www.mi4c.cn/imgs/sp-tu@2x.png", color: "红色"
      },
      {
        id: 2, url: "http://www.mi4c.cn/imgs/sp-tu@2x.png", color: "绿色"
      },
      {
        id: 3, url: "http://www.mi4c.cn/imgs/sp-tu@2x.png", color: "蓝色"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({title:"选择商品"});
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
  //显示商品链接
  showBuyUrl:function(event){
    var that = this;
    console.log(event.currentTarget.dataset.goods)
    that.setData({ showBuyUrl: true, goodsUrlTarget: event.currentTarget.dataset.goods})
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
  }
})