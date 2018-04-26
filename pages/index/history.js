// pages/index/history.js
import {HOST,serviceApi} from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Orders: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    serviceApi(
      `${HOST}api/Orders/GetReturnOrderByUserId/`,
      {
        method: 'GET',
        data: { 'userId': wx.getStorageSync('userId') }
      },
      that.getOrderSuccess
    );
  },

  getOrderSuccess: function(res){
    var that = this;
    if (res.statusCode === 200) {
      that.setData({ Orders: res.data });
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