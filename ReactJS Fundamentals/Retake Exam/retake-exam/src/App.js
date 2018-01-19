import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import './index.css';
import './App.css';


import Header from './components/common/Header';
import RegisterPage from './components/Auth/Register';
import LoginPage from './components/Auth/Login';
import HomePage from './components/HomePage/HomePage';
import TripDetails from './components/Details/TripDetails';
import ListAllTickets from './components/ListAllTickets/ListAllTickets';
import Profile from './components/MyTickets/Profile';

import PrivateRoute from './api/PrivateRoute'

class App extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    isLoggedIn(){
        return localStorage.length !== 0;

    }

    onLogout() {
        localStorage.clear();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="App">
                <Header loggedIn={this.isLoggedIn} onLogout={this.onLogout}/>
                <Switch>
                    <Route exact path="/trips" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />

                    <PrivateRoute path="/cart/history" component={Profile} />
                    <PrivateRoute path="/trips/:id" component={TripDetails} />
                    <PrivateRoute path="/cart" component={ListAllTickets} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);