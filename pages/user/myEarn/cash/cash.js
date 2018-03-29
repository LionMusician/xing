// pages/user/myEarn/cash/cash.js
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
      title: '我要提现',
    })
    this.setData({earn:wx.getStorageSync('earnLast')})
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
  //监听输入
  listenInput(e){
    this.data.cashInput = e.detail.value;
  },
  //确认提现
  submitCash(){
    if (!this.data.cashInput || this.data.cashInput > this.data.earn || this.data.cashInput > 1000){
      this.setData({ cashError:true})
      setTimeout(()=>{
        this.setData({ cashError:false})
      },1000)
    }
  }
})