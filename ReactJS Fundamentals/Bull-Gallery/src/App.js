import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import './index.scss';
import './App.css';

import Header from './components/shared/common/Header';
import RegisterPage from './components/non-shared/Auth/Register';
import LoginPage from './components/non-shared/Auth/Login';
import HomePage from './components/non-shared/Home/HomePage';
import SortByCategory from './components/non-shared/Home/SortByCategory';
import Upload from "./components/non-shared/Upload/Upload";
import Details from "./components/non-shared/Details/Details";
import Profile from "./components/non-shared/Profile/Profile";

import PrivateRoute from './api/PrivateRoute'
import Footer from "./components/shared/common/Footer";

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
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className="App">
                <Header loggedIn={this.isLoggedIn} onLogout={this.onLogout}/>
                <Switch>
                    <PrivateRoute exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <PrivateRoute path="/upload" component={Upload} />
                    <PrivateRoute path="/details/:id" component={Details} />
                    <Route path="/category/:category" component={SortByCategory} />
                    <Route path="/profile/:username" component={Profile} />
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(App);