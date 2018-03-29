// pages/user/userlist/userlist.js
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
    var that = this;
    var userListTitle = wx.getStorageSync('userListTitle'),listAPI = wx.getStorageSync('userListApi');
    wx.setNavigationBarTitle({
      title: userListTitle == '赞' ? '赞我的人' : `我的${userListTitle}`,
    })
    wx.request({
      url: `${app.globalData.globalUrl}${listAPI}?token=${wx.getStorageSync('token')}`,
      method: `GET`,
      data: {

      },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        that.setData({
          userListCount:res.data.count,
          userList:res.data.data,
          userListTitle
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
  //跳转到用户信息页
  toOtherUser:function(event){
    wx.setStorageSync('otherUserId', event.currentTarget.dataset.userid)
    wx.navigateTo({
      url: '../otherUser/otherUser',
    })
  }
})