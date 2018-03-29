// pages/shot/shotVideo/shotVideo.js
var app=getApp()
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
  //上传视频到七牛云
  submitVideo:function(){
    const qiniuUploader = require("../../../utils/qiniuUploader.js");
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    console.log(wx.getStorageSync('token'))
    wx.request({
      url: `${app.globalData.globalUrl}/qiniu/uptoken?token=${wx.getStorageSync('token')}`,
      method: `get`,
      data: {},
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        var qiniuAPI = res.data;
        that.setData({qiniuAPI})
        wx.chooseVideo({
          compressed:true,
          maxDuration:1,
          success:res=>{
            wx.hideLoading()
            console.log(res)
            console.log(`${that.data.qiniuAPI.upUrl}/${that.data.qiniuAPI.token}`)
            var filePath = res.tempFilePath[0];
            var imgName = filePath.substr(30, 50);
            qiniuUploader.upload(filePath, (res) => {
              console.log(res)
            }, (error) => {
              console.log('error: ' + error);
            }, {
                region: 'ECN',
                domain: 'bzkdlkaf.bkt.clouddn.com', // // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
                key: 'customFileName.jpg', // [非必须]自定义文件 key。如果不设置，默认为使用微信小程序 API 的临时文件名
                // 以下方法三选一即可，优先级为：uptoken > uptokenURL > uptokenFunc
                uptokenURL: `${that.data.qiniuAPI.upUrl}/${that.data.qiniuAPI.token}`, // 从指定 url 通过 HTTP GET 获取 uptoken，返回的格式必须是 json 且包含 uptoken 字段，例如： {"uptoken": "[yourTokenString]"}
                uploadURL: `${that.data.qiniuAPI.upUrlHttps}`
              });
          },
          fail:res=>{
            console.log(res)
            wx.hideLoading()
          }
        })
      }
    })
  }
})