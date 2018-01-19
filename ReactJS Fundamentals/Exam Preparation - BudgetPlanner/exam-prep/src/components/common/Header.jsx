import React, { Component } from 'react';
import {Switch, Route, withRouter, NavLink, Link} from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);

        this.getYear = this.getYear.bind(this);
        this.getMonth = this.getMonth.bind(this);
    }

    getYear() {
        let date = new Date();
        return date.getFullYear();
    }

    getMonth() {
        let date = new Date();
        let month = date.getMonth() + 1;
        return month;
    }

    render() {
        return (
            <header>
                <nav className="navbar navbar-dark bg-secondary">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                {!this.props.loggedIn() && <NavLink className="nav-link" to={'/'}>Login</NavLink>}
                                {!this.props.loggedIn() && <NavLink className="nav-link" to={'/register'}>Register</NavLink>}

                                {this.props.loggedIn() &&<NavLink className="nav-link" to={`/plan/${this.getYear()}/${this.getMonth()}`}>Monthly Balance</NavLink>}
                                {this.props.loggedIn() && <NavLink className="nav-link active" to={`/plan/${this.getYear()}`}>Yearly Balance</NavLink>}

                                {this.props.loggedIn() && <a className="nav-link" href="javascript:void(0)"
                                                             onClick={this.props.onLogout}>Logout</a>}

                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default withRouter(Header)