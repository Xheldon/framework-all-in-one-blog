import React from 'react';
import Headerbar from './components/header.jsx';
import Sidebar from './components/sidebar.jsx';
import Routerview from './router.jsx';

// App 节点只能作为 #mount 的子节点存在,
// 而不是像 Vue一样直接替换 #mount 元素
// 也不像 Angular 一样有 replace: true 可选,
// 又因为只能返回 唯一的 wrapper 元素, 因此不想在 #mount 元素下再多出来一级 div 的话,
// 只能使用如下返回数组的形式,
// 或者下面的形式(两者等价)
// 用数组的话, 又得手动增加 key
// just like a zz.
// export default class App extends React.Component {
//     render () {
//         return[
//                 <Headerbar />,
//                 <div id="content">
//                     <Sidebar/>
//                     <Routerview/>
//                 </div>
//             ];
//     }
// };
const App = () => [
        <Headerbar key="headerbar" />,
        <div key="content" id="content">
            <Sidebar/>
            <Routerview />
        </div>
    ];
export default App;
