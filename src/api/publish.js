import {get,post} from './index';

let url = 'http://localhost:3000';
export const publishArticles = (article)=>post(url+'/publisharticle',article);
