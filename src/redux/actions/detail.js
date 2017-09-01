import * as types from '../action-types';
import {getOneArticles,publishComments,delComments} from '../../api/detail';

//获取某一篇文章
export const getOneArticle = (id)=>(dispatch)=>{
    getOneArticles(id).then(doc=>{
        dispatch({
            type:types.GET_ONE_ARTICLE,
            detail:doc,
        })
    })
};

//加载更多留言
export const loadMore = ()=>{
    return {
        type:types.LOAD_MORE,
    }
};

//重置detail
export const resetDetail=()=>{
    return {
        type:types.RESET_DETAIL,
    }
};

//发表评论
export const publishComment = (id,comment) =>(dispatch)=>{
    publishComments(id,comment).then(article=>{
        //点击发表评论后需要将redux中detail数据重置，因为派发PUBLISH_COMMENT的时候，用到offset等，如果不重置，offset会取之前的值；
        dispatch({
            type:types.RESET_DETAIL,
        });
        dispatch({
            type:types.PUBLISH_COMMENT,
            article,
        })
    })
};

//删除评论 跟发表评论所派发的action相同，都是向后台请求到数据，然后展示,所以还是用的types.PUBLISH_COMMENT，
export const delComment = (id,commentId)=>(dispatch)=>{
    delComments(id,commentId).then(article=>{
        dispatch({
            type:types.RESET_DETAIL,
        });
        dispatch({
            type:types.PUBLISH_COMMENT,
            article,
        })
    })
};










