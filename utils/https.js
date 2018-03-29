
var apps = getApp()
var appIds = ""

var rootHttpUrl = 'https://api.zhongmuart.com';

function requestFun(url, data, me, totype, cb, cb1) {

  var headtype = totype ? 'application/json' : 'application/x-www-form-urlencoded'
  wx.getNetworkType({
    success: function (res) {
      // 返回网络类型, 有效值：
      // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
      var networkType = res.networkType
      if (networkType == 'none') {
        showModel('请检查网络后重试！')
        cb('hidden')
      } else {
        initFunction(function (res) {
          if (res) {
            var token = wx.getStorageSync('token')
            if (url.indexOf('?') >= 0) {/**判断path参数，修改token的拼接方式 */
              url = url + '&token=' + token
            } else {
              url = url + '?token=' + token
            }
            console.log(url + ">>>")
            console.log(data)
            wx.request({
              url: rootHttpUrl + url,
              data: data,
              method: me,
              header: { "content-type": headtype },
              success: function (res) {
                cb(res.data)
                if (wx.getStorageSync('isAuth') == 'true') {

                } else {
                  checkAuth(token)
                }
              },
              fail: function () {

              },
              complete: function (res) {
                // return typeof cb == "function" && cb(res.data)
                console.log(res.statusCode + "/////")
                if (res.statusCode == 500 || res.statusCode == 501 || res.statusCode == 502) {
                  showModel('服务开小差了，请稍后重试！')
                  cb1('hidden')
                } else if (res.statusCode == 400 || res.statusCode == 402 || res.statusCode == 403) {
                  cb1(res)
                } else if (res.statusCode == 401) {
                  cb1('fresh')
                } else if (res.statusCode == 200) {
                  cb1(res)
                } else {
                  showModel('请求失败，请检查网络状态')
                  cb1('hidden')
                }
              }
            })
          }
        })

      }
    }
  })
}

function initFunction(cb) {
  wx.getExtConfig({
    success: function (res) {
      console.log(res)
      console.log('------------' + res.extConfig.appid)
      appIds = res.extConfig.appid
      wx.setStorageSync('appId', res.extConfig.appid)
      var token = wx.getStorageSync('token')
      console.log('token：' + token)
      // debugger
      if (token == null || token == "") {
        console.log('appids:' + appIds)
        if (appIds == "" || appIds == null) {
          showModel('未获取到相关数据，请尝试下拉页面操作')
          return
        }
        wx.login({
          success: function (res) {
            if (res.code) {
              console.log(res)
              wx.request({
                // url: rootHttpUrl + '/u/wxlogin',
                url: rootHttpUrl + '/u/wxlogin3rd',
                data: { appId: appIds, code: res.code },
                method: 'POST',
                header: { "content-type": 'application/x-www-form-urlencoded' },
                success: function (res) {
                  if (res.statusCode == 500 || res.statusCode == 501 || res.statusCode == 502) {
                    showModel('服务开小差了，请稍后重试！')
                  } else if (res.statusCode == 200) {
                    wx.setStorageSync('token', res.data.token)
                    wx.setStorageSync('userId', res.data.data.id)
                    cb('true')
                  }
                },
                fail: function (res) {
                  console.log(res)
                },
                complete: function (res) {
                }
              })
            } else {
              showModel('获取用户登录态失败：' + res.errMsg)
            }
          }
        })
      } else {
        cb('true')
      }
    },
    fail: function (res) {
      console.log(res.extConfig)
    }
  })
}

function showModel(content) {
  wx.showModal({
    title: '提示：',
    content: content,
    showCancel: false,
    success: function (res) {

    }
  })
}

function checkAuth(token) {
  wx.getUserInfo({
    success: function (res) {
      console.log(res)
      wx.request({
        url: rootHttpUrl + '/u/users/' + wx.getStorageSync('userId') + '?token=' + token,
        data: {
          'avatarUri': res.userInfo.avatarUrl,
          'gender': res.userInfo.gender,
          'nickName': res.userInfo.nickName,
          'address': {
            'city': res.userInfo.city,
            'district': res.userInfo.country,
            'localIndex': 0,
            'province': res.userInfo.province
          }
        },
        method: 'PUT',
        header: { "content-type": 'application/json' },
        success: function (res) {
          if (res.statusCode == 500 || res.statusCode == 501 || res.statusCode == 502) {
            // showModel('服务开小差了，请稍后重试！')
          } else if (res.statusCode == 200) {
            wx.setStorageSync('isAuth', 'true')
          }
        },
        fail: function (res) {

        },
        complete: function (res) {

        }
      })
    }
  })
}


module.exports = {
  requestFun: requestFun
}