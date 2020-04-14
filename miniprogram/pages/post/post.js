// miniprogram/pages/post/post.js
const app = getApp();
const Bmob = require('../../utils/Bmob-2.2.2.min.js') ;
const request = require('../../utils/request.js');
let time = require('../../utils/util.js');
var countdown = 60; 
const db = wx.cloud.database()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,
        skin: app.globalData.skin,
        style: app.globalData.highlightStyle,
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        CommentShow: false,
        ButtonTimer: '',//  按钮定时器
        LastTime: 60,
        CommentSwitch: true,
        isLike:false,
        onPageScroll:0
    },

    // getUserInfo: function (e) {
    //     app.globalData.userInfo = e.detail.userInfo;
    //     Bmob.User.upInfo(res.userInfo)
    // },
  /**
    * 监听屏幕滚动 判断上下滚动
    */
  onPageScroll: function (event) {
    this.setData({
      scrollTop: event.detail.scrollTop
    })
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this ;
      const query = Bmob.Query('appinfo');
      query.get('z5XI777G').then(res => {
        console.log(res)
        that.setData({
          backimg: res.backimg,
          logoimg: res.logo,
        })

      }).catch(err => {
        console.log(err)
      })


        // 在页面中定义插屏广告
        // let interstitialAd = null

        // 在页面onLoad回调事件中创建插屏广告实例 
        // if (wx.createInterstitialAd) {
        //     interstitialAd = wx.createInterstitialAd({
        //         adUnitId: 'adunit-296c920c08da636d'
        //     })
        //     interstitialAd.onLoad(() => { })
        //     interstitialAd.onError((err) => { })
        //     interstitialAd.onClose(() => { })
        // }

        // 在适合的场景显示插屏广告
        // if (interstitialAd) {
        //     interstitialAd.show().catch((err) => {
        //         console.error(err)
        //     })
        // }


        var postId = options.postId;
        // console.log(postId);
        this.setData({
            postId: postId
        })


        var urlContent = app.globalData.url + '/api/content/posts/' + postId;
        var token = app.globalData.token;
        var params = {};
        //@todo 文章内容网络请求API数据
        request.requestGetApi(urlContent, token, params, this, this.successFunPost, this.failFunPost);

        var urlComments = urlContent + '/comments/list_view';
        //@todo 评论列表网络请求API数据
        request.requestGetApi(urlComments, token, params, this, this.successComment, this.failComment);
        var urlSwitch = app.globalData.url + '/api/content/options/keys/comment_api_enabled';
        //@todo 评论开启按钮网络请求API数据
        request.requestGetApi(urlSwitch, token, params, this, this.successSwitch, this.failSwitch);


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
      var article_id = this.article_id ;
 
      // console.log(isLike);
        // console.warn(app.globalData.userInfo);
      console.log(app.globalData.userInfo)
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    Bmob.User.upInfo(res.userInfo)
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
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
        // console.warn(this.data.postId);
        return {
            title: this.data.postTitle,
            path: '/pages/post/post?postId=' + this.data.postId,
            imageUrl: this.data.postThumbnail,
        }
    },

    getUserInfo: function (e) {
        // console.log(e)
      app.globalData.userInfo = e.detail.userInfo;
        // app.globalData.nickName = e.detail.userInfo.nickName;
        // app.globalData.avatarUrl = e.detail.userInfo.avatarUrl;
      Bmob.User.upInfo(e.detail.userInfo)
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        });
    },

    /**
     * 文章详情请求--接口调用成功处理
     */
    successFunPost: function (res, selfObj) {
        var that = this;

        console.log(res.data);
        var createTime = res.data.createTime;
        // time.customFormatTime(createTime, 'Y-M-D h:m:s');
        // 当前时间的日期格式
        // var date = new Date();
        // console.log(time.formatTime(date+"123"));
        var article_id = res.data.id ;
        this.searchAllLike(article_id);
        this.searchUserLike(article_id);
        that.setData({
            postTitle: res.data.title,
            postVisits: res.data.visits,
            // postLikes: res.data.likes,
            postContent: res.data.originalContent,
            postDate: time.customFormatTime(createTime, 'Y-M-D'),
            postTags: res.data.tags,
            postThumbnail: res.data.thumbnail,
            article_id:res.data.id
        })
        // console.warn(postTags);
   
     

    },
    /**
     * 文章详情请求--接口调用失败处理
     */
    failFunPost: function (res, selfObj) {
        console.error('failFunPosts', res)
    },

