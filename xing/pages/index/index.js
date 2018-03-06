//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'), //true&&false
    tabBar:{
      width:'100%',
      height:'98rpx',
      padding:'0',
      indexPic:'../images/tabBar/shouye-w@2x.png',
      addPic:'../images/tabBar/add@2x.png',
      userPic:'../images/tabBar/me-b@2x.png'
    },
    goodsView:{
      show:false,
      goodsUrlTarget:{
        id: 1, url: "http://www.mi4c.cn/imgs/sp-tu@2x.png", title: "阿迪达斯滑板拼色潮玩耐用2018新款滑板"
      },
      colorfulPics: [
        {
          id: 1, url: "http://www.mi4c.cn/imgs/sp-tu@2x.png", color: "红色"
        },
        {
          id: 2, url: "http://www.mi4c.cn/imgs/sp-tu@2x.png", color: "绿色"
        },
        {
          id: 3, url: "http://www.mi4c.cn/imgs/sp-tu@2x.png", color: "蓝色"
        }
      ],
      toShotPageWidth:"330",
      toBuyPageWidth:"420"
    },
    followUrl:"../images/index/zzzzz@2x.png",
    zanSrc:"../images/index/zan-black@2x.png",
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        that.setData({
          swiperHeight:parseInt(res.windowHeight) - 49
        })
      },
    })
  },
  //事件处理函数
  toUser: function () {
    wx.redirectTo({
      url: '../user/user'
    })
  },
  toIndex:function(){

  },
  toShot:function(){
    wx.redirectTo({
      url: '../shot/shot'
    })
  },
  //点击品牌名称出现商品简介
  showGoodsView:function(){
    this.setData({"goodsView.show":true})
  },
  //关闭商品链接
  closeBuyUrl: function () {
    this.setData({ "goodsView.show": false })
  },
  //触摸开始
  touchStart:function(event){
    // console.log(event);
    this.data.startX = event.touches[0].pageX;
    this.data.startY = event.touches[0].pageY;
  },
  touchMove:function(event){
    let moveY = event.touches[0].pageY, startY = this.data.startY;
    if (parseInt(moveY - startY) < 0) {
      // console.log(moveY - startY)
      this.setData({ "goodsView.goodsInfoHeightNow": 220 - (parseInt(moveY - startY)),"goodsView.showGoodsInfo": true })
    }else{
      this.setData({ "goodsView.showGoodsInfo": false})
    }
  },
  //显示商品详情
  showGoodsInfo: function () {
    this.setData({"goodsView.goodsInfoHeightNow":1000})
  },
  //关闭商品详情
  closeGoodsInfo: function () {
    this.setData({ "goodsView.showGoodsInfo": false })
  },
  //跳转到搜索页面
  toSearch:function(){
    wx.navigateTo({
      url: 'search/search',
    })
  },
  //点赞
  follow:function(){
    this.setData({
      followUrl: this.data.followUrl == "../images/index/zzzzz@2x.png" ? "../images/index/red-zan@2x.png" : "../images/index/zzzzz@2x.png"
      })
  },
  //显示分享弹窗
  showShare:function(){
    this.setData({shareViewShow:true})
  },
  //关闭分享弹窗
  closeShareView:function(){
    this.setData({ shareViewShow: false })   
  },
  //显示评论弹窗
  showComment:function(){
    this.setData({commentViewShow:true})
  },
  //关闭评论弹窗
  closeCommentView:function(){
    this.setData({commentViewShow:false})
  },
  //评论点赞
  commentFollow:function(){
    this.setData({
      zanSrc: "../images/index/zan-black@2x.png" || "../images/index/zan@2x.png",
      zanNum:"#e36159" || ""
    })
  }
})
