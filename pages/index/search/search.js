// pages/index/search/search.js
import { HOST, getToken, setToken, serviceApi } from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[]
  },

  //检索书籍
  formSubmit: function (e) {
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
      `${HOST}api/Books/getbookbysearch/`,
      {
        method: 'GET',
        data: data,
      },
      that.searchSuccess
    )
  },

  searchSuccess: function (res) {
    var that = this;
    if (res.statusCode === 200) {
      console.log("API调用成功")
      const resData = res.data;
      console.log("得到书籍为:",resData)
      that.setData({ books: resData });
    }
    else {
      console.log("API调用失败")
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

})
