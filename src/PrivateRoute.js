import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom'
import util from './common/util'

export default class PrivateRoute extends Component {
    render() {
        let {component: Profile, ...rest} = this.props;
        return (
            //登陆了跳到个人页，没登录去往登录页
            <Route {...rest} render={props => {
                return util.get('user').username ? <Profile {...props}/> : <Redirect to="/login"/>
            }}/>
        )
    }

}
