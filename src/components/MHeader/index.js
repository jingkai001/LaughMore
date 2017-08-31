import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import './index.less'
class MHeader extends Component {
    render() {
        return (
            <div className="m-header">
                <i className="iconfont icon-fanhui1 pull-left" onClick={()=>this.props.history.goBack()}></i>
                {this.props.title}
            </div>
        )
    }

}
export default withRouter(MHeader)//在当前组件上增加history属性