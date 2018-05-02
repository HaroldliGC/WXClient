// pages/index/manager.js
import {getToken, HOST, setToken, serviceApi} from '../../utils/util.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    Orders:[],
    bookImage: '../images/bookPic.jpg',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    serviceApi(
      `${HOST}api/Orders/GetUnreturnOrderByUserId/`,
      {
        method: 'GET',
        data: {'userId' :wx.getStorageSync('userId')}
      },
      that.success
    );

  },

  success: function(res) {
    var that = this;
    if (res.statusCode === 200) {
      that.setData({ Orders: res.data });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("data:",this.data)
  },

})