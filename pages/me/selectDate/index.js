// pages/me/selectDate/index.js
const date = new Date()
const years = []
const months = []
const days = []
const bigMonth = [1, 3, 5, 7, 8, 10, 12]

for (let i = 2000; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    years: years,
    year: date.getFullYear(),
    months: months,
    month: date.getMonth() + 1,
    days: days,
    day: date.getDate(),
    value: [date.getFullYear(), date.getMonth(), date.getDate() - 1],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  //判断元素是否在一个数组
  contains (arr, obj) {
    let i = arr.length;
    while (i--) {
      if (arr[i] === obj) {
        return true;
      }
    }
    return false;
  },

  setDays: function (day) {
    const temp = [];
    for (let i = 1; i <= day; i++) {
      temp.push(i)
    }
    this.setData({
      days: temp,
    })
  },

  //选择滚动器改变触发事件
  bindChange (e) {
    const val = e.detail.value;
    //判断月的天数
    const setYear =
      this.data.years[val[0]];
    const setMonth =
      this.data.months[val[1]];
    const setDay =
      this.data.days[val[2]]

    if (setMonth === 2) {
      // 闰年
      if ((setYear % 4 === 0 && setYear % 100 !== 0) || setYear % 400 === 0) {
        this.setDays(29);
      } else {
        this.setDays(28);
      }
    } else {
      //大月
      if (this.contains(bigMonth, setMonth)) {
        this.setDays(31)
      } else {
        this.setDays(30)
      }
    }

    this.setData({
      year: setYear,
      month: setMonth,
      day: setDay
    })
  },

  sure () {
    let data = {'year': this.data.year, 'month': this.data.month, 'day': this.data.day};
    wx.setStorageSync('selectedDate', data);
    wx.navigateBack({
      delta: 1
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