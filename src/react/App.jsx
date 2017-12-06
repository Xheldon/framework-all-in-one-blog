import React from 'react';

export default class App extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            content: "Xhedon"
        }
    }

    render () {
        return (<div>{this.state.content}</div>);
    }
}