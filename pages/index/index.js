//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  onLoad: function () {
    setTimeout(function(){
      wx.redirectTo({
        url: '../user/login',
      })
    },1000)
  }
})
