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
    wx.request({
      url: 'http://localhost:26800/api/ReaderUsers/GetReaderUserLogin/',
      data: {
        'userAccount': e.detail.value.username,
        'userPassword': e.detail.value.password,
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function(res) {
        if (res.statusCode === 200) {
          console.log(res)
          if (res.data.length !== 0) {
            if (res.data[0].State !== 'stop'){
              wx.setStorage({
                key: 'userAccount',
                data: res.data[0].AccountNumber,
              })
              wx.setStorage({
                key: 'userPassword',
                data: res.data[0].Password,
              })
              wx.setStorage({
                key: 'userId',
                data: res.data[0].Id,
              })
              wx.redirectTo({
                url: '../index/home',
              })
            }
            else{
              wx.showToast({
                title: '该账户已经被停用，请联系管理员恢复',
                icon: 'loading',
                duration: 2000,
              })
            }
          }
          else {
            wx.showToast({
              title: '用户名密码错误',
              icon: 'loading',
              duration: 2000,
            })
          }
        }
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