import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

export default class Header extends Component {
    constructor(props){
        super(props);

        this.getDate = this.getDate.bind(this)
    }

    componentDidMount() {
        this.getDate()
    }

    getDate() {
        let date = new Date();
        let year = date.getYear();
        let month = date.getMonth();
        const uri = `20${year - 100}/${month + 1}`;
        return uri;
    }

    render() {
        const {loggedIn, onLogout} = this.props;

        return (
            <header>
                <nav className="navbar navbar-dark bg-secondary">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                {loggedIn && <NavLink to={`/plan/${this.getDate()}`} activeClassName="active">Monthly Balance</NavLink>}
                                {loggedIn && <NavLink exact to="/plan/2017" activeClassName="active">Yearly Balance</NavLink>}
                                {loggedIn && <a href="javascript:void(0)" onClick={onLogout}>Logout</a>}
                                {!loggedIn && <NavLink to="/login" activeClassName="active">Login</NavLink>}
                                {!loggedIn && <NavLink to="/register" activeClassName="active">Register</NavLink>}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>




        );

        {/*<NavLink exact to="/" activeClassName="active">Home</NavLink>*/}
    }
}