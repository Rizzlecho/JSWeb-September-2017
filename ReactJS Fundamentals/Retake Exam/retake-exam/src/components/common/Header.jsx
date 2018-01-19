import React, {Component} from 'react';
import {Switch, Route, withRouter, NavLink, Link} from 'react-router-dom';
import cart from './../../img/cart.png'

class Header extends Component {
    constructor(props) {
        super(props);


    }

    render() {
        return (
            <header>
                <nav>
                    <div className="left-container">
                        <ul>
                            <li><NavLink to={`/trips`}>Home</NavLink></li>
                            {this.props.loggedIn() && <li><NavLink to={'/cart/history'}>My Tickets</NavLink></li>}
                            {!this.props.loggedIn() && <li><NavLink to={'/login'}>Login</NavLink></li>}
                            {!this.props.loggedIn() &&  <li><NavLink to={'/register'}>Register</NavLink></li>}
                        </ul>
                    </div>

                    <div className="right-container">
                        {this.props.loggedIn() && <span>Welcome, {localStorage.getItem('username')} </span>}
                        {this.props.loggedIn() && <a className="log-out" href="javascript:void(0)"
                                                     onClick={this.props.onLogout}>Logout</a>}
                        {this.props.loggedIn() &&  <NavLink to={'/cart'}><img src={cart} alt="" className="cart"/></NavLink>}
                    </div>
                </nav>
            </header>
        );
    }
}

export default withRouter(Header)