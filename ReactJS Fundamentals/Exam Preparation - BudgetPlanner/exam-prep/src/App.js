import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './index.css';
import './bootstrap.min.css';
import './App.css';
import Header from './components/common/Header';
import RegisterPage from './components/Auth/Register';
import LoginPage from './components/Auth/Login';
import YearlyBalance from './components/main/YearlyBalance';
import MonthlyBalance from './components/main/MonthlyBalance';
import AddExpense from './components/main/AddExpense';
import PrivateRoute from './api/PrivateRoute'



class App extends Component {
    constructor(props) {
        super(props);

        this.isLoggedIn = this.isLoggedIn.bind(this);
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
                    <Route exact path="/" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />

                    <PrivateRoute path="/plan/:year/:month/expenses" component={AddExpense} />
                    <PrivateRoute path="/plan/:year/:month" component={MonthlyBalance} />
                    <PrivateRoute path="/plan/:year" component={YearlyBalance} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);