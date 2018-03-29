// pages/index/buypage/buypage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNum:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '购买商品',
    })
    var goodsToBuy = wx.getStorageSync('goodsToBuy');
    console.log(goodsToBuy)
    this.setData({ 
      goodsToBuy: goodsToBuy.goodsUrlTarget,
      videoId: wx.getStorageSync('videoId') 
      // videoId: goodsToBuy.goodsUrlTarget.id //待修改
      })
    this.setData({ 
      priceNow: parseFloat(goodsToBuy.goodsUrlTarget.skus[0].salesPrice/100),
      format: goodsToBuy.goodsUrlTarget.properties
      })
    this.getOrderPrice();//计算总价
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var properties = this.data.goodsToBuy.properties, formatArr = [];
    for (let i in properties) {
      formatArr.push({ name: properties[i].name })
    }
    this.setData({formatArr})
    console.log(this.data.formatArr)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.setData({
    //   addressInfo: wx.getStorageSync('addressInfo')
    //   })
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
  //跳转到收货地址页面
  toAddress(){
    // wx.navigateTo({
    //   url: 'address/address',
    // })
    wx.chooseAddress({
      success:res=>{
        console.log(res)
        this.setData({addressInfo:res})
      }
    })
  },
  //计算商品总价
  getOrderPrice(){
    this.setData({ orderPrice: Math.round(parseFloat(this.data.priceNow) * parseFloat(this.data.orderNum) * 100) / 100});//四舍五入
  },
  //选择商品规格
  changeFormat(event){
    console.log(event.currentTarget.dataset)
    var formatSelect = event.currentTarget.dataset, properties = this.data.format,formatArr = this.data.formatArr;
    this.setData({ formatSelect})
    for (let j in formatArr){
      if (formatSelect.name == formatArr[j].name){
        formatArr[j].value = formatSelect.value
      }
    }
    console.log(formatArr)
    var formatSelected = [], skus = this.data.goodsToBuy.skus;
    for(let i in formatArr){
      formatSelected.push(formatArr[i].value)
    }
    console.log(formatSelected)
    this.setData({ formatSelected})
    for (let k in skus){
      //检测不同规格产品的单价
      if (formatSelected.sort().toString() == skus[k].facets.sort().toString()){
        this.setData({
          skusId:skus[k].id,
          priceNow: parseFloat(skus[k].salesPrice)/100
          })
        console.log(skus[k].id)
        this.getOrderPrice();//计算总价
      }
    }
    
  },
  //加减商品数量
  addNum(){
    this.setData({ orderNum: parseInt(this.data.orderNum) + 1 });
    this.getOrderPrice();//计算总价
  },
  minusNum() {
    this.setData({ orderNum: this.data.orderNum > 1 ? parseInt(this.data.orderNum) - 1 : 1 });
    this.getOrderPrice();//计算总价
  },
  //提交订单
  submitOrder(){
    var formatArr = this.data.formatArr,that = this;
    if (!that.data.addressInfo){
      that.setData({
        waringWord:'请填写收货地址',
        warningShow:true
      })
      setTimeout(()=>{
        that.setData({
          warningShow: false
        })
      },1000)
      return;
    } else{
      for(let i in formatArr){
        if (!formatArr[i].value) {
          that.setData({
            waringWord: '请选择购买商品规格',
            warningShow: true
          })
          setTimeout(() => {
            that.setData({
              warningShow: false
            })
          }, 1000)
          return;
        }
      }
    }
    var addressInfo = that.data.addressInfo;
    var order = {
      "status": "NEW",
      "videoId": that.data.videoId,
      "items":[{
        "skuId": that.data.skusId,
        "quantity": that.data.orderNum,
        "productId": that.data.goodsToBuy.id,
        // "title": that.data.goodsToBuy.name,
        // "unitPrice": that.data.priceNow,
        // "totalPrice": that.data.orderPrice
      }],
      "shipTO":{
        "city": addressInfo.cityName,
        "detail": addressInfo.detailInfo,
        "district": addressInfo.countyName,
        "linkman": addressInfo.userName,
        "phone": addressInfo.telNumber,
        "provice": addressInfo.provinceName
      }
    }
    console.log(order)
    wx.request({
      url: `${app.globalData.globalUrl}/o/orders?token=${wx.getStorageSync('token')}`,
      method: `POST`,
      data: order,
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        var orderId = res.data.data;
        that.getWechatPay(orderId)
      }
    })
  },
  //调微信支付接口
  getWechatPay(orderId){
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
            success:res=>{
              // console.log(res.data)
              wx.redirectTo({
                url: '../../user/myOrder/myOrder',
              })
            },
            fail:res=>{
              console.log('支付失败')
              wx.redirectTo({
                url: '../../user/myOrder/myOrder',
              })
            }
          })
      }
    })
  }
})