// pages/book/bookReviews.js
import {HOST,serviceApi} from '../../utils/util.js'
Page({
  
  formSubmit: function(e){
    var that = this;
    const date = new Date();
    serviceApi(
      `${HOST}api/BookReviews/PostBookReview`,
      {
        method:"POST",
        data:{
          'Id':0,
          'UserId':wx.getStorageSync('userId'),
          'BookId':that.data.book.bookId,
          'Review':e.detail.value.review,
          'Date':date,
        }
      },
      that.addReviewSuccess
    )
  },

  addReviewSuccess: function(res){
    var that = this;
    console.log("评论结果",res);
    if (res.statusCode === 201){
      const data = res.data;
      const newData = {
        'UserName':wx.getStorageSync('userName'),
        'Review':data.Review,
        'Date':data.Date
      }
      const newReviews = that.data.reviews.concat();
      newReviews.push(newData);
      wx.showToast({
        title: "评论成功",
        icon: 'success',
        duration: 1000,
      })
      that.setData({reviews:newReviews});
      console.log("data:",that.data)
    } else {
      wx.showToast({
        title: "评论失败",
        icon: 'loading',
        duration: 1000,
      })
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    book:{},
    reviews:{},
    BackgroundImg: '../images/background1.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("书评画面",options)
    var that = this;
    that.setData({ book: options });
    serviceApi(
      `${HOST}api/BookReviews/GetBookReviewsByUser/`,
      {
        method:'GET',
        data: {'id':options.bookId}
      },
      that.getReviewsSuccess
    )
  },

  getReviewsSuccess: function(res){
    var that = this;
    if (res.statusCode == 200) {
      const resData = res.data;
      console.log("resData:", resData);
      that.setData({ reviews: resData });
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