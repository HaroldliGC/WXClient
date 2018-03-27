Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {},
    buttonState: false,
    date: new Date(),
  },

  bindDate: function (e) {
    var that = this;
    that.setData({
      date: e.detail.value,
    })
  },

  //还书函数
  returnBook: function (e) {
    var that = this;
    var nowDate = new Date();
    wx.request({
      url: 'http://localhost:26800/api/BusinessOrders/PutBusinessOrder/'+that.data.order.Id,
      data: {
        'Id': that.data.order.Id,
        'BookId': that.data.order.BookId,
        'ReaderUserId': that.data.order.ReaderUserId,
        'StartDate': that.data.order.StartDate,
        'EndDate': that.data.order.EndDate,
        'ReturnDate': nowDate,
        'BusinessState': that.data.order.BusinessState,
        'OrderState': 'finished'
      },
      method: "PUT",
      header: {
        'Content-Type': 'application/json',
      },
      success: function(res) {
        console.log("还书结果：",res);
        if (res.statusCode === 204) {
          console.log("还书成功");
          wx.redirectTo({
            url: './manager',
          }),
          wx.showToast({
            title: '图书归还成功',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },
  //续借函数
  reBorrow: function(e) {
    var that = this;
    wx.request({
      url: 'http://localhost:26800/api/BusinessOrders/PutBusinessOrder/' + that.data.order.Id,
      data: {
        'Id': that.data.order.Id,
        'BookId': that.data.order.BookId,
        'ReaderUserId': that.data.order.ReaderUserId,
        'StartDate': that.data.order.StartDate,
        'EndDate': that.data.order.EndDate,
        'ReturnDate': that.data.date,
        'BusinessState': that.data.order.BusinessState,
        'OrderState': that.data.order.OrderState,
      },
      method: "PUT",
      header: {
        'Content-Type': 'application/json',
      },
      success: function (res) {
        console.log("续借结果：", res);
        if (res.statusCode === 204) {
          console.log("续借成功");
          wx.redirectTo({
            url: './manager',
          }),
          wx.showToast({
            title: '图书续借成功',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("options:", options)
    wx.request({
      url: 'http://localhost:26800/api/BusinessOrders/GetBusinessOrder/'+options.orderId,
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: function(res) {
        console.log("order:",res)
        if (res.statusCode === 200) {
          that.setData({order:res.data[0]});
          that.setData({buttonState:(res.data[0].OrderState === 'finished')});
          console.log("API调用成功")
        }
        else {
          console.log("API调用失败")
        }
      }
    })

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