![IMG_2041.JPG](http://image.lingyikz.cn/image/IMG_2041_1584337480082.JPG)
![IMG_2039.JPG](http://image.lingyikz.cn/image/IMG_2039_1584337495132.JPG)
![IMG_2040.JPG](http://image.lingyikz.cn/image/IMG_2040_1584337508951.JPG)
![IMG_2043.JPG](http://image.lingyikz.cn/image/IMG_2043_1584337532445.JPG)

**微信搜索：13号档案馆**

**该项目是本人与阿全@aquanlerou经过一番PY交易后已经得到了授权，重新立项**

**该项目是本人与阿全@aquanlerou经过一番PY交易后已经得到了授权，重新立项**

**该项目是本人与阿全@aquanlerou经过一番PY交易后已经得到了授权，重新立项**

**customizes-wehalo**:顾名思义，自定义的wehalo
因为个人的审美和喜好，在wehalo的基础上加部分功能，修复了部分bug，更改了部分UI，有部分网友需要到我的这套自定义版，所以开源了出来。后续也会加一些功能进去

[如果你是通过wehalo下载的代码，部署时会有一些坑，不会部署wehalo的点我](https://blog.lingyikz.cn/archives/wehalojc)

如果你是通过**customizes-wehalo**下载的代码，那么这些坑我已经帮你踩完了。但是**customizes-wehalo**不是原汁原味的wehalo，因为加了自定义。

好了，来说下customizes-wehalo和wehalo的区别在哪

- 添加首页分类查询，分类来自halo后台设置的标签，点击分类可查当前分类的文章
- 添加文章详情点赞功能，可对喜欢的文章点个赞（通过云函数实现）
- 添加首页侧栏处日记簿，结合halo后台的速记
- 添加仪表盘中用户人数统计，结合bmob后端云，记录用户人数（管理员可见）
- 添加评论内容检查，非敏感内容才能发布，结合bmob后端云api（很多用户反映，小程序上架审核失败就是因为评论没有做敏感词汇检测）
- 修改文章详情UI，可以说是完全修改（个人比较喜欢这种风格）
- 修复获取评论列表BUG（该Bug在wehalo中也修复）
- 修复评论后当前评论值一直在内存中（该Bug在wehalo中也修复）

PS：如果不需要用户人数统计和评论内容敏感检测的可以在js文件中注释掉相关代码，如果需要的自行到bmob官网注册配置。

> QQ交流群: 260050047

最后再申明一次，customizes-wehalo是得到了阿全的授权，同时我也是wehalo的维护者，wehalo的相关需求我和阿全讨论后会增加。
