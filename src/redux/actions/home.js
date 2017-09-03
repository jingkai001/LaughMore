import * as types from '../action-types';
import {getTypes,
    getFocuses,
    getArticles,
    clickLikes,
    cancelLikes,
    clickFavorites,
    cancelFavorites,
    getSearchInfos,} from '../../api/home';

import {auths} from '../../api/user';
import {push} from 'react-router-redux';


//获取分类列表
export const getType = () =>(dispatch)=>{
    getTypes().then(category=>{
        dispatch({
            type:types.GET_TYPE,
            category,
        })
    })
};

//获取轮播图数据
export const getFocus = ()=>(dispatch)=>{
    getFocuses().then(focus=>{
        dispatch({
            type:types.GET_FOCUS,
            focus,
        })
    })
};

//改变首页显示文章类型
export const changeType = (id)=>{
    return {
        type:types.CHANGE_TYPE,
        category:id,
    }
};

//获取首页文章列表 data:{hasMore:false,articles:[]}
export const getArticle = ()=>(dispatch,getState)=>{
    let currentType = getState().home.currentType;
    let {hasMore,offset,limit} = getState().home.article;

    if(!hasMore) return;

    dispatch({type:types.SET_LOADING_STATUS});

    getArticles(currentType,offset,limit).then(data=>{
        dispatch({
            type:types.GET_ALL_ARTICLES,
            data,
        })
    })
};

//初始化首页
export const resetHome = ()=>{
    return {
        type:types.RESET_HOME,
    }
};

//点赞
export const clickLike = (article)=>(dispatch)=>{
    auths().then(data=>{
        if(data.username){
            clickLikes(article).then(data=>{
                dispatch({
                    type:types.CLICK_LIKE,
                    like:data.doc.like,
                    _id:data.doc._id,
                });
                dispatch({
                    type:types.SET_USER_INFO,
                    userInfo:data.user,
                })
            })
        }else{
            dispatch(push('/login'));
        }
    })
};

//取消点赞
export const cancelLike = (article) =>(dispatch)=>{
    cancelLikes(article).then(data=>{
        dispatch({
            type:types.CANCEL_LIKE,
            like:data.doc.like,
            _id:data.doc._id,
        });
        dispatch({
            type:types.SET_USER_INFO,
            userInfo:data.user,
        });
    });
};

//收藏功能
export const clickFavorite = (article)=>(dispatch)=>{
    clickFavorites(article).then(user=>{
        dispatch({
            type:types.SET_USER_INFO,
            userInfo:user,
        });
    })
};

//取消收藏
export const cancelFavorite = (article)=>(dispatch)=>{
    cancelFavorites(article).then(user=>{
        dispatch({
            type:types.SET_USER_INFO,
            userInfo:user,
        })
    })
};

//搜索
export const getSearchInfo = (val)=>(dispatch,getState)=>{
    let {limit} = getState().home.article;
    //点搜索时，offset永远从0开始；
    let offset = 0;
    //if(!hasMore) return;
    dispatch({type:types.SET_LOADING_STATUS});
    getSearchInfos(val,offset,limit).then(data=>{
        dispatch({
            type:types.GET_SEARCH_INFO,
            data,
        })
    })
};



//解决首页bug
export const setFlagTrue = ()=>{
    return {
        type:types.SET_FLAG_TRUE,
    }
};

export const setFlagFalse = ()=>{
    return {
        type:types.SET_FLAG_FALSE,
    }
}
