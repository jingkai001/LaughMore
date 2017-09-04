# 基于React、React-Router4、React-Redux、React-Router-Redux+Node，Express，MongoDB的App(点赞，收藏，发表，评论...)

- 本项目主要用来总结一段时间来学习的React各种知识；
- 后台基于Node.js+Express+MongoDB构建服务端；

## 安装和运行程序
克隆项目
```
$ git clone https://github.com/jingkai001/LaughMore.git
```

安装依赖
```
npm install
```

启动mongoDB 
```
mongod --dbpath=数据库将要存储的文件路径
```
> 页面显示内容会从数据库中获取，数据库空不显示内容，可以先注册后发表几篇文章后往数据库中存储几篇文章

在server目录下启动后台服务
```
直接运行server.js文件即可
```

在LaughMore目录下启动webpack服务
```
npm run dev
```

## 数据库存储的数据结构
```
User:{//用户模型
         username:String,
         password:String,
         avatar:String,
         like:{type:Array,default:[]},//->点赞，数组中存储外键，指向所点赞的文章
         favorite:{type:Array,default:[]},//->收藏，数组中存储外键，指向所收藏的文章
         publish:{type:Array,default:[]},//->发表，数组中存储外键，指向所发表的文章
         email:{type:String,default:''},
         birthday:{type:String,default:''},
         sex:{type:String,default:'男'},
     }
     
Article:{//文章模型
            title:String,
            author:String,
            text:String,
            comments:[
                {
                    user:String,
                    content:String,
                    createAt:{type:Date,default:Date.now},
                }
            ],
            image:String,
            type:{type:ObjectId,ref:'Type',},
            like:Number,
            favorite:{type:Boolean,default:false},
            createAt:{type:Date,default:Date.now},
            order:{type:Number,default:1}
        }
        
Type:{//文章分类模型
         name:String,
     }        
```

## 后台接口（跨域请求 请求http://localhost:3000）
轮播图数据
```
get '/focus' 返回 [轮播图图片地址1,轮播图图片地址2...];
```
文章分类
```
get '/type' 返回 Array；
```
获取文章数据
```
get '/article/:type/:offset/:limit' 返回对应个数的文章数组
```
获取某一篇文章
```
get  '/article/:id'  返回对应的文章数据
```
搜索文章
```
get  '/search/:关键字/:offset/:limit'  返回匹配的文章数组
```
注册
```
post '/signup' 返回用户数据
```
登录
```
post '/login'  返回用户数据
```
验证用户是否登录
```
get '/auth'  返回用户数据
```
修改用户信息 头像
```
post  '/modifyavatar' 返回{code：0/1};
```
修改用户信息 其他信息
```
post  '/modify'  返回新用户信息
```
退出登录
```
get  '/logout'  返回{code:0/1};
```
点赞
```
post  '/like'  返回点赞后的文章数据和用户数据
```
取消点赞
```
post  '/canclelike'  返回取消点赞后的文章数据和用户数据
```
收藏
```
post  '/favorite'  返回收藏后的用户新数据
```
取消收藏
```
post  '/cancelfavorit'  返回取消收藏后的用户的新数据
```
发表评论
```
post  '/comment/:id(对应文章的_id)'  返回新的文章数据
```
删除评论
```
post  '/delcomment/:id'   返回新的文章数据
```
发表文章时上传的图片
```
post  '/publishimg'  数据库新建一个文章，返回此文章
```
发表文章其他内容（没有上传图片）
```
post  '/publisharticle'   返回发表的此文章
```
获取用户点赞过的文章
```
get  '/getlike'  返回用户点赞过的文章数组
```
获取用户收藏过的文章
```
get  '/getfavorite'  返回用户收藏过的文章数组
```
获取用户发表过的文章
```
get  '/getpublished'   返回用户发表过的文章数组
```








