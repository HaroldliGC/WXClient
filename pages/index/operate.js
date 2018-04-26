import {HOST,serviceApi} from '../../utils/util.js';

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
    serviceApi(
      `${HOST}api/Business/PutreturnBookByManager/${that.data.order.Id}`,
      {
        method:'PUT',
      },
      that.returnBookSuccess
    );
  },

  returnBookSuccess: function(res){
    var that = this;
    const data = res.data;
    switch(data.type){
      case 'failed':{
        wx.showToast({
          title: data.message,
          icon: 'loading',
          duration: 2000
        })
        break;
      }
      case 'success':{
        wx.showToast({
          title: data.message,
          icon: 'success',
          duration: 1000
        })
        that.setData({order:data.order});
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        },
          1000
        )
        break;
      }
      default:
    }
  },

  //续借函数
  reBorrow: function(e) {
    var that = this;
    serviceApi(
      `${HOST}api/Business/PutrenewBook/${that.data.order.Id}`,
      {
        method: "PUT",
      },
      that.renewBookSuccess
    )
  },

  renewBookSuccess: function(res){
    var that = this;
    const data = res.data;
    switch (data.type) {
      case 'failed': {
        wx.showToast({
          title: data.message,
          icon: 'loading',
          duration: 2000
        })
        break;
      }
      case 'success': {
        wx.showToast({
          title: data.message,
          icon: 'success',
          duration: 1000
        })
        that.setData({ order: data.order });
        break;
      }
      default:
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    serviceApi(
      `${HOST}api/Orders/GetOrder/`,
      {
        method: 'GET',
        data: {'id': options.orderId}
      },
      that.getOrderSuccess
    )

  },

  getOrderSuccess: function(res){
    var that = this;
    if (res.statusCode === 200) {
      that.setData({ order: res.data });
      that.setData({ buttonState: (res.data.State === 'done' || res.data.State === 'overdone') });
      console.log("API调用成功")
    }
    else {
      console.log("API调用失败")
    }
  }

})