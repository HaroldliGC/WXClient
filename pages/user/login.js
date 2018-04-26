// pages/user/login.js
import {getToken,setToken,serviceApi} from '../../utils/util.js';

Page({
  //注册
  re_Register: function(e) {
    wx.navigateTo({
      url: './register',
    })
  },
  //登陆
  formSubmit: function(e) {
    var that = this;
    let Token = '';
    const data = {
      'grant_type': 'password',
      'username': e.detail.value.username,
      'password': e.detail.value.password,
    }
    const userInf = {
      'Account': e.detail.value.username,
      'Password': e.detail.value.password,
    }
    const formData = this.serializeObj(data);
    wx.request({
      url: 'http://localhost:61021/token',
      data: formData,
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      success: function(res) {
        //console.log(res)
        if (res.statusCode === 200) {
          console.log(res.data)
          Token = res.data.access_token;
          setToken(Token);
          serviceApi('http://localhost:61021/api/Login/UserLogin',{
            method:'POST',
            data: userInf,
          },
          that.success
          );
        } else {
          wx.showToast({
            title: '用户名密码错误',
            icon: 'loading',
            duration: 2000,
          })
        }
      }
    })
  },

  serializeObj : function(obj) {
    var result = [];
    for (var property in obj) {
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
    }
    return result.join("&");
  },

  success : function(res) {
    //console.log("rec:",res);
    //console.log("recData:", res.data);
    const data = res.data;
    switch(data.type){
      case 'failed':{
        wx.showToast({
          title: data.message,
          icon: 'loading',
          duration: 2000,
        })
        break;
      }
      case 'success':{
        const userId = res.data.userId;
        const userName = res.data.userName;
        wx.setStorage({
          key: 'userId',
          data: userId,
        })
        wx.setStorage({
          key: 'userName',
          data: userName,
        })
        wx.redirectTo({
          url: '../index/home',
        })
        break;
      }
      default:
    }
  }

})