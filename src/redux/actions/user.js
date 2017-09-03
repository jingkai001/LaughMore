import * as types from '../action-types';
import {regs, auths, logins,edits,logouts} from '../../api/user';

import util from '../../common/util'

import {push,goBack} from 'react-router-redux';

export const reg = (userInfo) => (dispatch) => {

    regs(userInfo).then(data => {
        if (data.err) {
            dispatch({
                type: types.SET_USER_ERROR,
                error:data.err
            })
        }else{
            util.set('user',data);
            dispatch({
                type:types.SET_USER_INFO,
                userInfo:data
            });
            dispatch(push('/'))
        }
    })
};


//登录
export const login = (userInfo) => (dispatch) => {
    logins(userInfo).then(data => {
        if (data.err) {
            dispatch({
                type:types.SET_USER_ERROR,
                error:data.err
            })
        } else {

            util.set('user', data);
            dispatch({
                type: types.SET_USER_INFO,
                userInfo: data

            });
            dispatch(goBack());
        }
    })
};
//个人主页验证登录
export const auth=()=>(dispatch)=>{
    auths().then(data=>{
        console.log('ok')
        if(data.username){
            util.set('user',data);
            dispatch({
                type:types.SET_USER_INFO,
                userInfo:data
            })
        }
    })
};

//登录页验证登录
export const validate=()=>(dispatch)=>{
    auths().then(data=>{
        if(data.username){
            util.set('user',data);
            dispatch({
                type:types.SET_USER_INFO,
                userInfo:data
            });
            dispatch(push('/'))
        }
    })
};

//清空错误信息
export const clear=()=>{
    return{
        type:types.CLEAR_USER_ERROR
    }
};

//退出登录，清除用户信息
export const logout = ()=>(dispatch)=>{
    logouts().then(data=>{
        if(data.code==1){
            util.set('user','');
            dispatch({
                type:types.DEL_USER_INFO,
                userInfo:{}
            })
        }
    })
};


//修改个人资料
export const edit=(userInfo)=>(dispatch)=>{
    edits(userInfo).then(data=>{
        if(data.username){
            dispatch({
                type:types.SET_USER_INFO,
                userInfo:data
            })
            dispatch(push('/profile'))
        }
    })
}

export default {
    login,
    reg,
    auth,
    validate,
    clear,
    edit,
    logout,
};
