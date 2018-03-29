// pages/user/mail/mail.js
const app = getApp()
var utils = require("../../../utils/util.js");
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
    wx.setNavigationBarTitle({
      title: '我的私信',
    })
    wx.request({
      url: `${app.globalData.globalUrl}/u/refusers/ALL/messages?token=${wx.getStorageSync('token')}`,
      method: `GET`,
      data: {

      },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        var mailList = res.data.data;

        for (let i in mailList) {
          mailList[i].creationTime = utils.formatTime(new Date(mailList[i].creationTime))
          if (mailList[i].creationTime.slice(0, 10) == utils.formatTime(new Date()).slice(0, 10)) {
            mailList[i].creationTime = mailList[i].creationTime.replace(mailList[i].creationTime.slice(0, 10), '今天')
          }
        }
        that.setData({ mailList})
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
  //跳转到私信界面
  toPrivateLetter:function(event){
    wx.setStorageSync("mailId", event.currentTarget.dataset.id)
    wx.navigateTo({
      url: 'privateLetter/privateLetter',
    })
  }
})