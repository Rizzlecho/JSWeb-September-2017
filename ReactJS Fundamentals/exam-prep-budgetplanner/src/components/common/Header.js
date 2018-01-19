import React, {Component} from 'react';
import {Switch, Route, withRouter, NavLink, Link} from 'react-router-dom';
import MonthlyBalance from "../main/MonthlyBalance";

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
        switch (month) {
            case 1:
                return 'January';
            case 2:
                return 'February';
            case 3:
                return 'March';
            case 4:
                return 'April';
            case 5:
                return 'May';
            case 6:
                return 'June';
            case 7:
                return 'July';
            case 8:
                return 'August';
            case 9:
                return 'September';
            case 10:
                return 'October';
            case 11:
                return 'November';
            case 12:
                return 'December';
        }
    }

    render() {
        return (
            <header>
                <nav className="navbar navbar-dark bg-secondary">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                {this.props.loggedIn() && <NavLink className="nav-link" to={`/plan/${this.getYear()}/${this.getMonth().toLowerCase()}`}>Monthly Balance</NavLink>}
                                {this.props.loggedIn() &&
                                <NavLink className="nav-link active" to={`/plan/${this.getYear()}`}>Yearly
                                    Balance</NavLink>}
                                {this.props.loggedIn() && <a className="nav-link" href="javascript:void(0)"
                                                             onClick={this.props.onLogout}>Logout</a>}

                                {!this.props.loggedIn() && <NavLink className="nav-link" to={'/'}>Login</NavLink>}
                                {!this.props.loggedIn() &&
                                <NavLink className="nav-link" to={'/register'}>Register</NavLink>}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

export default withRouter(Header)