import React, {Component} from 'react';
import MHeader from "../../components/MHeader/index";
import './index.less'
import {
    Link
} from 'react-router-dom'

import {connect} from 'react-redux'
import actions from '../../redux/actions/user'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    componentWillMount() {
        this.props.validate()
        this.props.clear()
    }

    login = () => {
        let {username, password} = this.state;
        if (username && password) {
            this.props.login({username, password})
        }
    }


    render() {
        return (
            <div className="login-content">
                <MHeader title="登录啊笨"/>
                <div className="login">
                    <form>
                        <div className="form-group">
                            <label htmlFor="username" className="login-font">账户名称</label>
                            <input type="text" className="form-control" id="username" placeholder="请输入用户名..."
                                   value={this.state.username} onChange={e => {
                                this.setState({username: e.target.value})
                            }}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="login-font">账户密码</label>
                            <input type="text" className="form-control" id="password" placeholder="请输入密码..."
                                   value={this.state.password} onChange={e => {
                                this.setState({password: e.target.value})
                            }}/>
                        </div>
                        <div className="form-group">
                            <div className="error">{this.props.user.err}</div>
                            <button className="btn btn-success btn-block" onClick={this.login}>登录</button>
                        </div>
                    </form>
                    <ul>
                        <li className="col-md-6"><Link to="/reg">立即注册</Link></li>
                        <li className="col-md-6" to="/reg"><Link to="/reg">忘记密码</Link></li>
                    </ul>
                    <div className="sociality">
                        <p></p>
                        <span>社交账号登录</span>
                        <p></p>
                    </div>
                    <div className="icons">
                        <i className="iconfont icon-qq"></i>
                        <i className="iconfont icon-wechat"></i>
                        <i className="iconfont icon-weibo"></i>
                    </div>
                </div>
            </div>
        )
    }

}

export default connect(state => ({...state}), actions)(Login)