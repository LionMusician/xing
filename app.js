//app.js
var http = require('utils/https.js')
App({
  globalData: {
    userInfo: null,
    globalUrl: `https://api.zhongmuart.com`
  },
  toRequestData: {
    req: http.requestFun
  }, 
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: `${this.globalData.globalUrl}/u/wxlogin?appId=wxa738fdc55157db47&code=${res.code}`,
          method: `post`,
          data: {},
          header: { 'content-type': 'application/json' },
          success: res => {
            console.log(res.data)
            wx.setStorageSync('userId', res.data.userId);
            wx.setStorageSync('token', res.data.token);
            // 获取用户信息
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo
                console.log(this.globalData.userInfo)
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              },
              fail:res=>{
                console.log("getUserInfo错误")
              }
            })
          },
          fail: res => {
            return;
          }
        })
      }
    })
  },
  request:()=>{
    wx.request({
      url: `${app.globalData.globalUrl}?token=${wx.getStorageSync('token')}`,
      method: `POST`,
      data: {
        
      },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
      }
    })
  },
})