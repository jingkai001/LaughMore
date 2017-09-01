import {get,post} from './index';

let url = 'http://localhost:3000';

//获取某一篇文章；
export const getOneArticles = (id)=>get(url+'/detail/'+id);

//发表评论
export const publishComments = (id,comment)=>post(url+'/comment/'+id,comment);

//删除评论
export const delComments = (id,commentId)=>post(url+'/delcomment/'+id,commentId);




