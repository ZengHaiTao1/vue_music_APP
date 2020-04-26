# vue+vuex+vue-router+better-scroll+axios+网易云音乐API---打造仿网易云音乐APP

### 打开方式

```
$ git https://github.com/ZengHaiTao1/vue_music_APP.git
$ cd vue_music_APP-master
$ npm install

// 下载网易云API
$ git https://github.com/Binaryify/NeteaseCloudMusicApi.git
$ cd NeteaseCloudMusicApi
$ npm install 
$ node app.js

```
修改vue.config.js中的接口地址
```js
 proxy: {
            "/m-api": {
                // target: "http://localhost:3000/",// 要访问的接口域名
                         // ws: true,// 是否启用websockets
                changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: {
                    '^/m-api': '' //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
                }
            },
        }
```

```
启动项目

npm run serve

//注意先调成手机模式在打开网站

打包
npm run build   生成dist文件

打开方法

安装
npm install http-server -g 

启动项目，代理3000端口
http-server -p 8000 -P http://localhost:3000/

```

# 模块分层

```shell
vue_music_app
├── puliic  #静态资源目录 
│   ├── img # 静态图片
│   └── index.html 
├── src  # 核心源码
│   ├── assets  #公共css，一些需要打包处理的静态文件
├   ├── components    #基础组件
│   ├── http  #api请求
├   ├── mixin  #mixin 混入
│   ├── router # 路由管理
│   ├──store # 状态管理
│   ├── utils # 工具函数
│   ├── views # 视图
│   ├── APP.vue 
│   ├── main.js #webpack入口文件

```


# 功能介绍

## 播放器部分

迷你播放器，可以左右滑动，切换歌曲
<img  src = "https://zhtblog-1300797618.cos.ap-guangzhou.myqcloud.com/musi-app/%E6%92%AD%E6%94%BE%E5%99%A8%E5%86%85%E6%A0%B8.gif"/>

![](https://raw.githubusercontent.com/ZengHaiTao1/PIC/master/music-img/1.gif?token=AIXH2DXF3NWWSEPGYANSW3K6UUGUQ)
![](https://zhtblog-1300797618.cos.ap-guangzhou.myqcloud.com/musi-app/%E6%92%AD%E6%94%BE%E5%99%A8%E5%86%85%E6%A0%B8.gif)


全屏播放器，可以显示歌词，进度条的拖拽,播放模式的切换

![](https://zhtblog-1300797618.cos.ap-guangzhou.myqcloud.com/musi-app/%E6%92%AD%E6%94%BE%E5%99%A8%E5%86%85%E6%A0%B83.gif)


播放列表，删除歌曲，切换歌曲，删除全部歌曲

![](https://zhtblog-1300797618.cos.ap-guangzhou.myqcloud.com/musi-app/%E6%92%AD%E6%94%BE%E5%99%A8%E5%86%85%E6%A0%B84.gif)



## 搜索部分

可以获得热搜榜，存储搜索历史，点击搜索相关的歌手，歌单，歌曲

![](https://zhtblog-1300797618.cos.ap-guangzhou.myqcloud.com/musi-app/%E6%90%9C%E7%B4%A2%E9%83%A8%E5%88%86.gif)

## 排行榜

![](https://zhtblog-1300797618.cos.ap-guangzhou.myqcloud.com/musi-app/%E6%8E%92%E8%A1%8C%E6%A6%9C.gif)


## 歌手

![](https://zhtblog-1300797618.cos.ap-guangzhou.myqcloud.com/musi-app/%E6%AD%8C%E6%89%8B%E9%A1%B5%E9%9D%A2.gif)


## 推荐

![](https://zhtblog-1300797618.cos.ap-guangzhou.myqcloud.com/musi-app/%E6%8E%A8%E8%8D%90%E9%A1%B5%E9%9D%A2.gif)




# 计划


未来会根据api加一些相关的功能
- 登录
- 每日推荐
- 喜欢
- 歌曲评论
- ...

欢迎star和提issues。

