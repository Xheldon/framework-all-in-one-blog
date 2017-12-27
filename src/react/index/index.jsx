import React from 'react';
import { Link } from 'react-router-dom';
import Style from './index.css';
import fileListObj from '../../common/md/post-list';

export default class Index extends React.Component {
    render () {
        return (
            <div>
                <ul className={Style.ul}>
                    {Object.keys(fileListObj).map((name, key) => {
                        if (fileListObj[name][0] === 'post') {
                            return (<li key={key}>{key+1}. <Link to={`/${name}`}>{fileListObj[name][1]}</Link>  » <i><span>{fileListObj[name][2]}</span></i></li>);
                        }
                    })}
                </ul>
            </div>
        )
    };
};
