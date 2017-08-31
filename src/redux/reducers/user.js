import * as types from '../action-types';
let initState={
    userInfo:{},
    err:''
};
export default function (state = initState, action) {
    switch (action.type){
        case types.SET_USER_INFO:
            console.log(action.userInfo);
            return {...state,userInfo:action.userInfo,err:''};
        case types.SET_USER_ERROR:
            return {...state,err:action.error};
        case types.CLEAR_USER_ERROR:
            return {...state,err:''};
        default:
            return state;
    }
}
