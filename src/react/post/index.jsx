import React from 'react';
import fileListObj from '../../common/md/post-list';

export default class Post extends React.Component {
    constructor (prop) {
        super(prop);
        this.state = {
            md: ''
        };
        let that = this;
        let name = fileListObj[Object.keys(fileListObj)[4]];
        require([`src/common/md/${name[3]}`], function (html) {
            that.setState({
                md: html
            });
        });

        // 如下写法也可以, 前提是把上面的 let fileListObject 注掉, 但是会产生两个 chunkFile (因为两个异步 require 呗)
        /*require(['../../common/md/post-list.js'], function (list) {
            let name = list[Object.keys(list)[4]];
            console.log(name);
            require(['src/common/md/' + name[3]], function (html) {
                that.setState({
                    md: html
                });
            });
        });*/
    }
    render () {
        return (
            <div dangerouslySetInnerHTML={{__html: this.state.md}}></div>
        );
    }
};
