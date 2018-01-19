import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import './index.css';
import './App.css';

import Header from './components/common/Header';
import RegisterPage from './components/Auth/Register';
import LoginPage from './components/Auth/Login';
import HomePage from './components/HomePage/HomePage';
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
                    <PrivateRoute exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);