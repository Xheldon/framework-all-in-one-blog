import { Route, Router, HashRouter, Switch, Redirect } from 'react-router-dom';
import React from 'react'
import Index from './index/index.jsx';
import Post from './post/index.jsx';

const Routerview = () => (
    <HashRouter>
        <Switch>
            {/* Route 的位置很重要 */}
            <Route exact path="/" component={ Index }/>
            <Route exact path="/:name" component={ Post }/>
            {/* 路由不匹配自动跳转这点好评, Vue 里面还要手动判断 */}
            <Redirect to="/"/>
        </Switch>
    </HashRouter>
);

export default Routerview;
