import React from 'react';
import Style from './index.css';

const Sidebar = () => (
    <div className={Style['side-bar']}>
        <div className={Style['beyond-logo']}></div>
        <a href="http://www.xheldon.com" className={Style['logo']} alt="点我, 你是不是喜欢我?" title="点我, 你是不是喜欢我?">
            <img src="http://img.xheldon.com/img/logo_min.png" alt="点我, 你是不是喜欢我?" />
        </a>
    </div>
);

export default Sidebar;
