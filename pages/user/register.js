// pages/user/register.js
import { serviceApi, HOST} from '../../utils/util.js';
Page({

  back: function(e) {
    wx.redirectTo({
      url: './login',
    })
  },

  formSubmit: function (e) {
    const that = this;
    const userInf = {
      'Id': 0,
      'Name': 'user',
      'Account': e.detail.value.useremail,
      'Password': e.detail.value.password,
      'State': 'normal',
      'Gender': '',
      'Phone': '',
      'Email': e.detail.value.useremail,
      'License': e.detail.value.license,
      'Identity': 'user'
    };
    serviceApi(`${HOST}api/Users/PostUser/`, {
      method: 'POST',
      data: userInf,
    },
      that.success
    )
  },

  success: function(res){
    if (res.statusCode === 201){
      wx.showToast({
        title: '用户注册成功',
        icon: 'success',
        duration: 1500,
      });
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      },
        1500
      )
    }
    else if (res.statusCode === 204){
      wx.showToast({
        title: '邮箱已存在',
        icon: 'loading',
        duration: 1500,
      });
    }
    else if (res.statusCode === 409){
      wx.showToast({
        title: '证件号已注册',
        icon: 'loading',
        duration: 1500,
      });
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
  
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