import reducers from './reducers';

//redux 中间件 compose用于连接谷歌redux插件
import {createStore,applyMiddleware,compose} from 'redux';
import reduxThunk from 'redux-thunk';

//router-redux 连接redux, 可以在redux中间件中派发路由
import {routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createHashHistory';
let history = createHistory();

//谷歌的插件
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//
let store=createStore(reducers,composeEnhancers(applyMiddleware(reduxThunk,routerMiddleware(history))));
export default store;