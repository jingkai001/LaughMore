/**
 * Created by Administrator on 2017/8/24.
 */
import {post,get} from './index';
let url='http://localhost:3000';
//注册接口
export const regs=(userInfo)=>{
    return post(url+'/signup',userInfo)
}

//验证是否登录

export const auths=()=>{
    return get(url+'/auth')
}


//登录接口
export const logins=(userInfo)=>{
    return post(url+'/login',userInfo)
}
//修改资料
export const edits=(userInfo)=>{
    return post(url+'/modify',userInfo)
}