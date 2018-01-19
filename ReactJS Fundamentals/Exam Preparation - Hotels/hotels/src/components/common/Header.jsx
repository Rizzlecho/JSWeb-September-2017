import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;

        return (
            <header className="header">
                <NavLink exact to="/" activeClassName="active">Home</NavLink>
                {loggedIn &&  <NavLink exact to="/create" activeClassName="active">Create</NavLink>}
                {loggedIn && <a href="javascript:void(0)" onClick={onLogout}>Logout</a>}

                {!loggedIn && <NavLink to="/login" activeClassName="active">Login</NavLink>}
                {!loggedIn && <NavLink to="/register" activeClassName="active">Register</NavLink>}
                {loggedIn &&  <NavLink exact to="/profile" activeClassName="active">({localStorage.getItem('username')})</NavLink>}

            </header>
        );
    }
}