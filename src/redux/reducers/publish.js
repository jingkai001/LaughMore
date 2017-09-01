import * as types from '../action-types';
import * as action from '../actions/publish';

let initState = {
    article:{}
};
export default function (state=initState,action) {
    switch (action.type){
        case types.SET_UPLOAD_IMG:
            return {
                ...state,
                article:action.article,
            };
        case types.SET_PUBLISH_ARTICLE:
            return {
                ...state,
                article:action.doc,
            }
    }
    return state;
}
