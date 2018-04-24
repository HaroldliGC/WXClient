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
    const data = {
      'grant_type': 'password',
      'username': e.detail.value.username,
      'password': e.detail.value.password,
    }
    const formData = this.serializeObj(data);
    wx.request({
      url: 'http://localhost:61021/token',
      data: formData,
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      success: function(res) {
        console.log(res)
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

  serializeObj : function(obj) {
    var result = [];
    for (var property in obj) {
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
    }
    return result.join("&");
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