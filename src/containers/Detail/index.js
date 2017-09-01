import React,{Component} from 'react';
import MHeader from '../../components/MHeader/index';
import * as userAction from '../../redux/actions/user';
import * as homeAction from '../../redux/actions/home';
import * as detailAction from '../../redux/actions/detail';

import {connect} from 'react-redux';

class Detail extends Component{
    constructor(){
        super();
        this.state={flag:false}
    }

    //home中组件卸载时，重置redux中的article，所以此组件每篇文章都得重新获取；
    componentDidMount(){
        let reg=/\/detail\/(\w+)/;
        let pathname = this.props.location.pathname;
        let id = reg.exec(pathname)[1];
        this.props.getOneArticle(id);
    }

    componentWillUnmount(){
        this.props.resetDetail();
    }

    //点击写留言
    clickWriteComment = ()=>{
        if(sessionStorage.getItem('user')){
            this.setState({flag:true});
        }else{
            this.props.history.push('/login');
        }
    };

    //点击提交评论
    submitComment = ()=>{

        let comment = this.refs.comment.value;
        let id = this.props.detail.article._id;
        //comment为字符串，调用封装好的post方法时，fetch的body属性对应的传递的数据使用了JSON.stringify方法，所以此处传一个对象，不能直接传字符串；
        this.props.publishComment(id,{comment:comment});
        this.setState({flag:false});
    };

    //点击删除评论
    delComment = (commentId)=>{
        let id = this.props.detail.article._id;
        this.props.delComment(id,{commentId:commentId});
    };

    render(){
        let {title,createAt,author,image,type,text} = this.props.detail.article;
        let comments = this.props.detail.comments;
        let hasMore = this.props.detail.hasMore;
        let username = this.props.user.userInfo.username;
        //截取月日 时分；
        createAt?createAt = createAt.substring(5,10)+' '+createAt.substring(11,16):createAt;
        return (
            <div>
                <MHeader title="逗你笑"/>
                <div className="detail">
                    <h3 className="title">{title}</h3>
                    <div className="article">
                        <span className="createAt">{createAt}</span>
                        <span className="author">作者：{author}</span>
                    </div>
                    <img src={image} alt=""/>
                    <p className="article-content">{text}</p>
                    <div className="comment">评论
                        <span onClick={this.clickWriteComment}>写留言</span>
                    </div>
                    {comments.map((item,index)=>(
                        <div className="comment-content" key={index}>
                            <p>{item.user}</p>
                            <div>{item.content}</div>
                            {item.user==username?<div className="del-comment" onClick={()=>this.delComment(item._id)}>删除</div>:null}
                        </div>
                    ))}
                    {hasMore?<div className="loadMore" onClick={this.props.loadMore}>加载更多</div>:null}
                </div>

                {this.state.flag?<div className="publish-comment">
                        <p>{title}</p>
                        <div>
                            <textarea cols="30" rows="10" placeholder="请输入评论内容" ref="comment" required></textarea>
                        </div>
                        <div className="submit-comment" onClick={this.submitComment}>提交评论</div>
                    </div> : null}
            </div>
        )
    }
}

export default connect(state=>({...state}),{...userAction,...homeAction,...detailAction})(Detail);

import './index.less';