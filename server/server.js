let express = require('express');
let path = require('path');
let focus = require('./mock/focus');
let articles = require('./mock/articles');
let mongoose = require('mongoose');

let bodyParser = require('body-parser');
let session = require("express-session");
let mongoStore = require('connect-mongo')(session);
//引入数据库
let {Article,User,Type} = require('./model');

let app = express();
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'laughmore',
    store:new mongoStore({
        url:'mongodb://localhost:27017/laughmore',
    })
}));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials','true');
    res.header("X-Powered-By",' 3.2.1');
    if(req.method==="OPTIONS") res.send(200);
    else  next();
});

//获取静态文件
app.use(express.static(path.resolve('node_modules')));
app.use(express.static(path.resolve('upload')));//头像存储

//获取轮播图数据
app.get("/focus",function (req,res) {
    res.json(focus);
});

//获取分类
app.get('/type',function (req,res) {
    Type.find({}).then(docs=>{
        res.json(docs);
    }).catch(err=>{
        res.json(err);
    })
});

//获取文章数据
app.get('/article/:typeid/:offset/:limit',function (req,res) {
    let {typeid,offset,limit} = req.params;
    if(typeid==0){
        Article.find({}).populate('type').skip(offset).limit(limit).exec(function (err,articles) {
            if(err){
                res.json(err);
            }else{
                if(articles.length<limit){
                    res.json({hasMore:false,articles});
                }else{
                    res.json({hasMore:true,articles});
                }
            }
        })
    }else{
        Article.find({type:typeid}).populate('type').skip(offset).limit(limit).exec(function (err,articles) {
            if(err){
                res.json(err);
            }else{
                //如果查找的文章长度小于limit，说明已经找完所有数据了，此时返回hasMore为false，提示前端没有更多数据了；
                if(articles.length<limit){
                    res.json({hasMore:false,articles});
                }else{
                    res.json({hasMore:true,articles});
                }
            }
        })
    }
});

//点赞 post 前端传递文章数据，后台找到此文章，让like+1，成功返回修改后的文章 失败返回{err:错误信息}
//$int:指定元素加或减；
app.post('/like',function (req,res) {
    let article = req.body;
    Article.update({_id:article._id},{$inc:{like:1}}).then(()=>{
        Article.findOne({_id:article._id}).then((doc)=>{

            //找到点赞的文章，将其外键放入到用户的数据库中
            //let currentUser = req.session.user;
            //User.update({username:currentUser.username},{$push:{like:doc._id}});

            res.json(doc);
        })
    }).catch(e=>{
        console.log(e);
        res.json({err:e})
    })
});


//获取某一篇文章
/*app.get('/article/:id',function (req,res) {
    let {id} = req.params;
    Article.findOne({order:id}).populate('type').exec(function (err,article) {
        if(err){
            res.json(err);
        }else{
            res.json(article);
        }
    })
});*/

//发表文章
app.post('/publish',function (req,res) {
    let article = req.body;
    article.author = req.session.user.username;
    Article.find({}).sort({order:-1}).then(function (oldArticle) {
        article.order = oldArticle ? oldArticle.order+1:1;
        return Article.create(article);//此时article没有点赞等属性；
    }).then(function (doc) {
        res.json(doc);
    }).catch(function () {
        res.json({err:'发表文章失败'});
    });
});


//注册 post
/*
let multer = require('multer');
let update = multer({dest:'../upload'});

let crypto = require('crypto');
let md5 = (val) => crypto.createHash('md5').update(val).digest('hex');
app.post('/signup',update.single('avatar'),function (req,res) {
    let user = req.body;
    //用户头像路径（如果上传头像就用上传的头像，如果没传用默认头像）
    user.avatar = (req.file && `/${req.file.filename}`) || '/default.png';
    // user.like = null;
    // user.favorite = null;
    // user.publish = null;
    user.password = md5(user.password);
    User.findOne({username:user.username},function (err,user) {
        if(user){
            res.json({err:'此用户名已被注册，请重新选择用户名'});
        }else{
            User.create(user,function (err,doc) {
                if(doc){
                    req.session.user = doc;//注册成功后把用户存到session中
                    res.json(doc);
                }else{
                    res.json(err);
                }
            })
        }
    })
});

//登录
app.post('/login',function (req,res) {
    let {username,password} = req.body;
    password = md5(password);
    User.findOne({username,password},function (err,user) {
        if(user){
            //登录成功后 把用户存到session中
            req.session.user = user;
            res.json(user);
        }else{
            res.json({err:'用户名或密码错误，请重新输入'})
        }
    })
});


//验证用户是否登录
app.get('/auth',function (req,res) {
    if(req.session.user){
        res.json(req.session.user);
    }else{
        res.json({});
    }
    //检测用的代码：
    //res.json({username:'sdf'})
});
*/

//
//注册 post
let multer = require('multer');
let update = multer({dest:'../upload'});

let crypto = require('crypto');
let md5 = (val) => crypto.createHash('md5').update(val).digest('hex');
app.post('/signup',update.single('avatar'),function (req,res) {
    let user = req.body;
    //用户头像路径（如果上传头像就用上传的头像，如果没传用默认头像）
    user.avatar = (req.file && `/${req.file.filename}`) || '/default.png';
    // user.like = null;
    // user.favorite = null;
    // user.publish = null;
    user.password = md5(user.password);
    User.findOne({username:user.username},function (err,doc) {
        if(doc){
            res.json({err:'此用户名已被注册，请重新选择用户名'});
        }else{
            User.create(user,function (err,doc) {
                if(doc){
                    req.session.user = doc;//注册成功后把用户存到session中
                    res.json(doc);
                }else{
                    res.json(err);
                }
            })
        }
    })
});

//登录
app.post('/login',function (req,res) {
    let {username,password} = req.body;
    password = md5(password);
    User.findOne({username,password},function (err,user) {
        if(user){
            //登录成功后 把用户存到session中
            req.session.user = user;
            res.json(user);
        }else{
            res.json({err:'用户名或密码错误，请重新输入'})
        }
    })
});

//验证用户是否登录
app.get('/auth',function (req,res) {
    if(req.session.user){
        res.json(req.session.user);
    }else{
        res.json({});
    }
});

//修改用户信息
app.post('/modify',function (req,res) {
    let user = req.body;
    console.log(req.body);
});



app.listen(3000);
