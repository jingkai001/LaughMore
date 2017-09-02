import React,{Component} from 'react';
export default class HomeHeader extends Component{
    constructor(){
        super();
        this.state={flag:true}
    }
    handleChange=()=>{
        this.setState({flag:!this.state.flag});
        this.props.reLoad();
    };

    submitSearchInfo = (e)=>{
        this.props.search(this.refs.input.value);
    };

    render(){
        return (
            <div className="header">
                {
                    this.state.flag?
                        <div className="navbar navbar-default navone">
                            <img src="src/images/logo.png"  className="img-responsive col-xs-4" alt="Responsive image"/>
                            <p className="col-xs-4 title">逗你笑</p>
                            <span onClick={this.handleChange} className="col-xs-4 text-right glyphicon glyphicon-search "></span>
                        </div>:<div className="navbar navbar-default">
                        <span onClick={this.handleChange} className="glyphicon glyphicon-menu-left col-xs-1"></span>
                        <input type="text" placeholder="搜索" className=" col-xs-8 icon" ref="input" required/>
                        <button className="btn btn-default col-xs-2 pull-right" type="button" onClick={this.submitSearchInfo}>Go!</button>

                    </div>
                }
            </div>
        )
    }
}
import './index.less'

