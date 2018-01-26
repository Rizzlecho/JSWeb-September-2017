import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import './index.scss';
import './App.css';


import Header from './components/shared/common/Header';
import Footer from "./components/shared/common/Footer";
import RegisterPage from './components/non-shared/Auth/Register';
import LoginPage from './components/non-shared/Auth/Login';
import HomePage from './components/non-shared/Home/HomePage';
import SortByCategory from './components/non-shared/Home/SortByCategory';
import Upload from "./components/non-shared/Upload/Upload";
import Details from "./components/non-shared/Details/Details";
import Profile from "./components/non-shared/Profile/Profile";
import EditPost from "./components/non-shared/Edit/EditPost";
import Admin from "./components/non-shared/Admin/Admin";

import PrivateRoute from './api/PrivateRoute'
import AuthedRoute from './api/AuthedRoute'
import AdminRoute from "./api/AdminRoute";

import Error from "./components/non-shared/Error/Error";

class App extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    isLoggedIn(){
        return localStorage.length !== 0;

    }

    isAdmin(){
        return localStorage.getItem('username') === 'Rizzle';
    }

    onLogout() {
        localStorage.clear();
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className="App">
                <Header loggedIn={this.isLoggedIn} onLogout={this.onLogout} isAdmin={this.isAdmin}/>
                <Switch>
                    <PrivateRoute exact path="/" component={HomePage} />
                    <AuthedRoute path="/login" component={LoginPage} />
                    <AuthedRoute path="/register" component={RegisterPage} />
                    <PrivateRoute path="/upload" component={Upload} />
                    <PrivateRoute path="/details/:id" component={Details} />
                    <PrivateRoute path="/edit/:id" component={EditPost} />
                    <PrivateRoute path="/categories" component={SortByCategory} />
                    <PrivateRoute path="/profile/:username" component={Profile} />
                    <AdminRoute path="/admin" component={Admin} />
                    <Route path="*" component={Error} />
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(App);