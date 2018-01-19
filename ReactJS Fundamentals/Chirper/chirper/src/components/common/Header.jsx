import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {

    render() {
        const { loggedIn, onLogout } = this.props;



        return (<div>
                <header><span>Chirper</span></header>
                <div className="menu">
                    <NavLink exact to="/" activeClassName="active">Home</NavLink>
                    {loggedIn &&<NavLink exact to="/" activeClassName="active">Discover</NavLink>}
                    {loggedIn &&<NavLink exact to="/me" activeClassName="active">Me</NavLink>}
                    {loggedIn && <a href="javascript:void(0)" onClick={onLogout}>Logout</a>}
                    {!loggedIn && <NavLink to="/login" activeClassName="active">Login</NavLink>}
                    {!loggedIn && <NavLink to="/register" activeClassName="active">Register</NavLink>}
                </div>
            </div>

        );
    }
}