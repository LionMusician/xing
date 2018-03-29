// pages/user/myOrder/orderInfo/orderInfo.js
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
    wx.setNavigationBarTitle({
      title: '订单详情',
    })
    var orderId = wx.getStorageSync('orderInfoId'),that = this;
    wx.request({
      url: `${app.globalData.globalUrl}/o/orders/${orderId}?token=${wx.getStorageSync('token')}`,
      method: `GET`,
      data: {

      },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        var orderInfo = res.data;
        orderInfo.items[0].facetJson = orderInfo.items[0].facetJson.replace(/\"/g, ' ').replace('{', '').replace('}', '');

        function timestampToTime(timestamp) {
          var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          let Y = date.getFullYear() + '-';
          let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          let D = date.getDate() > 9 ? (date.getDate() + ' ') : ('0' + date.getDate() + ' ');
          let h = date.getHours() + ':';
          let m = date.getMinutes() + ':';
          let s = date.getSeconds();
          return Y + M + D + h + m + s;
        }
        orderInfo.store.creationTime = timestampToTime(orderInfo.store.creationTime);
        that.setData({orderInfo})

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
  //点击确认收货按钮
  showDeliveryModal:function(){
    this.setData({deliveryModal:true})
  },
  //隐藏确认收货界面
  hideDeliveryModal:function(){
    this.setData({deliveryModal:false})
  },
  //确认收货
  confirmDelivery:function(){
    console.log("确认收货")
  }
})