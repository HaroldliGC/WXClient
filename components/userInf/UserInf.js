// components/userInf/UserInf.js
import { HOST, getToken, setToken, serviceApi } from '../../utils/util.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    userImage:'../../images/userIcon.png',
    searchImage:'../../images/scanIcon.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleScan(){
      var that = this;
      wx.scanCode({
        success: function (res) {
          const result = res.result;
          console.log("扫码得到的内容为:",result)
          serviceApi(
            `${HOST}api/Books/GetBookByIsbn/`,
            {
              method: "GET",
              data: { 'isbn': result }
            },
            that.getBookByIsbnSuccess
          )
        },
      })
    },

    handleUserInf(){
      wx.navigateTo({
        url: `../user/userInf`,
      })
    },

    getBookByIsbnSuccess(res) {
      if (res.statusCode === 200) {
        const book = res.data;
        const bookId = book.Id;
        wx.navigateTo({
          url: `diary?id=${bookId}`,
        })
      } else {
        wx.showToast({
          title: "查无此书",
          icon: 'loading',
          duration: 2000,
        })
      }
    },

  }
})
