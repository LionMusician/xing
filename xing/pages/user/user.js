// pages/user/user.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabBar: {
      width: '100%',
      height: '98rpx',
      padding: '0',
      indexPic: '../images/tabBar/shouye@2x.png',
      addPic: '../images/tabBar/add@2x.png',
      userPic: '../images/tabBar/me@2x.png'
    },
    showMyVideoBgColor:"#8050EB",
    showMyVideoColor:"#fff",
    showMyloveBgColor:"",
    showMyloveColor:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({title:"个人主页"});
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      that.getUsers()
    } else if (that.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        that.getUsers()
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.login({
        success: res => {
          if (res.code) {
            console.log(res.code)
            wx.request({
              url: `${app.globalData.globalUrl}/u/wxlogin?appId=wxff9b12c8a5c45f6e&code=${res.code}`,
              method: `post`,
              data: {

              },
              header: { 'content-type': 'application/json' },
              success: res => {
                console.log(res)
                wx.setStorageSync('userId', res.data.userId);
                wx.setStorageSync('token', res.data.token);
                wx.getUserInfo({
                  success: res => {
                    console.log(res.userInfo)
                    var userInfo = res.userInfo;
                    app.globalData.userInfo = res.userInfo
                    that.setData({
                      userInfo,
                      hasUserInfo: true
                    })
                    wx.request({
                      url: `${app.globalData.globalUrl}/u/users/${wx.getStorageSync('userId')}?token=${wx.getStorageSync('token')}`,
                      method: `put`,
                      data: {
                        "avatarUrl": userInfo.avatarUrl,
                        "chatAuth": "ALL",
                        "country": userInfo.language,
                        "gender": userInfo.gender,
                        "id": wx.getStorageSync('userId'),
                        "nickName": userInfo.nickName,
                      },
                      header: { 'content-type': 'application/json' },
                      success: res => {
                        console.log(res)
                      }
                    })
                  }
                })
              }
            })
          }
        }
      })
    }
  },
  //获取已授权用户的个人信息
  getUsers:function(){
    var that = this;
    wx.request({
      url: `${app.globalData.globalUrl}/u/users/${wx.getStorageSync('userId')}?token=${wx.getStorageSync('token')}`,
      method: `get`,
      data: {
        
      },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        that.setData({userInfoGet:res.data})
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

  //跳转页面
  toUser: function () {
    
  },
  toIndex: function () {
    wx.redirectTo({
      url: '../index/index'
    })
  },
  toShot: function () {
    wx.redirectTo({
      url: '../shot/shot'
    })
  },
  toSet: function () {
    wx.navigateTo({
      url: 'set/set'
    })
  },
  toMail: function () {
    wx.navigateTo({
      url: 'mail/mail'
    })
  },
  toMyEarn: function () {
    wx.navigateTo({
      url: 'myEarn/myEarn'
    })
  },
  toMyOrder: function () {
    wx.navigateTo({
      url: 'myOrder/myOrder'
    })
  },
  //切换我的视频和喜欢
  showMyVideo:function(){
    this.setData({
      showMyVideoBgColor: "#8050EB",
      showMyVideoColor: "#fff",
      showMyloveBgColor: "",
      showMyloveColor: ""
    })
  },
  showMylove:function(){
    this.setData({
      showMyVideoBgColor: "",
      showMyVideoColor: "",
      showMyloveBgColor: "#8050EB",
      showMyloveColor: "#fff"
    })
  }
})