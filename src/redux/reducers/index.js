import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import home from './home';
import user from './user';
import detail from './detail';
import publish from './publish';

export default combineReducers({
    home,
    user,
    detail,
    publish,
    router:routerReducer
})