// pages/user/userName.js
import { serviceApi, HOST } from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {}
  },

  formSubmit: function(e){
    //console.log("userName", e.detail.value.userName)
    var that = this;
    const userName = {Name:e.detail.value.userName};
    const userInf = {...that.data.user,...userName};
    //console.log("userInf",userInf)
    serviceApi(
      `${HOST}api/Users/PutUserInf/${wx.getStorageSync('userId')}`,
      {
        method:'PUT',
        data:userInf
      },
      that.changeInfSuccess
    )
  },

  changeInfSuccess: function(res){
    if (res.statusCode == 200){
      const data = res.data;
      if (data === "success"){
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1000,
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        },
          1000
        )
      } else {
        wx.showToast({
          title: data,
          icon: 'failed',
          duration: 1000,
        })
      }
    } else {
      console.log("请求失败：", res);
    }
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