// pages/user/register.js
Page({

  back: function(e) {
    wx.navigateTo({
      url: './login',
    })
  },

  formSubmit: function (e) {
    if (e.detail.value.password == e.detail.value.re_password) {
      wx.request({
        url: "http://localhost:26800/api/ReaderUsers/GetReaderUserRegister",
        data: {
          userEmail: e.detail.value.useremail,
        },
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          console.log(res)
          if (res.statusCode == 200) {
            if (res.data == 'success'){
              wx.request({
                url: 'http://localhost:26800/api/ReaderUsers/PostReaderUser/',
                data: {
                  'Id': 0,
                  'Name': 'user',
                  'AccountNumber': e.detail.value.useremail,
                  'Email': e.detail.value.useremail,
                  'Password': e.detail.value.password,
                  'State': 'normal',
                  'Gender': '',
                  'Age': 0,
                  'Phone': "",
                },
                method: 'POST',
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  console.log(res);
                  if (res.statusCode == 201){
                    wx.showToast({
                      title: '注册成功',
                      icon: 'success',
                      duration: 2000
                    });
                  }
                  else {
                    console.log("注册失败");
                  }
                }
              })
            }
            else{
              wx.showToast({
                title: '该邮箱已被注册',
                icon: 'loading',
                duration: 2000
              })
            }
          }
        }
      })

    }
    else {
      console.log("输入密码不一致");
      wx.showToast({
        title: '输入密码不一致，请检查',
        icon: 'loading',
        duration: 2000
      })
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