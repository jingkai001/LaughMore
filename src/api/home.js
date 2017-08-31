import {get,post} from './index';

let url = 'http://localhost:3000';

//获取分类
export const getTypes = ()=>get(url+'/type');

//获取轮播图
export const getFocuses = ()=>get(url+'/focus');

//获取首页的内容列表
export const getArticles = (typeid,offset,limit)=>get(url+`/article/${typeid}/${offset}/${limit}`);

//点赞
export const clickLikes = (article)=>post(url+'/like',article);
