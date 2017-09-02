import React from 'react';
import {render} from 'react-dom';
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Wrap from "./containers/Wrap";
import Home from "./containers/Home/index";
import Profile from "./containers/Profile/index";
import Login from './containers/Login/index';
import Reg from './containers/Reg/index';
import PrivateRoute from "./PrivateRoute";

import store from './redux/store';
window._store = store;

import {Provider} from 'react-redux';

import {ConnectedRouter} from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import Edit from "./containers/Edit/index";
import EditRoute from "./EditRoute";
let history = createHistory();
render(<Provider store={store}>
    <ConnectedRouter history={history}>
        <Wrap>
            <Switch>

                <Route exact path="/" component={Home}/>
                <Route path="/home" component={Home}/>
                <PrivateRoute path="/profile" component={Profile}/>
                <Route path="/login" component={Login}/>
                <Route path="/reg" component={Reg}/>
                <EditRoute path="/edit" component={Edit}/>

                {/*<Route path={'/publish'} render={(props) => <Publish {...props} title="发表文章"/>}/>*/}
            </Switch>
        </Wrap>
    </ConnectedRouter>
</Provider>, document.querySelector('#root'));

