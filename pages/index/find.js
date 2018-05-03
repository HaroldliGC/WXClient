// pages/index/find.js
import { HOST, getToken, setToken, serviceApi } from '../../utils/util.js';
Page({

  handleScan() {
    var that = this;
    wx.scanCode({
      success: function (res) {
        const result = res.result;
        console.log("扫码得到的内容为:", result)
        serviceApi(
          `${HOST}api/Books/GetBookByIsbn/`,
          {
            method: "GET",
            data: { 'isbn': result }
          },
          that.getBookByIsbnSuccess
        )
      },
    })
  },

  getBookByIsbnSuccess(res) {
    if (res.statusCode === 200) {
      const book = res.data;
      const bookId = book.Id;
      wx.navigateTo({
        url: `diary?id=${bookId}`,
      })
    } else {
      wx.showToast({
        title: "查无此书",
        icon: 'loading',
        duration: 2000,
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    search: '../../images/search.png',
    scan: '../../images/scan.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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