// { "authData": { "weapp": { "openid": "o7Vka4y6Kv6yLrULn_uKuuYGGvMo", "session_key": "EkgA5DkWJ+DnWrbInSO3NQ==" } }, "createdAt": "2020-01-13 20:40:37", "nickName": "可乐不能喝", "objectId": "2b0296f672", "openid": "o7Vka4y6Kv6yLrULn_uKuuYGGvMo", "sessionToken": "94a629c3409f1f1a8006cb52c981ba8f", "updatedAt": "2020-01-15 20:39:21", "userPic": "https://wx.qlogo.cn/mmopen/vi_32/3hE5bd8Np4cp0Cavzia4ibcWgiaibspKyyfczuW5LG2Wng47mem4NxgurVV20crrqZLMNthd18cwGA5Fc6NiauXe6pw/132", "username": "e54f2dfca5537784" }
    /**
     * 评论列表请求--接口调用成功处理
     */
    successComment: function (res, selfObj) {
        var that = this;
        // console.warn(res.data);
        var list = res.data.content;
        var logo = that.data.logoimg;
        console.log(list.length)
        console.log(list)
        if(list.length!=0){
          for (let i = 0; i < list.length; ++i) {
            list[i].createTime = time.customFormatTime(list[i].createTime, 'Y-M-D  h:m:s');
            list[i].falg = true;
            if (list[i].isAdmin) {
              list[i].email = '';
              list[i].authorUrl = logo;
            }
          }
          list[list.length - 1].falg = false;
        }
        that.setData({
            commentList: res.data.content,
        })
    },
    /**
     * 评论列表请求--接口调用失败处理
     */
    failComment: function (res, selfObj) {
        console.error('failComment', res)
    },



    /**
     * 评论模块
     */
    Comment: function (e) {
        var content = e.detail.value.replace(/\s+/g, '');
        // console.log(content);
        var that = this;
        that.setData({
            CommentContent: content,
        });
    },

    CommentSubmit: function (e) {

        // console.warn(this.userInfo);
        var that = this;
      console.log(that.data.CommentContent)
        if (!that.data.CommentContent) {
            wx.showToast({
                title: '评论内容不能为空！',
                icon: 'none',
                duration: 2000
            })
            // console.error("评论内容为空!");
        } else {
          let content = that.data.CommentContent
          Bmob.checkMsg(content).then(res => {
            console.log("true"+res)
              that.setData({
                    CommentShow: true,
                });
                that.data.ButtonTimer = setInterval(function () {
                    if (countdown == 0) {
                        that.setData({
                            CommentShow: false,
                        })
                        countdown = 60;
                        clearInterval(that.data.ButtonTimer);
                        return;
                    } else {
                        that.setData({
                            LastTime: countdown
                        });
                        // console.warn(countdown);
                        countdown--;
                    }
                }, 1000)
                // console.warn(that.data.CommentContent);

                var urlPostList = app.globalData.url + '/api/content/posts/comments';
                var token = app.globalData.token;
                var params = {
                    
                    author: app.globalData.userInfo.nickName,
                    authorUrl: app.globalData.userInfo.avatarUrl,
                  // authorUrl: 'https://wx.qlogo.cn/mmopen/vi_32/3hE5bd8Np4cp0Cavzia4ibcWgiaibspKyyfczuW5LG2Wng47mem4NxgurVV20crrqZLMNthd18cwGA5Fc6NiauXe6pw/132',
                    content: that.data.CommentContent,
                    email: "aquanlrou@eunji.cn",
                    parentId: 0,
                    postId: that.data.postId,
                };
                //@todo 搜索文章网络请求API数据
                request.requestPostApi(urlPostList, token, params, this, this.successSendComment, this.failSendComment);
          }).catch(err => {
            console.log("false"+err)
            wx.showToast({
              title: '内容涉嫌违法，请重新输入',
              icon: 'none',
              duration: 2000
            })
            that.setData({
              valuekey:'',
              CommentContent: undefined
            })
          })
            
        }


        
    },

    CommentSubmitTips: function() {
        wx.showToast({
            title: this.data.LastTime + "s 后再次评论",
            icon: 'none',
            duration: 1000
        })
    },

    Likes: function() {
      var isLike = this.data.isLike;
      console.log(isLike);
      if(!isLike){
        var article_id = this.data.article_id;
        var open_id = wx.getStorageSync('openid')
        this.addLike(open_id, article_id);
      }else{
            wx.showToast({
            title: "您已经喜欢该文章拉...",
            icon: 'none',
            duration: 2000
        })
      }
   
    },


    successSendComment: function (res, selfObj) {
        var that = this;
        // console.warn(res.data);
        this.setData({
          valuekey:'',
          CommentContent:undefined
        })
        wx.showToast({
          title: '评论审核通过后可显示',
          icon: 'none',
          duration: 2000
        })
        var token = app.globalData.token;
        var urlContent = app.globalData.url + '/api/content/posts/' + that.data.postId;
        var urlComments = urlContent + '/comments/list_view';
        var params = {};
        //@todo 评论列表网络请求API数据
        request.requestGetApi(urlComments, token, params, this, this.successComment, this.failComment);
    },

    failSendComment: function (res, selfObj) {
        console.error('failComment', res)
    },

     /**
     * 评论开关按钮回调
     */
    successSwitch: function(res, selfObj) {
        var that = this;
        // console.warn(res.data);
        that.setData({
            CommentSwitch: !res.data,
        });
    },
    failSwitch: function (res, selfObj) {
        console.error('failSwitch', res)
    },

    addLike:function(open_id,article_id){
      // var isLike = this.data.isLike ;
      var _this = this ;
      db.collection('like').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          open_id: open_id,
          article_id: article_id
        },
      })
        .then(res => {
          console.log(res)
          wx.showToast({
            title: '棒棒哒！',
            icon: 'none',
            duration: 2000
          })
          _this.setData({
            isLike:true
          })
        })
        .catch(console.error);
    },
  searchUserLike: function (article_id){
      var _this = this;
      var open_id = wx.getStorageSync('openid');
      // var article_id = this.data.article_id ;
      //客户端
      db.collection('like').where({
        _openid: open_id ,
        article_id: article_id
      })
        .get().then((res) => {
          // res.data 是包含以上定义的两条记录的数组
          console.log('searchUserLike');
          console.log(res);
          console.log(res.data.length);
          if(res.data.length == 0){
            console.log('res.data.length == 0')
            _this.setData({
              isLike:false
            })
          }else{
            console.log('res.data.length != 0')
            _this.setData({
              isLike: true
            })
          }
        });
    },
  searchAllLike: function (article_id) {
    // var open_id = wx.getStorageSync('openid');
    var _this = this ;
    // var article_id = this.data.article_id;
    //客户端
    db.collection('like').where({
      // _openid: open_id,
      article_id: article_id
    })
      .get().then((res) => {
        // res.data 是包含以上定义的两条记录的数组
        // console.log('searchAllLike');
        // console.log(res);
        _this.setData({
          postLikes:res.data.length
        })
      });
  },
  
})