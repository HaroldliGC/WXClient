// pages/index/add.js
import {HOST, serviceApi} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {},
    book: {},
    startDate: new Date().toDateString,
    endDate: new Date().toDateString,
    userId: '',
  },

  bindStartDate: function(e) {
    var that = this;
    that.setData({
      startDate: e.detail.value,
    })
  },

  bindEndDate: function(e) {
    var that = this;
    that.setData({
      endDate: e.detail.value,
    })
  },

  formSubmit: function(e) {
    var that = this;
    serviceApi(
      `${HOST}api/Business/borrowBookByUser/`,
      {
        method: "POST",
        data: {
          'UserId' : wx.getStorageSync('userId'),
          'BookId' : that.data.book.bookId,
          'StartDate' : that.data.startDate,
          'EndDate' : that.data.endDate
        }
      },
      that.success
    )
  },

  success: function(res){
    const data = res.data;
    wx.showToast({
      title: data.message,
      icon: 'loading',
      duration: 2000,
    })
    setTimeout(function(){
      wx.navigateBack({
        delta: 1
      })},
      2000
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("options:",options)
    that.setData({ book: options});
    that.setData({ userId: wx.getStorageSync('userId')});
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