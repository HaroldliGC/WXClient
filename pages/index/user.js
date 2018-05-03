// pages/index/user.js
import { serviceApi, HOST } from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reading: '../../images/reading.png',
    readed: '../../images/readed.png',
    defaultUser: '../../images/defaultUser.jpg',
    user: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const userId = wx.getStorageSync('userId');
    serviceApi(
      `${HOST}api/Users/GetUser/${userId}`,
      { method: 'GET' },
      that.getSuccess
    );
  },

  getSuccess: function (res) {
    var that = this;
    if (res.statusCode == 200) {
      const resData = res.data;
      console.log("resData:", resData);
      that.setData({ user: resData });
    }
    else {
      console.log("请求失败：", res);
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