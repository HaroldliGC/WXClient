Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {},
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