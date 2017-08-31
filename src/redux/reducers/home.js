import * as types from '../action-types';

let initState = {
    currentType: "0",
    focus: [],
    article: {
        articleList: [],
        offset: 0,
        limit: 5,
        hasMore: true,
        isLoading: false,
    },
    category: [],
};

export default function (state = initState, action) {
    switch (action.type) {
        case types.GET_TYPE:
            return {
                ...state,
                category: action.category,
            };
        case types.GET_FOCUS:
            return {
                ...state,
                focus: action.focus,
            };
        case types.CHANGE_TYPE:
            return {
                ...state,
                currentType: action.category,
                article:{
                    ...state.article,
                    offset:0,
                    articleList:[],
                    hasMore:true,
                }
            };
        case types.GET_ALL_ARTICLES:
            return {
                ...state,
                article: {
                    ...state.article,
                    articleList: [...state.article.articleList, ...action.data.articles],
                    //articleList:[...action.data.articles],
                    offset: state.article.offset + action.data.articles.length,
                    hasMore: action.data.hasMore,
                    isLoading: false,
                }
            };
        case types.SET_LOADING_STATUS:
            return {
                ...state,
                article: {
                    ...state.article,
                    isLoading: true,
                }
            };
        case types.RESET_HOME:
            return {
                ...state,
                currentType:'0',
                article:{
                    ...state.article,
                    offset:0,
                    articleList:[],
                    hasMore:true,
                }
            };
        case types.CLICK_LIKE:
            let articleList = state.article.articleList;
            let newArticleList = articleList.filter(item=>{
                console.log(action);
                console.log(item._id,action._id);
                if(item._id==action._id){
                    item.like=action.like;
                    console.log(item);
                    return item;
                }
                return item;
            });
            return {
                ...state,
                article:{
                    ...state.article,
                    articleList:newArticleList,
                }
            }

    }
    return state;
}

