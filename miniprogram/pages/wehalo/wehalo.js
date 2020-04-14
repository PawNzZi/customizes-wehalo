// miniprogram/pages/wehalo/wehalo.js
//获取应用实例
const app = getApp();
const request = require('../../utils/request.js');
let time = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,
        skin: app.globalData.skin,
        loading: true,
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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
      var urlJournalsList = app.globalData.url + '/api/content/journals';
      var token = app.globalData.token;
      var jparams = {
        page: 0,
        size: 20,
        sort: 'createTime,desc',
      };
      // @todo 日志网络请求API数据
      request.requestGetApi(urlJournalsList, token, jparams, this, this.successJournalList, this.failJournalList);
    },
  successJournalList: function (res, selfObj) {
    console.log(res);
    var array = res.data.content ;
    console.log(array);
    for(var i = 0;i < array.length;i++){
      console.log("array");
      var createTime = time.customFormatTime(array[i].createTime, 'Y-M-D');
      console.log(createTime);
      array[i].createTime = createTime;
    }
    this.setData({
      journalList: array
    })
  },
  failJournalList: function (res, selfObj) {
    console.log(res);
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

    },

})