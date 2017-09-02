import React, {Component} from 'react';
import MHeader from '../../components/MHeader'
import './index.less'
import {connect} from 'react-redux'
import actions from '../../redux/actions/user'
class Reg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLike: true
        }
    }
    componentWillMount(){
        this.props.clear()
    }
    reg = () => {
        if (!this.state.isLike) return;
        let {username,password} = {username: this.username.value, password: this.password.value};
        if(username&&password){
            this.props.reg({username,password});
        }
    }
    test = () => {
        let password = this.password.value, passwordAgain = this.passwordAgain.value;
        password == passwordAgain ? this.setState({isLike: true}) : this.setState({isLike: false})
    }
    up=()=>{
        this.props.user.err='';
        this.forceUpdate();
    }

    render() {
        return (
            <div className="reg-content">
                <MHeader title="注册呀笨"/>
                <div className="reg">
                    <form>
                        <div className="form-group">
                            <label htmlFor="username" className="reg-font">起个名字吧</label>
                            <input type="text" className="form-control" id="username" placeholder="请输入..."
                                   ref={(ele) => {
                                       this.username = ele
                                   }} onChange={this.up}/>
                            {this.props.user.err ? <div className="test">{this.props.user.err}</div> : ''}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="reg-font">想个密码</label>
                            <input type="text" className="form-control" id="password" placeholder="请输入..."
                                   ref={(ele) => {
                                       this.password = ele
                                   }} onChange={this.test}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="reg-font">再输一次密码</label>
                            <input type="text" className="form-control" id="password" placeholder="请输入..." ref={ele => {
                                this.passwordAgain = ele
                            }} onChange={this.test}/>
                            {!this.state.isLike ? <div className="test">两次密码不一样</div> : ''}
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success btn-block" onClick={this.reg}>注册</button>
                        </div>
                    </form>
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

export default connect(state => state, actions)(Reg)
