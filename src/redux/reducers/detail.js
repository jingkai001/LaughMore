import * as types from '../action-types';

let initState = {
    article:{},
    hasMore:true,
    isLoading:false,
    comments:[],
    offset:0,
};

export default function (state=initState,action) {
    switch(action.type){
        case types.GET_ONE_ARTICLE:
            let comments = action.detail.comments.reverse().slice(state.offset,state.offset+3);
            let flag = comments.length<3?false:true;
            return {
                ...state,
                article:{...action.detail},
                comments:comments,//每次获取3条评论
                offset:state.offset+comments.length,
                hasMore:flag,
            };
        case types.LOAD_MORE:
            comments = state.article.comments.slice(state.offset,state.offset+3);
            flag = comments.length<3?false:true;
            return {
                ...state,
                comments:[...state.comments,...comments],
                offset:state.offset+comments.length,
                hasMore:flag,
            };
        case types.RESET_DETAIL:
            return {
                article:{},
                hasMore:true,
                isLoading:false,
                comments:[],
                offset:0,
            };
        case types.PUBLISH_COMMENT:
            comments = action.article.comments.reverse().slice(state.offset,state.offset+3);
            flag = comments.length<3?false:true;
            return {
                ...state,
                article:{...action.article},
                comments:comments,//每次获取3条评论
                offset:state.offset+comments.length,
                hasMore:flag,
            };

    }
    return state;
}
