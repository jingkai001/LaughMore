import React,{Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../redux/actions/user';
import './index.less'
import {Link} from 'react-router-dom'

class Profile extends Component{
    componentWillMount(){
        this.props.auth()
    }
    render(){
        return (
            <div className="profile">
                <div className="m-header">
                    我的
                </div>
                <div className="profile-header">
                    {this.props.user.userInfo.avatar?<div><img src={this.props.user.userInfo.avatar} alt=""/></div>:<div><img src="" alt=""/></div>}
                    <span>{this.props.user.userInfo.username}</span>
                    {/*<i className="iconfont icon-shezhi">修改资料</i>*/}
                    <Link to="/edit"><i className="iconfont icon-shezhi">修改资料</i></Link>
                </div>
                <div className="profile-body">
                    <div className="profile-body-item">
                        <i className="iconfont icon-17"></i>
                        <span>发表</span>
                        <i className="iconfont icon-right"></i>
                    </div>
                    <div className="profile-body-item">
                        <i className="iconfont icon-shoucang"></i>
                        <span>收藏</span>
                        <i className="iconfont icon-right"></i>
                    </div>
                    <div className="profile-body-item">
                        <i className="iconfont icon-zan2"></i>
                        <span>点赞</span>
                        <i className="iconfont icon-right"></i>
                    </div>


                </div>
            </div>
        )
    }

}
export default connect(state=>state,actions)(Profile)
