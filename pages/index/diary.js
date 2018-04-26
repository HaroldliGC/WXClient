// pages/index/diary.js
import {HOST,serviceApi} from '../../utils/util.js'

var resData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: {},
    bookImage: '../images/bookPic.jpg',
    BackgroundImg: '../images/background1.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    serviceApi(
      `${HOST}api/Books/GetBookInf/`,
      {
        method:'GET',
        data: { 'id': options.id}
      },
      that.getBookSuccess
    )
  },

  getBookSuccess: function(res){
    var that = this;
    if (res.statusCode == 200) {
      const resData = res.data;
      console.log("resData:", resData);
      that.setData({ book: resData });
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