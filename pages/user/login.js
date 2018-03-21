// pages/user/login.js
Page({
  //注册
  re_Register: function(e) {
    wx.navigateTo({
      url: './register',
    })
  },
  //登陆
  formSubmit: function(e) {
    var userAccount = e.detail.value.userName;
    var userPassword = e.detail.value.password;
    wx.request({
      url: "http://localhost:26800/api/ReaderUsers/getreaderuserlogin/",
      data: {
        'token': getApp().globalData.userInfo.dev_token,
        'userAccount': userAccount,
        'userPassword': userPassword,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res.data)

      }
    })
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