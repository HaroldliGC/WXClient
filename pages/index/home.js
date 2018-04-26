// pages/index/home.js
import {HOST, getToken, setToken, serviceApi} from '../../utils/util.js';

var resData = [];

function setData(data) {
  var that = this;
  that.setData({
    books: data,
  })
}

Page({
  handleClick: function(e){
    var that = this;
    wx.scanCode({
      success: function(res){
        const result = res.result;
        //console.log("扫码得到的内容为:",result)
        serviceApi(
          `${HOST}api/Books/GetBookByIsbn/`,
          {
            method:"GET",
            data:{'isbn':result}
          },
          that.getBookByIsbnSuccess
        )
      },
    })
  },

  getBookByIsbnSuccess: function(res){
    if (res.statusCode === 200){
      const book = res.data;
      const bookId = book.Id;
      wx.navigateTo({
        url: `./diary?id=${bookId}`,
      })
    } else {
      wx.showToast({
        title: "查无此书",
        icon: 'loading',
        duration: 2000,
      })
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    bookImage: '../images/book.png',
    BackgroundImg: '../images/background0.jpg',
  },

  //检索书籍
  search: function(e) {
    var that = this;
    const data = {
      'Name': e.detail.value.bookname,
      'Isbn': '',
      'Type': '',
      'Press': '',
      'Author': '',
    };
    //console.log(e.detail.value.bookname)
    serviceApi(
      "http://localhost:61021/api/Books/getbookbysearch/",
      {
        method:'GET',
        data: data,
      },
      that.searchSuccess
    )
  },

  searchSuccess: function(res){
    var that = this;
    if (res.statusCode === 200) {
      console.log("API调用成功")
      resData = res.data;
      that.setData({ books: resData });
    }
    else {
      console.log("API调用失败")
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    serviceApi(
      "http://localhost:61021/api/Books/GetBooks",
      {method:'GET'},
      that.getSuccess
    );
  },
  
  getSuccess: function(res) {
    var that = this;
    if (res.statusCode == 200) {
      const resData = res.data;
      console.log("resData:", resData);
      that.setData({ books: resData });
    }
    else {
      console.log("请求失败：", res);
    }
  }
})