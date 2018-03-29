// pages/user/otherUser/otherUser.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMyVideoBgColor: "#8050EB",
    showMyVideoColor: "#fff",
    showMyloveBgColor: "",
    showMyloveColor: "",
    videoListShow: true,
    loveListShow: false,
    playVideoUrl:false
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: 'Ta的主页',
    })
    wx.request({
      url: `${app.globalData.globalUrl}/u/users/${wx.getStorageSync('otherUserId')}?token=${wx.getStorageSync('token')}`,
      method: `GET`,
      data: {

      },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        this.setData({ userInfo: res.data })
        this.getMyVideo(res.data.id)
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
  //关注
  attention(){
    console.log(1)
    wx.request({
      url: `${app.globalData.globalUrl}/u/followers/${this.data.userInfo.id}?token=${wx.getStorageSync('token')}`,
      method: `POST`,
      data: {

      },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        this.onLoad()
      }
    })
  },
  //切换我的视频和喜欢
  showMyVideo() {
    this.setData({
      showMyVideoBgColor: "#8050EB",
      showMyVideoColor: "#fff",
      showMyloveBgColor: "",
      showMyloveColor: "",
      videoListShow: true,
      loveListShow: false
    })
  },
  showMylove() {
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
  getMyVideo(userId) {
    wx.request({
      url: `${app.globalData.globalUrl}/p/videos?token=${wx.getStorageSync('token')}&userId=${userId}`,
      method: `GET`,
      data: {
      },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        this.setData({ videoList: res.data.data })
      }
    })
  },
  //显示视频
  showVideo(event){
    this.setData({playVideoUrl:event.currentTarget.dataset.videourl})
  },
  //隐藏视频
  hideVideo(){
    this.setData({ playVideoUrl: false })    
  },
  //私信
  toMail(event){
    wx.setStorageSync("mailId", event.currentTarget.dataset.mailid)
    wx.navigateTo({
      url: '../mail/privateLetter/privateLetter',
    })
  }
})