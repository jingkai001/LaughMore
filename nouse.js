/*
* ## 搭环境
 - 初始化项目
 ```
 npm init -y;
 ```
 - 安装开发依赖模块
 ```
 npm install webpack webpcak-dev-server babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0 less less-loader style-loader css-loader url-loader file-loader html-webpack-plugin -D
 ```
 - 安装生产依赖模块
 ```
 npm install react react-dom react-router-dom redux react-redux bootstrap jquery -S
 ```
 - 修改脚本 package.json
 ```
 "scripts": {
 "build": "webpack",
 "dev":"webpack-dev-server --open"
 },
 ```
 - 编写配置文件 webpack.config.js
 - babel 预设 .babelrc
 ```
 {
 "presets":["react","es2015","stage-0"]
 }
 ```
 ## 需要用到的一些知识（回顾）
 ### 组件的属性和状态
 ### 组件的生命周期
 ### React中如何实现DOM操作
 - event.target
 - 给元素加ref属性，通过this.refs获取
 - 父组件中如何获取子组件中的DOM元素
 ### 受控组件和非受控组件：
 - 表单元素的值受状态控制为`受控组件`,反之为`非受控组件`,如要用户能够改变受控组件的值，一般需要给其添加事件改变组件的状态；
 ### 路由 ‘react-router-dom’
 - HashRouter
 - BrowserRouter
 - Route
 - Link
 - Switch
 - Route渲染出的组件会有三个属性 history,location,match
 - 路由渲染组件的三种方式：
 - component={组件名}，
 - render={()=>{}},
 - children={()=>{}},
 - Prompt:阻止导航，两个属性 when message；
 ### redux ‘redux’
 #### redux流程
 - createStore:创建仓库，需传递reducer方法
 - reducer是一个函数(保安)，两个参数：state和action
 - dispatch:派发action；
 - action是一个对象，必须要有type属性；
 - subscribe:订阅，可以传递一个回调函数，状态发生变化时，回调函数执行；
 - getState:获取状态对象；

 - combineReducer：合并reducer；
 ### react-redux ‘react-redux’
 - Provider：放在根组件外层，负责把store传递给所有后代组件；
 - connect：连接组件和store，并自动完成订阅渲染组件；
 - connect调用时执行两次；
 - 第一次需传递两个参数：mapStateToProps，把store的状态对象映射为当前组件的属性；mapDispatchToProps，把dispatch方法映射为当前组件的属性对象(也可简写，直接传递dispatch的action对象参数即可)；
 - 第二个参数为当前组件；

 ## 后台所用模块：
 ```
 npm install express express-session body-parser cheerio connect-flash connect-mongo cron iconv-lite mongoose multer request socket.io ws -S
 ```

 ## API
 - 静态文件1：
 - 首页： "/";
 - 登录："/login";
 - 注册："/signup";
 - 个人中心："/profile",
 - 发表文章："/publish"
 - 文章详情："/article/:id"
 - 编辑个人信息："/edit";
 - 查看个人发表："/published";
 - 查看个人收藏："/usercollect";
 - 查看个人点赞："/userlike"

 - 静态文件2：头像

 ### 数据格式
 - 根据数组中每个对象的type来区分是轮播图数据还是列表数据；
 - 每个对象的item属性是个对象，里面放着所有的文章信息
 - 收藏，点赞只能在登录后才能实现，点击前需要判断是否登录；
 - 点击收藏后，会发送请求，带着对应文章的id，后台接收后，将此文章的的id当做外键存入对应客户的数据库中；再次点击取消收藏，逻辑相同；
 - 点赞，发送请求，带着对应文章的id，后台接收后，会将此文章的like属性加1，然后把此文章id当做外键，存入对应客户的数据库中，再次点击，取消点赞，逻辑相同；

 数据库1、articles(各类文章)
 [
 {
 "_id":xxxxxx,
 "title":"标题",
 "author":"xxxx",
 "text":"具体内容",
 "comments":[
 {
 user:{type:ObjectId,ref:'User'},
 content:String,
 createAt:{type:Date,default:Date.now}
 },
 ...
 ],
 "image":[],
 "type":{
 name:'精华'/'搞笑段子'/'推荐'。。。
 },
 "like":345,
 "favorite":false,
 "createAt":xxxx-xx-xx,
 "order":1
 },
 ...
 ]

 数据库2、focus(轮播图)
 [
 {
 "_id":xxxxxx,
 "title":"标题",
 "author":"xxxx",
 "text":"具体内容",
 "commentsLength":234,
 "image":[],
 "type":{type:ObjectId,ref:'Category'},
 "like":345,
 "createAt":{type:Date,default:Date.now}
 },
 ]

 数据库3、user
 [
 {
 "_id":xxxxxx,
 "username":"sss",
 "password":"xxxxxx",
 "avatar":"xxx",
 "like":[外键],
 "favourite":[外键],
 "publish":[外键],
 "email":xxx,
 "sex":0(男) 1(女)
 "location":xxx,
 "company":xxx,
 "birthday":xxx,
 "school":xxx,
 },
 ]


 ## API接口：

 - 获取轮播图数据 get "/focus"
 ```
 暂时只是图片:[url,url,url,url];

 [
 {
 "_id":xxxxxx,
 "title":"标题",
 "author":"xxxx",
 "text":"具体内容",
 "commentsLength":234,
 "image":[],
 "type":{type:ObjectId,ref:'Category'},
 "like":345,
 "createAt":{type:Date,default:Date.now}
 },
 ]
 ```
 - 获取文章列表 get "/article/all/:offset/:limit";
 ```
 {
 hasMore:false/true
 articles：[
 {
 "_id":xxxxxx,
 "title":"标题",
 "author":"xxxx",
 "text":"具体内容",
 "comments":[
 {
 user:"用户昵称",
 content:String,
 createAt:"09-02"
 },
 ],
 "image":url,
 "type":{
 _id:xxxx,
 "name":"精华"/"搞笑段子"/"图片"/"推荐"
 },
 "like":345,
 "favorite":false,
 "createAt":xxxx-xx-xx
 "order":1/2/3...
 },
 ]
 ```
 - 获取某一类型文章列表 get "/article/type/offset/limit";
 ```
 [
 {
 "_id":xxxxxx,
 "title":"标题",
 "author":"xxxx",
 "text":"具体内容",
 "comments":[
 {
 user:"用户昵称",
 content:String,
 createAt:"09-02"
 },
 ],
 "image":url,
 "type":{
 _id:xxxx,
 "name":"精华"/"搞笑段子"/"图片"/"推荐"
 },
 "like":345,
 "favorite":false,
 "createAt":xxxx-xx-xx
 "order":1/2/3...
 },
 ]
 ```

 - 获取某一篇文章 get "/article/:id"
 ```
 [
 {
 "_id":xxxxxx,
 "title":"标题",
 "author":"xxxx",
 "text":"具体内容",
 "comments":[
 {
 user:"用户昵称",
 content:String,
 createAt:"09-02"
 },
 ],
 "image":url,
 "type":{
 _id:xxxx,
 "name":"精华"/"搞笑段子"/"图片"/"推荐"
 },
 "like":345,
 "favorite":false,
 "createAt":xxxx-xx-xx
 "order":1/2/3...
 },
 ]
 ```

 - 发表文章 post "/publish" 请求体传参{title:xxx,text:xxx,image:xxx,typeId:xxx}
 - 发表成功 后台返回此文章信息；
 - 发表失败 返回 {err:'发表文章失败'}；


 - 用户注册 post "/signup" 请求体传参 {username:xxx,password:xxx,avatar:xxx(上传头像，)}
 - 用户已经注册 后台会返回 {err:'此用户名已被注册，请重新选择用户名'}
 - 用户注册成功 后台返回此用户信息
 > 注册可以用form表单，method为post,avatar为后台添加

 - 用户登录 post "/login" 请求体传参 {username:xxx,password:xxx}
 - 用户登录失败 后台返回 {err:“用户名或密码错误，请重新输入”}；
 - 用户登录成功 后台返回此用户信息；

 - 验证用户是否登录 get "/auth"
 - 已登录 后台返回该用户信息；
 - 未登录 后台返回空对象；

 */
