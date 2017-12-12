import { Route, Router, HashRouter, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import React from 'react'
import Index from '../index/index.jsx';
import Post from '../post/index.jsx';
import Style from './index.css';

const Routerview = () => (
    /*HashRouter Hash history 不支持 location.key 和 location.state ,该组件可以比较好的用来支持旧版浏览器(hash 模拟前进后退)*/
    /*BrowserRouter 使用了 HTML5 history API 的高阶路由组件, 目前还没掌握, 貌似需要跟服务器配合*/
    <div className={Style['router-view']}>
        <HashRouter>
            <Switch>{/*Switch表示只匹配其下的一个路由*/}
                {/*exact 表示精确匹配, 因此Route 的位置很重要 */}
                <Route exact path="/" component={ Index }/>
                <Route exact path="/:name" component={ Post }></Route>
                {/* 路由不匹配自动跳转这点好评, Vue 里面还要手动判断 */}
                <Redirect to="/"/>
            </Switch>
        </HashRouter>
    </div>
);

export default Routerview;
