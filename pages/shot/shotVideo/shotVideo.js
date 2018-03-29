// pages/shot/shotVideo/shotVideo.js
const app = getApp();
const qiniuUploader = require("../../../utils/qiniuUploader");
var record = '';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    animationData:{},
    qiniuUploadURL: null,
    qiniuToken: null,
    qiniuDomain: null,
    progressWidth: 0,
    cameraShow: true,
    videoShow: false,
    recordBtn: "recordBtn",
    recordPause: true,
    goodsIconShow:true,//添加商品名称图标
    videoNameToRecord:"添加商品名称"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.onLaunch()
    const selfToken = wx.getStorageSync('token');
    wx.request({
      url: `${app.globalData.globalUrl}/qiniu/uptoken`,
      method: `GET`,
      data: { token: selfToken },
      header: { 'Content-Type': 'application/json' },
      success: ({
          data, data: {
            domainName: qiniuDomain,
          token: qiniuToken,
          upUrlHttps: qiniuUploadURL
            }
          }) => {
        console.log(data)
        this.setData({ qiniuUploadURL, qiniuToken, qiniuDomain });
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (wx.createCameraContext()) {
      this.cameraContext = wx.createCameraContext('myCamera')
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示  
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setStorageSync("direction", "out");//用于black页面判断来源
    this.setData({ "videoNameToRecord": wx.getStorageSync('videoNameToRecord')})
  },
  //长度动画
  addWidth(time) {
    var animation = wx.createAnimation({
      duration: time,
      timingFunction: "linear",
      delay:100
    })
    this.animation = animation;
    animation.width(360).step()
    this.setData({
      animationData: animation.export()
    })
  },

  minusWidth(time) {
    var animation = wx.createAnimation({
      duration: time,
      timingFunction: "linear"
    })
    this.animation = animation;
    animation.width(0).step()
    this.setData({
      animationData: animation.export()
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // wx.removeStorageSync('videoIdToRecord')
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
  //跳转到选择商品页面
  toShot() {
    wx.navigateTo({
      url: '../../shot/shot',
    })
  },
  //按住拍
  startRecord(callback) {
    var that = this;
    if (that.data.progressWidth == 0) {
      that.setData({
        progressWidth: parseInt(that.data.progressWidth) >= 720 ? 0 : parseInt(that.data.progressWidth),
        recordPause: false,
        recordBtn: "recordBtnAfter",
        cameraShow: true,
        videoShow: false
      })
      // const ctx = wx.createCameraContext(this);
      that.cameraContext.startRecord({
        success: (res) => {
          console.log("开始录视频")
        }
      })
      record = setInterval(() => {
        this.setData({
          progressWidth: parseInt(this.data.progressWidth) + 3,
        })
        if (parseInt(this.data.progressWidth) >= 720 || this.data.recordPause) {
          clearInterval(record)
          this.setData({
            recordPause: true,
            recordBtn: "recordBtn",
            cameraShow: false,
            videoShow: true
          })
        }
      }, 125)
    } else {
      this.setData({ progressWidth: 0 });
      callback;
      that.startRecord()
    }
  },
  //停止拍
  endRecord() {
    var that = this;
    console.log(1)
    clearInterval(record)
    that.cameraContext.stopRecord({
      success: (res) => {
        console.log(res)
        that.setData({
          localVideoUrl: res.tempVideoPath,
          localImageUrl: res.tempThumbPath,
          cameraShow: false,
          videoShow: true,
          recordPause: true,
          recordBtn: "recordBtn",
          afterRecord: true
        })
      }, fail: (res) => {
        console.log(res)
      }
    })
    this.setData({
      recordPause: true,
      recordBtn: "recordBtn",
      afterRecord: true
    })
  },
  //显示视频缩略图
  showScreenShot() {
    this.setData({
      screenShotShow: true,
      cameraShow: false,
      videoShow: false
    })
  },
  //选择本地视频
  chooseLocalVideo(){
    wx.chooseVideo({
      success:res=>{
        console.log(res)
        this.setData({
          // localImageUrl: res.thumbTempFilePath,
          localVideoUrl: res.tempFilePath,
          cameraShow: false,
          videoShow: true,
          recordPause: true,
          recordBtn: "recordBtn",
          afterRecord: true
        })
      }
    })
  },


  //初始化七牛参数
  initQiniu() {
    const domain = this.data.qiniuDomain;
    let options = {
      region: 'ECN', // 华东区
      uptoken: this.data.qiniuToken,
      domain,
      shouldUseQiniuFileName: false
    };
    qiniuUploader.init(options);
  },
  //上传到七牛云
  submitVideo(event) {
    wx.showLoading({
      title: '正在上传',
    })
    var that = this, videoStatus = event.currentTarget.dataset.status;
    that.initQiniu();
    //上传图片
    if (that.data.localImageUrl){
      qiniuUploader.upload(that.data.localImageUrl, (res) => {
        console.log(res)
        that.setData({ 'imageObject': res });
      }, (error) => {
        console.error('error: ' + JSON.stringify(error));
      },
        undefined,
        ({ progress }) => {
          console.log(`上传进度：${progress}%`);
          wx.showLoading({
            title: '加载中',
          })
          progress >= 100 && wx.hideLoading();
        });
    }else{
      that.setData({ 'imageObject': "" });
    }
    //上传视频
    qiniuUploader.upload(that.data.localVideoUrl, (res) => {
      that.setData({ 'videoObject': res });
      that.submitUrl(videoStatus)
    }, (error) => {
      console.error('error: ' + JSON.stringify(error));
    },
      undefined,
      ({ progress }) => {
        console.log(`上传进度：${progress}%`);
        wx.showLoading({
          title: '加载中',
        })
        progress >= 100 && wx.hideLoading();
      });
  },
  //url发送到服务器
  submitUrl(videoStatus) {
    wx.showLoading({
      title: '正在上传…',
    })
    var videoObj = {
      // 'id':"5aac7d7460ea5e12531dff07",
      'refId': wx.getStorageSync('videoIdToRecord') ? wx.getStorageSync('videoIdToRecord') : null,
      // "refId": "5aac7d7460ea5e12531dff07",
      'name': new Date().getTime().toString(),
      'videoUrl': this.data.videoObject.videoURL,
      'status': videoStatus,
      'imageUrl': this.data.imageObject ? this.data.imageObject.videoURL : ""
    }
    console.log(videoObj)
    console.log(new Date().getTime().toString())
    wx.request({
      url: `${app.globalData.globalUrl}/p/videos?token=${wx.getStorageSync('token')}`,
      method: `POST`,
      data: videoObj,
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res.data)
        wx.removeStorageSync('videoIdToRecord')
        wx.removeStorageSync('videoNameToRecord')
        wx.hideLoading()
        wx.reLaunch({
          url: '../../index/index',
        })
      }
    })
  },
  //编辑商品名input focus
  listenVideoName(e){
    this.data.videoName = e.detail.value;
  },  
  hideGoodsIcon(){
    this.setData({
      goodsIconShow:false
    })
  },
  showGoodsIcon(){
    if(!this.data.videoName){
      this.setData({
        goodsIconShow: true
      })
    }
  }
})