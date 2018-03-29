// pages/user/mail/privateLetter/privateLetter.js
const app = getApp()
var utils = require("../../../../utils/util.js");
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
    wx.setNavigationBarTitle({
      title: '喵小姐',
    })
    this.setData({mailId:wx.getStorageSync('mailId')})
    // this.pageScrollToBottom()
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
    //获取消息列表
    wx.request({
      url: `${app.globalData.globalUrl}/u/refusers/${this.data.mailId}/messages?token=${wx.getStorageSync('token')}`,
      method: `GET`,
      data: {},
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        var commentsArr = res.data.data;
        for (let i in commentsArr) {
          commentsArr[i].creationTime = utils.formatTime(new Date(commentsArr[i].creationTime))
          if (commentsArr[i].creationTime.slice(0, 10) == utils.formatTime(new Date()).slice(0, 10)) {
            commentsArr[i].creationTime = commentsArr[i].creationTime.replace(commentsArr[i].creationTime.slice(0, 10), '今天')
          }
        }
        this.setData({ commentsArr:commentsArr.reverse()})
        wx.pageScrollTo({ //滑动到底部
          scrollTop: 100000,
        })
      }
    })
  
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
  //监听输入
  listenInput(e){
    this.data.letterInput = e.detail.value;
  },
  //发送
  submitLetter(){
    if(!this.data.letterInput){
      console.log("输入为空")
    }else{
      wx.request({
        url: `${app.globalData.globalUrl}/u/refusers/${this.data.mailId}/messages?token=${wx.getStorageSync('token')}`,
        method: `POST`,
        data: {
          "content":this.data.letterInput
        },
        header: { 'content-type': 'application/json' },
        success: res => {
          console.log(res.data)
          this.setData({ letterInput:''})
          this.onShow()
        }
      })
    }
  }
})