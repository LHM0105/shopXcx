var api = require('../config/api.js');
 
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "GET") {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'X-Nideshop-Token': wx.getStorageSync('token'),
      },
      success: function (res) {
        console.log("success");

        if (res.statusCode == 200) {

          if (res.data.errno == 401) {
            //需要登录后才可以操作
            wx.showModal({
                title: '',
                content: '请先登录',
                success: function (res){
                  // token过期，需要重新登录，重置用户信息
                  wx.removeStorage({
                    key: 'userInfo',
                    success: function(res) {},
                  })
                  wx.removeStorage({
                    key: 'token',
                    success: function(res) {},
                  })
                  var app = getApp()
                  console.log(app)
                  app.globalData.userInfo = {
                    nickName: 'Hi,游客',
                    userName: '点击去登录',
                    avatarUrl: 'http://p9kyr79ne.bkt.clouddn.com/1/20180531/150547696d798c.png'
                  }
                  
                  if (res.confirm) {
                      wx.switchTab({
                          url: '/pages/ucenter/index/index'
                      });
                  }
                }
            });
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }

      },
      fail: function (err) {
        reject(err)
        console.log("failed")
      }
    })
  });
}

/**
 * 检查微信会话是否过期
 */
function checkSession() {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: function () {
        resolve(true);
      },
      fail: function () {
        reject(false);
      }
    })
  });
}

/**
 * 调用微信登录
 */
function login() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          //登录远程服务器
          console.log(res)
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}

function redirect(url) {

  //判断页面是否需要登录
  if (false) {
    wx.redirectTo({
      url: '/pages/auth/login/login'
    });
    return false;
  } else {
    wx.redirectTo({
      url: url
    });
  }
}
function relaunch(url){
  if(false){
    wx.redirectTo({
      url: '/pages/auth/login/login',
    })
    return false;
  } else {
    wx.reLaunch({
      url: url
    })
  }
}

function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    image: '/static/images/icon_error.png'
  })
}

function showSuccessToast(msg) {
  wx.showToast({
    title: msg,
  })
}

module.exports = {
  formatTime,
  request,
  redirect,
  relaunch,
  showErrorToast,
  showSuccessToast,
  checkSession,
  login,
}


