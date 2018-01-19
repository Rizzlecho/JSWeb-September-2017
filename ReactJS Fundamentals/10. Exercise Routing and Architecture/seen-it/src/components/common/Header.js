import React from 'react';
import {Link} from 'react-router-dom'

let Header = () => {
    return (
        <header>
            <span className="logo">☃</span><span className="header">SeenIt</span>
            {localStorage.getItem('username') !== null ?
                <div id="profile">
                    <span>{localStorage.getItem('username')}</span>|<Link onClick={() => {
                    localStorage.clear();
                    window.location.replace('/');
                }} to="/logout">logout</Link>
                </div>
                :
                <div id="profile" style={{"display": 'none'}}/>}
        </header>
    )
};

export default Header;