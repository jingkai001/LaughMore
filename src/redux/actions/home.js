import * as types from '../action-types';
import {getTypes,getFocuses,getArticles,clickLikes} from '../../api/home';
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
            console.log(111);
            clickLikes(article).then(data=>{
                console.log(data);
                dispatch({
                    type:types.CLICK_LIKE,
                    like:data.like,
                    _id:data._id,
                })
            })
        }else{
            dispatch(push('/login'));
        }
    })
}


