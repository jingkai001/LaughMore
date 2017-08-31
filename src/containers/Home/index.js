import React, {Component} from 'react';
import HomeHeader from "../../components/HomeHeader/index";
import {NavLink, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as action from '../../redux/actions/home';
import Focus from "../../components/Focus/index";
import ScrollList from "../../components/ScrollList/index";


class Home extends Component {

    changeType = (id) => {
        this.props.changeType(id);
        this.props.getArticle();
    };

    loadMore = () => {
        this.props.getArticle();
    };

    clickLike = (item)=>{
        this.props.clickLike(item);
    };

    componentDidMount() {

        if (this.props.home.article.articleList.length > 0) {
            this.forceUpdate();
        }

        if (this.props.home.category.length === 0) {
            this.props.getType();
            this.props.getFocus();
            this.props.getArticle();
        }

        /*if(this.props.home.article.articleList.length===0){

         }*/
    }

    //组件卸载时，重置store中的文章数据；
    componentWillUnmount() {
        this.props.resetHome();
    }

    render() {
        let {articleList, hasMore, isLoading} = this.props.home.article;
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
                                        <div className="article-top">
                                            <img src={item.image}/>
                                            <div className="article-right">
                                                <h2>{item.title}</h2>
                                                <p>{item.text}</p>
                                            </div>
                                        </div>
                                        <div className="article-bottom">
                                            <i className="glyphicon glyphicon-tags tag">{item.type.name}</i>
                                            <div className="article-bottom-right">
                                                <i className="glyphicon glyphicon-thumbs-up" onClick={()=>this.clickLike(item)}>{item.like}</i>
                                                <i className="glyphicon glyphicon-heart"></i>
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



















