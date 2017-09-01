import React, {Component} from 'react';
import HomeHeader from "../../components/HomeHeader/index";
import {NavLink, Route,Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as homeAction from '../../redux/actions/home';
import * as userAction from '../../redux/actions/user'
import Focus from "../../components/Focus/index";
import ScrollList from "../../components/ScrollList/index";

const action =Object.assign({},homeAction,userAction);


class Home extends Component {

    changeType = (id) => {
        this.props.changeType(id);
        this.props.getArticle();
    };

    loadMore = () => {
        this.props.getArticle();
    };

    //点赞功能：
    clickLike = (item)=>{
        let like = this.props.user.userInfo.like||[];
        like.find(likeId=>likeId==item._id) ? this.props.cancelLike(item) : this.props.clickLike(item);
    };

    //收藏功能：
    clickFavorite = (item)=>{
        if(sessionStorage.getItem('user')){
            let favorite = this.props.user.userInfo.favorite||[];
            favorite.some(id=>id==item._id) ? this.props.cancelFavorite(item) : this.props.clickFavorite(item);
        }else{
            this.props.history.push('/login');
        }
    };

    componentDidMount() {
        //验证是否登录
        this.props.auth();

        if (this.props.home.article.articleList.length > 0) {
            this.forceUpdate();
        }

        if (this.props.home.category.length === 0) {
            this.props.getType();
            this.props.getFocus();
            this.props.getArticle();
        }
        // if(this.props.home.article.articleList.length==0){
        //     this.props.getArticle();
        // }

    }

    //组件卸载时，重置store中的文章数据；
    componentWillUnmount() {
        this.props.resetHome();
    }

    render() {
        let {articleList, hasMore, isLoading} = this.props.home.article;
        let userInfo = this.props.user.userInfo;
        let like = this.props.user.userInfo.like||[];
        let favorite = this.props.user.userInfo.favorite||[];

        // console.log(like.some(likeId=>likeId==''))
        return (
            <div className="content">
                <HomeHeader/>
                <ul className="home-nav">
                    {this.props.home.category.map((item, index) => (
                        <li key={index}><a onClick={() => this.changeType(item._id)}>{item.name}</a></li>
                    ))}
                </ul>
                <div className="content-body-wrap" ref="scroll">
                    <ScrollList isLoading={isLoading}
                                element={this.refs.scroll}
                                hasMore={hasMore}
                                loadMore={this.loadMore}>
                        <Focus data={this.props.home.focus}/>
                        <ul className="content-body">
                            {
                                articleList.map((item, index) => (

                                    <li className="article-item" key={index}>
                                        <Link to={'/detail/'+item._id}>
                                        <div className="article-top">
                                            <img src={item.image}/>
                                            <div className="article-right">
                                                <h2>{item.title}</h2>
                                                <p>{item.text}</p>
                                            </div>
                                        </div>
                                        </Link>
                                        <div className="article-bottom">
                                            <i className="glyphicon glyphicon-tags tag">{item.type.name}</i>
                                            <div className="article-bottom-right">
                                                <i className={like.some(likeId=>likeId==item._id)?"glyphicon glyphicon-thumbs-up mark":"glyphicon glyphicon-thumbs-up"} onClick={()=>this.clickLike(item)}>{item.like}</i>
                                                <i className={favorite.some(id=>id==item._id)?"glyphicon glyphicon-heart mark":"glyphicon glyphicon-heart"} onClick={()=>this.clickFavorite(item)}></i>
                                                <i className="glyphicon glyphicon-comment">{item.comments.length}</i>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>

                    </ScrollList>
                </div>
            </div>
        )
    }
}

export default connect(state => ({...state}), action)(Home);
import './index.less'



















