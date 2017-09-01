import * as types from '../action-types';
import {publishArticles} from '../../api/publish';
import {push} from 'react-router-redux';

//上传图片后，保存未写完的文章信息到redux；
export const savePublishImg = (article)=>{
    return {
        type:types.SET_UPLOAD_IMG,
        article,
    }
};


//
export const publishArticle = (article)=>(dispatch)=>{
    publishArticles(article).then(function (doc) {
        dispatch({
            type:types.SET_PUBLISH_ARTICLE,
            doc,
        });
        console.log(doc);
        push('/detail/'+doc._id);
    })
};