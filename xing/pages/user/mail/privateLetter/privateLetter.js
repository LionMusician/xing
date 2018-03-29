// pages/user/mail/privateLetter/privateLetter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatList: [
      {
        time: "上午10：12",
        character: 1,
        wordList: [
          'Hi，小姐姐，你在干嘛呀？',
          '在吗？小姐姐，我好喜欢你们这个商品啊'
        ]
      },
      {
        time: "下午15:44",
        character: 0,
        wordList: [
          '在的呢，可以选择适合你的尺码购买呢'
        ]
      },
      {
        time: "上午10：12",
        character: 1,
        wordList: [
          'Hi，小姐姐，你在干嘛呀？',
          '在吗？小姐姐，我好喜欢你们这个商品啊'
        ]
      },
      {
        time: "下午15:44",
        character: 0,
        wordList: [
          '在的呢，可以选择适合你的尺码购买呢'
        ]
      },
      {
        time: "上午10：12",
        character: 1,
        wordList: [
          'Hi，小姐姐，你在干嘛呀？',
          '在吗？小姐姐，我好喜欢你们这个商品啊在吗？小姐姐，我好喜欢你们这个商品啊在吗？小姐姐，我好喜欢你们这个商品啊在吗？小姐姐，我好喜欢你们这个商品啊在吗？小姐姐，我好喜欢你们这个商品啊在吗？小姐姐，我好喜欢你们这个商品啊在吗？小姐姐，我好喜欢你们这个商品啊在吗？小姐姐，我好喜欢你们这个商品啊在吗？小姐姐，我好喜欢你们这个商品啊在吗？小姐姐，我好喜欢你们这个商品啊'
        ]
      },
      {
        time: "下午15:44",
        character: 0,
        wordList: [
          '在的呢，可以选择适合你的尺码购买呢'
        ]
      },
      {
        time: "上午10：12",
        character: 1,
        wordList: [
          'Hi，小姐姐，你在干嘛呀？',
          '在吗？小姐姐，我好喜欢你们这个商品啊'
        ]
      },
      {
        time: "下午15:44",
        character: 0,
        wordList: [
          '在的呢，可以选择适合你的尺码购买呢'
        ]
      },
      {
        time: "上午10：12",
        character: 1,
        wordList: [
          'Hi，小姐姐，你在干嘛呀？',
          '在吗？小姐姐，我好喜欢你们这个商品啊'
        ]
      },
      {
        time: "下午15:44",
        character: 0,
        wordList: [
          '在的呢，可以选择适合你的尺码购买呢'
        ]
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '喵小姐',
    })
    // this.pageScrollToBottom()
    wx.pageScrollTo({
      scrollTop: 100000,
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
})