// pages/user/myOrder/myOrder.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "我的订单" })
    var that = this;
    //获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    })
    wx.request({
      url: `${app.globalData.globalUrl}/o/orders?token=${wx.getStorageSync('token')}`,
      method: `GET`,
      data: {

      },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        var orderList = res.data.data;
        for (let i in orderList){
          orderList[i].items[0].facetJson = orderList[i].items[0].facetJson.replace(/\"/g, ' ').replace('{', '').replace('}', '')
          if (orderList[i].items[0].title.length>20){
            orderList[i].items[0].title = orderList[i].items[0].title.slice(0,20)+"..."
          }
        }
        that.setData({orderList})
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
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    // console.log(e)
    if (this.data.currentTab == e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current
      })
    }
  },
  //跳转到订单详情页
  toOrderInfo(event){
    wx.setStorageSync('orderInfoId',event.currentTarget.dataset.id)
    wx.navigateTo({
      url: 'orderInfo/orderInfo',
    })
  },
  //跳转到物流页面
  toLogistics(){
    wx.navigateTo({
      url: 'logistics/logistics',
    })
  },
  //点击确认收货按钮
  showDeliveryModal() {
    this.setData({ deliveryModal: true })
  },
  //隐藏确认收货界面
  hideDeliveryModal() {
    this.setData({ deliveryModal: false })
  },
  //确认收货
  confirmDelivery() {
    console.log("确认收货")
  },
  //取消订单
  cancelOrder(event){
    console.log(event.currentTarget.dataset.id)
    var orderId = event.currentTarget.dataset.id,that = this;
    wx.request({
      url: `${app.globalData.globalUrl}/o/orders/${orderId}?token=${wx.getStorageSync('token')}`,
      method: `PUT`,
      data: {
        status:"CANCALLED"
      },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        that.onLoad()
      }
    })
  },
  //支付按钮
  toPay(event){
    var orderId = event.currentTarget.dataset.id;
    this.getWechatPay(orderId);
  },

  //调微信支付接口
  getWechatPay(orderId) {
    var that = this;
    wx.request({
      url: `${app.globalData.globalUrl}/o/orders/${orderId}/wechatpay?token=${wx.getStorageSync('token')}`,
      method: `GET`,
      data: {

      },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        var payInfo = res.data;
        wx.requestPayment(
          {
            'timeStamp': payInfo.timeStamp.toString(),
            'nonceStr': payInfo.nonceStr,
            'package': payInfo.package,
            'signType': payInfo.signType,
            'paySign': payInfo.paySign,
            success: res => {
              // console.log(res.data)
              wx.showToast({
                title: '支付成功',
                duration:1000
              })
              setTimeout:(()=>{
                that.onLoad()
              },1000)
              
            },
            fail: res => {
              console.log('支付失败')
              that.onLoad()
            }
          })
      }
    })
  }
})