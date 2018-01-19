import React, {Component} from 'react';
import {Switch, Route, withRouter, NavLink, Link} from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header>
                <nav>

                    {!this.props.loggedIn() && <NavLink to={'/login'}>Login</NavLink>}
                    {!this.props.loggedIn() && <NavLink to={'/register'}>Register</NavLink>}

                    {this.props.loggedIn() && <NavLink to={`/`}>Home</NavLink>}

                    {this.props.loggedIn() && <a className="nav-link" href="javascript:void(0)"
                                                 onClick={this.props.onLogout}>Logout</a>}

                </nav>
            </header>
        );
    }
}

export default withRouter(Header)