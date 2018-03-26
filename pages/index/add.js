// pages/index/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {},
    book: {},
    startDate: {},
    endDate: {},
    userAccount: '',
  },

  bindStartDate: function(e) {
    var that = this;
    that.setData({
      startDate: e.detail.value,
    })
  },

  bindEndDate: function(e) {
    var that = this;
    that.setData({
      endDate: e.detail.value,
    })
  },

  formSubmit: function(e) {
    var that = this;
    //查询书籍的剩余数量是否为0
    wx.request({
      url: 'http://localhost:26800/api/books/getbook/' + that.data.order.BookId,
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log("res：", res);
        if (res.statusCode == 200) {
          console.log("resData:", res.data)
          if (res.data.ResidueNumber > 0){ 
            //书籍剩余数量大于0时，发送订单插入请求
            wx.request({
              url: 'http://localhost:26800/api/BusinessOrders/PostBusinessOrder/',
              data: {
                'Id': 0,
                'BookId': that.data.order.BookId,
                'ReaderUserId': that.data.order.ReaderUserId,
                'StartDate': e.detail.value.startDate,
                'EndDate': e.detail.value.endDate,
                'ReturnDate': e.detail.value.startDate,
                'BusinessState': 'normal',
                'OrderState': 'unfinished'
              },
              method: 'POST',
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                console.log(res);
                if (res.statusCode === 201) {
                  console.log("借书API调用成功，数据已插入")
                  wx.showToast({
                    title: '图书借阅成功',
                    icon: 'success',
                    duration: 2000
                  })
                }
                else {
                  console.log("借书API调用失败。")
                }
              },
            })
          }
          else{
            wx.showToast({
              title: '无库存',
              icon: 'loading',
              duration: 2000,
            })
          }
        }
        else {
          console.log("请求失败：", res);
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("options:",options)
    var initialOrder = { Id: 0, BookId: parseInt(options.bookId), ReaderUserId: wx.getStorageSync('userId'), StartDate: '', EndDate: '', ReturnDate: '', BusinessState: 'normal', OrderState:'unfinished'};
    that.setData({ order: initialOrder});
    that.setData({ book: options});
    that.setData({ userAccount: wx.getStorageSync('userAccount')});
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