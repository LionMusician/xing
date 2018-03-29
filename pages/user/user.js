// pages/user/user.js
//获取应用实例
const app = getApp()
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
      userPic: '../images/tabBar/me@2x.png'
    },
    showMyVideoBgColor:"#8050EB",
    showMyVideoColor:"#fff",
    showMyloveBgColor:"",
    showMyloveColor:"",
    videoListShow:true,
    loveListShow:false,
    playVideoUrl:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    wx.setNavigationBarTitle({ title: "个人主页" });
    var userInfo = app.globalData.userInfo;
    // console.log(app.globalData.userInfo)
    that.setData({ userInfo })
    that.getUsers();
  },
  //设置未授权用户的个人信息
  putUser() {
    app.onLaunch()
    var userInfo = app.globalData.userInfo,that = this;
    wx.request({
      url: `${app.globalData.globalUrl}/u/users/${wx.getStorageSync('userId')}?token=${wx.getStorageSync('token')}`,
      method: `PUT`,
      data: {
        "avatarUrl": userInfo.avatarUrl,
        "chatAuth": "ALL",
        "country": userInfo.language,
        "gender": userInfo.gender,
        "id": wx.getStorageSync('userId'),
        "nickName": userInfo.nickName,
      },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res)
        var userInfo = app.globalData.userInfo;
        that.setData({ userInfo })
      }
    })
  },
  //获取已授权用户的个人信息
  getUsers(){
    var that = this;
    wx.request({
      url: `${app.globalData.globalUrl}/u/users/${wx.getStorageSync('userId')}?token=${wx.getStorageSync('token')}`,
      method: `GET`,
      data: {
        
      },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        if (!res.data.nickName) {
          that.putUser()
          return;
        }
        that.setData({ userInfo: res.data })
        that.getMyVideo(res.data.id)
      },
      fail:res=>{
        that.putUser()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.setStorageSync("whichToShot", "user");//用于black页面判断返回方向
    wx.setStorageSync("direction", "in");//用于black页面判断来源
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
  
  },

  //跳转页面
  toUser() {
    
  },
  toIndex() {
    wx.redirectTo({
      url: '../index/index'
    })
  },
  toShot() {
    wx.redirectTo({
      url: '../shot/shotVideo/shotVideo'
    })
  },
  toSet() {
    wx.navigateTo({
      url: 'set/set'
    })
  },
  toMail() {
    wx.navigateTo({
      url: 'mail/mail'
    })
  },
  toMyEarn(event) {
    wx.setStorageSync('activityData', event.currentTarget.dataset.activity)
    wx.navigateTo({
      url: 'myEarn/myEarn'
    })
  },
  toMyOrder() {
    wx.navigateTo({
      url: 'myOrder/myOrder'
    })
  },
  toUserList(event){
    console.log(event.currentTarget.dataset.name)
    wx.setStorageSync('userListTitle',event.currentTarget.dataset.name);
    wx.setStorageSync('userListApi', event.currentTarget.dataset.api)
    wx.navigateTo({
      url: 'userlist/userlist',
    })
  },
  //切换我的视频和喜欢
  showMyVideo(){
    this.setData({
      showMyVideoBgColor: "#8050EB",
      showMyVideoColor: "#fff",
      showMyloveBgColor: "",
      showMyloveColor: "",
      videoListShow: true,
      loveListShow: false
    })
  },
  showMylove(){
    this.setData({
      showMyVideoBgColor: "",
      showMyVideoColor: "",
      showMyloveBgColor: "#8050EB",
      showMyloveColor: "#fff",
      videoListShow: false,
      loveListShow: true
    })
  },
  //获取我的视频
  getMyVideo(userId){
    wx.request({
      url: `${app.globalData.globalUrl}/p/videos?token=${wx.getStorageSync('token')}&userId=${userId}`,
      method: `GET`,
      data: {
      },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        this.setData({videoList:res.data.data})
      }
    })
  },
  //跳转到视频编辑页面
  toEditVideo(event){
    wx.setStorageSync("editVideoId", event.currentTarget.dataset.videoid)
    wx.navigateTo({
      url: 'editVideo/editVideo',
    })
  }
})