// pages/index/home.js
var resData = [];

function setData(data) {
  var that = this;
  that.setData({
    books: data,
  })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    bookImage: '../images/book.png',
  },

  //检索书籍
  search: function(e) {
    var that = this;
    console.log(e.detail.value.bookname)
    wx.request({
      url: 'http://localhost:26800/api/Books/getbookbysearch/',
      data: {
        'Name' : e.detail.value.bookname,
        'Isbn' : '',
        'Type' : '',
        'Press' : '',
        'Author' : '',
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function(res){
        console.log("res:",res)
        if (res.statusCode === 200){
          console.log("API调研成功")
          resData=res.data;
          that.setData({books:resData});
        }
        else {
          console.log("API调用失败")
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://localhost:26800/api/books/getbooks',
      method: 'GET',
      header: {
        'Accept':'application/json',
        'Content-Type':'application/json',
      }, 
      success: function (res) {
        console.log("res：", res);
        if (res.statusCode == 200){
          resData = res.data;
          console.log("resData:",resData);
          that.setData({books:resData});
        }
        else{
          console.log("请求失败：",res);
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      books: resData,
    })
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