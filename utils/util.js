const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getToken = () => {
  const token = wx.getStorageSync('token');
  if (!token){
    return '';
  }
  return token;
}

const setToken = (token) => {
  wx.setStorage({
    key: 'token',
    data: token,
  });
}

export const serviceApi = (url, options = {}, success) => {
  const token = getToken();
  const header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.header
  };
  if (header['Content-Type'] === 'multipart/form-data') {
    delete header['Content-Type'];
  }
  return wx.request({
    url: url,
    header: header,
    ...options,
    success: success,
  })
}

const HOST = "http://localhost:61021/";

module.exports = {
  formatTime: formatTime,
  getToken: getToken,
  setToken: setToken,
  serviceApi: serviceApi,
  HOST: HOST,
}
