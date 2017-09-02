import React, {Component} from 'react';
import {Route,Redirect} from 'react-router-dom'
import util from './common/util'

export default class EditRoute extends Component {
    render() {
        let {component: Edit, ...rest} = this.props;
        return (
            <Route {...rest} render={(props)=>{
                return util.get('user').username?<Edit {...props}/>:<Redirect to="/login"/>
            }}/>
        )
    }

}