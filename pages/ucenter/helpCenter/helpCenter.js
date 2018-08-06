var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
// pages/ucenter/helpCenter/helpCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionList:[],
    nowId:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    util.request(api.HelpList).then(function (res) {
      console.log(res)
      _this.setData({
        questionList:res.data.issue
      })
    })
  },
  getHelpId: function(e){
    console.log(e)
    var id = e.currentTarget.dataset.id
    if(id===this.data.nowId){
      this.setData({
        nowId:null
      })
    }else{
      this.setData({
        nowId:id
      })
    }
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
  
  }
})