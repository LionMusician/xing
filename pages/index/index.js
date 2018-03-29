//index.js
//获取应用实例
const app = getApp();
var utils = require("../../utils/util.js");

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
      toShotPageWidth:"330",
      toBuyPageWidth:"420"
    },
    followUrl:"../images/index/zzzzz@2x.png",
    zanSrc:"../images/index/zan-black@2x.png",
    brotherIndex:-1,
    videoIndex:0,
    videoPause:"none",
    animationData:{}
  },
  onLoad: function () {
    var that = this;
    // app.onLaunch()
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        that.setData({
          swiperHeight:parseInt(res.windowHeight) - 49
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('indexVideo')
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.setStorageSync("whichToShot", "index");//用于black页面判断返回方向
    wx.setStorageSync("direction", "in");//用于black页面判断来源
    this.getVideos(this.data.videoIndex)
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var video = this.videoContext;
    video.pause();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.onShow()
  },
  //转发设置
  onShareAppMessage: function (res) {
    return {
      title: '自定义转发标题',
      path: '/pages/index/index'
    }
  },
  getVideos(offset){
    var that = this;
    wx.request({
      url: `${app.globalData.globalUrl}/p/videos?token=${wx.getStorageSync('token')}&offset=${offset}&limit=1`,
      method: `GET`,
      data: {},
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        var goodsItem = res.data.data[0];
        if (goodsItem.product && goodsItem.product.name.length > 20){
          goodsItem.product.name = goodsItem.product.name.slice(0,20)+"...";
          console.log(goodsItem.product.name.length)
        }
        that.setData({
          videoCount: res.data.count,
          videoList: res.data.data,
          goodsItem,
          brotherArr: res.data.data[0].brothers
        })
      },
      fail: res => {
        console.log(res)
      },
      complete:res=>{
        console.log(res.statusCode)
        if (res.statusCode == 401){
          that.getVideos(0)
        }
      }
    })
  },
  //透明度消失动画
  btnHide(){
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    this.animation = animation
    animation.opacity(0).step()
    this.setData({
      animationData: animation.export()
    })
    setTimeout(() => {
      this.setData({ videoPause: "none" })
    }, 300)
  },
  //显示控制按钮
  btnShow() {
    this.setData({ videoPause: "block" })
  },
  //点击视频显示控制按钮,1.5s后消失
  videoPause(){
    var video = this.videoContext;
    video.pause();
    this.setData({ videoPause:"block"})
    setTimeout(()=>{
      this.btnHide()
      console.log("按钮消失")
    },1500)
  },
  //视频播放
  playVideo(){
    var video = this.videoContext;
    video.play();
    this.btnHide()//按钮消失
  },
  //切换到同商品的下一个视频
  brotherNext(){
    if (parseInt(this.data.brotherIndex) < (this.data.brotherArr.length - 1)) {
      this.setData({
        brotherIndex: parseInt(this.data.brotherIndex) + 1,
        // goodsItem: this.data.brotherArr[parseInt(this.data.brotherIndex) + 1],
        // videoPause: "none"
      })
      this.getVideoById(this.data.brotherArr[parseInt(this.data.brotherIndex)].id)//重新获取视频
      this.btnHide()//按钮消失
    }
  },
  //切换到同商品的上一个视频,如果已经到了brother数组的第一个，则切换为最初的视频
  brotherLast(){
    if (parseInt(this.data.brotherIndex) > 0){
      this.setData({
        brotherIndex: parseInt(this.data.brotherIndex) - 1,
        // goodsItem: this.data.brotherArr[parseInt(this.data.brotherIndex) - 1]
      })
      this.getVideoById(this.data.brotherArr[parseInt(this.data.brotherIndex)].id)//重新获取视频
    } else {
      this.setData({
        brotherIndex: - 1,
        goodsItem: this.data.videoList[0]
      })
    }
    this.btnHide()//按钮消失
  },
  //切换到下一个商品的第一个视频
  nextVideo(){
    if (this.data.videoIndex < this.data.videoCount-1){
      this.getVideos(parseInt(this.data.videoIndex)+1);
      this.setData({
        videoIndex: parseInt(this.data.videoIndex) + 1,
        brotherIndex: -1
        })
    }
    this.btnHide()//按钮消失
  },
  //切换到上一个商品的第一个视频
  lastVideo() {
    if (this.data.videoIndex > 0) {
      this.getVideos(parseInt(this.data.videoIndex) - 1);
      this.setData({ 
        videoIndex: parseInt(this.data.videoIndex) - 1,
        brotherIndex: -1
        })
    }
    this.btnHide()//按钮消失
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
    wx.navigateTo({
      url: '../shot/shotVideo/shotVideo'
    })
  },
  toOtherUser(event){
    wx.setStorageSync('otherUserId', event.currentTarget.dataset.userid)
    wx.navigateTo({
      url: '../user/otherUser/otherUser',
    })
  },
  //点击品牌名称出现商品简介
  showGoodsView:function(event){
    var goodsList = this.data.goodsList;
    console.log(event.currentTarget.dataset.id)
    if (this.data.goodsItem.product) {
      wx.setStorageSync('videoId', event.currentTarget.dataset.id);
      wx.navigateTo({
        url: 'goodsInfo/goodsInfo',
      })
    }
  },
  //跳转到搜索页面
  toSearch:function(){
    wx.navigateTo({
      url: 'search/search',
    })
  },
  //次数统计
  resourceAction(){

  },
  //点赞
  follow:function(event){
    console.log(event)
      var config = {
        actionCode:"PRAISE",
        addNum:event.currentTarget.dataset.ispraise ? -1 : 1,
        category:"VIDEO"
      }
      console.log(config)
    wx.request({
      url: `${app.globalData.globalUrl}/r/${event.currentTarget.dataset.videoid}/action?token=${wx.getStorageSync('token')}`,
      method: `POST`,
      data: {
        actionCode: "PRAISE",
        addNum: event.currentTarget.dataset.ispraise ? -1 : 1,
        category: "VIDEO",
        userId: event.currentTarget.dataset.videouserid
      },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res)
        // this.onLoad()
        this.getVideoById(event.currentTarget.dataset.videoid)
      }
    })
  },
  //用视频id获取视频信息，用来点赞和评论后的页面刷新
  getVideoById(videoId){
    wx.request({
      url: `${app.globalData.globalUrl}/p/videos/${videoId}?token=${wx.getStorageSync('token')}`,
      method: `GET`,
      data: {},
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        this.setData({
          goodsItem:res.data
          // "goodsItem.isPraise": res.data.isPraise,
          // "goodsItem.praiseCount": res.data.praiseCount,
          // "goodsItem.commentCount": res.data.commentCount,
          // "goodsItem.forwardCount": res.data.forwardCount
        })
      }
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
  showComment:function(event){
    var toUserId = event.currentTarget.dataset.userid, videoId = event.currentTarget.dataset.videoid;
    if (event.currentTarget) { this.setData({ toUserId, videoId })}
    this.queryComments(videoId,0)
  },
  //查询评论
  queryComments(videoId, offset) {
    wx.request({
      url: `${app.globalData.globalUrl}/r/${videoId}/comments?token=${wx.getStorageSync('token')}&typeCode=VIDEO&limit=20&offset=${offset}`,//每次查询20条
      method: `GET`,
      data: {

      },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        var commentsArr = res.data.data;
        for (let i in commentsArr){
          commentsArr[i].creationTime = utils.formatTime(new Date(commentsArr[i].creationTime))
          if (commentsArr[i].creationTime.slice(0, 10) == utils.formatTime(new Date()).slice(0,10)){
            commentsArr[i].creationTime = commentsArr[i].creationTime.replace(commentsArr[i].creationTime.slice(0, 10),'今天')
          }
        }
        this.setData({
          commentsCount: res.data.count,
          commentsArr,
          commentViewShow: true,
          videoHide: true
        })
      }
    })

  },
  //监听评论输入
  listenCommentsInput(e){
    this.data.commentWord = e.detail.value;
  },
  //发送评论
  submitComments(){
    var toUserId = this.data.toUserId, videoId = this.data.videoId, commentWord = this.data.commentWord;
    console.log(videoId + commentWord)
    if (!commentWord){
      return;
    }
    wx.request({
      url: `${app.globalData.globalUrl}/r/${videoId}/comments?token=${wx.getStorageSync('token')}`,
      method: `POST`,
      data: {
        "comment": commentWord,
        "resourceId": videoId,
        "typeCode":"VIDEO"
      },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        // 增加评论数
        wx.request({
          url: `${app.globalData.globalUrl}/r/${videoId}/action?token=${wx.getStorageSync('token')}`,
          method: `POST`,
            data: {
              actionCode: "COMMENT",
              addNum: 1,
              category: "VIDEO"
        },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res)
        this.queryComments(videoId, 0)
        this.getVideoById(videoId)
      }
    })
      }
    })
  },
  //关闭评论弹窗
  closeCommentView:function(){
    this.setData({
      commentViewShow: false,
      videoHide: false
      })
  },
  //评论点赞
  commentFollow:function(event){
    wx.request({
      url: `${app.globalData.globalUrl}/r/${event.currentTarget.dataset.id}/action?token=${wx.getStorageSync('token')}`,
      method: `POST`,
      data: {
        actionCode:"PRAISE",
        addNum:event.currentTarget.dataset.status ? -1 : 1,
        category:"COMMENT"
      },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        this.queryComments(this.data.videoId, 0)
      }
    })
  },
})
