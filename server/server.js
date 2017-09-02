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
    if(req.method==="OPTIONS") res.sendStatus(200);
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
            let currentUser = req.session.user;
            User.update({username:currentUser.username},{$push:{like:doc._id}}).exec(function () {
                User.findOne({username:currentUser.username},function (err,user) {
                    res.json({doc,user});
                })
            });
        })
    }).catch(e=>{
        res.json({err:e})
    })
});

//取消点赞
app.post('/cancelLike',function (req,res) {
    let article = req.body;
    Article.update({_id:article._id},{$inc:{like:-1}}).then(()=>{
        Article.findOne({_id:article._id}).then((doc)=>{

            //找到点赞的文章，将其外键从用户的like数组中删除；
            let currentUser = req.session.user;
            User.update({username:currentUser.username},{$pull:{like:doc._id}}).exec(function () {
                User.findOne({username:currentUser.username},function (err,user) {
                    res.json({doc,user})
                })
            });
        })
    }).catch(e=>{
        res.json({err:e})
    })
});

//收藏
app.post('/favorite',function (req,res) {
    let article = req.body;
    let currentUser = req.session.user;
    User.update({username:currentUser.username},{$push:{favorite:article._id}}).exec(function (err,doc) {
        if(!err){
            User.findOne({username:currentUser.username},function (err,user) {
                res.json(user);
            })
        }else{
            res.json({err})
        }
    })
});

//取消收藏
app.post('/cancelfavorite',function (req,res) {
    let article = req.body;
    let currentUser = req.session.user;
    User.update({username:currentUser.username},{$pull:{favorite:article._id}}).exec(function (err,doc) {
        if(!err){
            User.findOne({username:currentUser.username},function (err,user) {
                res.json(user);
            })
        }else{
            res.json({err});
        }
    })
});

//获取某一篇文章
app.get('/detail/:id',function (req,res) {
    let {id} = req.params;
    Article.findOne({_id:id}).populate('type').exec(function (err,article) {
        if(err){
            res.json(err);
        }else{
            res.json(article);
        }
    })
});

//写评论
app.post('/comment/:id',function (req,res) {

    let {id} = req.params;

    let {comment} = req.body;
    let username = req.session.user.username;
    let comments = {user:username,content:comment};

    Article.update({_id:id},{$push:{comments:comments}},function (err,result) {
        if(err){
            res.json({err});
        }else{
            Article.findOne({_id:id}).populate('type').exec(function (err,article) {
                res.json(article);
            })
        }
    })
});

//删除评论
app.post('/delcomment/:id',function (req,res) {
    let {id} = req.params;
    let commentId = req.body.commentId;

    Article.update({_id:id},{$pull:{comments:{_id:commentId}}},function (err,result) {
        if(err){
            res.json(err);
        }else{
            Article.findOne({_id:id}).populate('type').exec(function (err,article) {
                res.json(article);
            });
        }
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


//注册 post
let multer = require('multer');
let update = multer({dest:'../upload'});

let crypto = require('crypto');
let md5 = (val) => crypto.createHash('md5').update(val).digest('hex');
app.post('/signup',update.single('avatar'),function (req,res) {
    let user = req.body;
    //用户头像路径（如果上传头像就用上传的头像，如果没传用默认头像）
    user.avatar = (req.file && `/upload/${req.file.filename}`) || '/upload/default.png';
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
    let user = req.session.user||{};
    let username = user.username;

    if(username){
        User.findOne({username},function (err,user) {
            res.json(user);
        });
    }else{
        res.json({});
    }
});

//修改用户信息 头像
app.post('/modifyavatar',update.single('avatar'),function (req,res) {
    let file = req.file;
    let avatar = '/upload/'+file.filename;
    let username = req.session.user.username;
    User.update({username},{avatar},function (err,user) {
        if(err){
            res.send({code:0});
        }else{
            res.send({code:1});
        }
    });
});

//修改用户信息
app.post('/modify',function (req,res) {
    let user = req.body;
    let username = req.session.user.username;
    // con
    console.log(username)
    User.update({username},user,function (err,result) {
        if(err){
            res.json({err});
        }else{
            User.findOne({username},function (e,user) {
                res.json(user);
            })
        }
    })
});


//退出登录
app.get('/logout',function (req,res) {
    if(req.session.user){
        req.session.user='';
        res.json({code:1,msg:'退出成功'});
    }else{
        res.json({code:0,msg:'退出失败'});
    }
});

//返回对应用户的点赞文章列表
app.get('/getlike',function (req,res) {
    let user = req.session.user||{};
    let username = user.username;

    User.findOne({username}).populate('like').exec(function (err,user) {

        res.json(user.like);
    })

});


//发表文章时上传图片,如果用户点上传图片的话，点了会立马发请求，接收到请求后就会创建一个新的文章，之后传过来的内容再加在此新建的文章中；
app.post('/publishimg',update.single('publishImg'),function (req,res) {
    let user = req.session.user||{};
    let username = user.username;
    let img = '/upload/'+req.file.filename;
    let article = {image:img};
    Article.find({},function (err,docs) {
        article.order = docs[docs.length-1].order+1;
        Article.create(article,function (err,doc) {
            User.update({username:username},{$push:{publish:doc._id}});
            res.json(doc);
        })
    });
});


//发表文章  如果用户点了上传图片，需要找上传图片时存到数据库中的文章，如果用户不点上传图片，则需要新建一个文章；
app.post('/publisharticle',function (req,res) {
    let article = req.body;
    let username = req.session.user.username;
    article.author = username;

    if(article._id){//有_id说明之前点了上传图片
        Type.findOne({name:article.type},function (err,type) {
            if(err){
                res.json({err});
            }else{
                article.type = type._id;
                Article.update({_id:article._id},article,function (err,result) {
                    if(err){
                        res.json({err});
                    }else{
                        Article.findOne({_id:article._id}).populate('type').exec((err,doc)=> {
                            res.json(doc);
                        })
                    }
                })
            }
        })
    }else{//没有_id说明之前没有穿图片，此时要新建；
        Article.find({},function (err,docs) {
            article.order = docs[docs.length-1].order+1;
            Article.create(article,function (err,doc) {
                User.update({username:username},{$push:{publish:doc._id}});
                res.json(doc);
            })
        });

    }
});


app.listen(3000);