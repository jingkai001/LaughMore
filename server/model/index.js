let mongoose = require('mongoose');

mongoose.Promise = Promise;

let ObjectId=mongoose.Schema.Types.ObjectId;

let conn = mongoose.createConnection('mongodb://localhost:27017/laughmore');

let UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    avatar:String,
    like:{type:Array,default:[]},
    favorite:{type:Array,default:[]},
    publish:{type:Array,default:[]},
    email:{type:String,default:''},
    birthday:{type:String,default:''},
    sex:{type:String,default:'男'},
});

exports.User = conn.model('User',UserSchema);

let ArticlesSchema = new mongoose.Schema({
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
});

exports.Article = conn.model('Article',ArticlesSchema);


let TypeSchema = new mongoose.Schema({
    name:String,
});
exports.Type = conn.model('Type',TypeSchema);




























