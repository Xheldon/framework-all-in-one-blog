import React from 'react';
import ReactDom from 'react-dom';
import App from './layout/index.jsx';

const render = (App) => {
    ReactDom.render(
        <App />,
        document.getElementById('mount')
    );
};

render(App);
