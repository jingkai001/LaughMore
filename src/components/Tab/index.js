import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import './index.less';
import {connect} from 'react-redux';
import * as action from '../../redux/actions/home';

class Tab extends Component {

    handleClick = () => {
        this.props.resetHome();
        this.props.setFlagFalse();
        this.props.getArticle();
    };

    render() {
        return (

            <nav className="footer">
                <NavLink to="/" activeClassName="selected" onClick={this.handleClick} exact>
                    <i className="iconfont icon-shouye"></i>
                </NavLink>
                <NavLink to="/publish" activeClassName="selected">
                    <i className="iconfont icon-icon19"></i>
                </NavLink>
                <NavLink to="/profile" activeClassName="selected">
                    <i className="iconfont icon-geren-"></i>
                </NavLink>
            </nav>
        )
    }
}

export default connect(state => ({...state}), action)(Tab)

