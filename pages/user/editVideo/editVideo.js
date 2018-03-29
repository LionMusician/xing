// pages/user/editVideo/editVideo.js
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
    var editVideoId = wx.getStorageSync("editVideoId");
    this.setData({editVideoId})
    wx.request({
      url: `${app.globalData.globalUrl}/p/videos/${editVideoId}?token=${wx.getStorageSync('token')}`,
      method: `GET`,
      data: {},
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        this.setData({goodsItem:res.data})
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
  //显示编辑菜单
  showEditTable(){
    this.setData({
      editTableShow:true
    })
  },
  //隐藏编辑菜单
  hideEditTable(){
    this.setData({editTableShow:false})
  },
  //删除视频
  deleteVideo(){
    wx.request({
      url: `${app.globalData.globalUrl}/p/videos/${this.data.videoId}?token=${wx.getStorageSync('token')}`,
      method: `DELETE`,
      data: {},
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        wx.switchTab({
          url: '../../user/user',
        })
      }
    })
  },
  //保存视频到本地
  saveVideo(){
    wx.downloadFile({
      url: this.data.goodsItem.videoUrl,
      success:res=>{
        var tempFilePath = res.tempFilePath;
        wx.saveFile({
          tempFilePath: tempFilePath,
        })
      }
    })
  }
})