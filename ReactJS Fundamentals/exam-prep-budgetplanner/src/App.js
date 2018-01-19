import React, {Component} from 'react';
import {Switch, Route, withRouter, NavLink} from 'react-router-dom'
import './index.css';
import './bootstrap.min.css';
import './App.css';
import PrivateRoute from './components/utils/PrivateRoute';
import Header from "./components/common/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import YearlyBalance from "./components/main/YearlyBalance";
import MonthlyBalance from "./components/main/MonthlyBalance";
import Footer from "./components/common/Footer";
import AddExpense from "./components/main/AddExpense";


class App extends Component {
    constructor() {
        super();

        this.isLoggedIn = this.isLoggedIn.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    isLoggedIn(){
        return localStorage.length !== 0;

    }

    onLogout(){
        localStorage.clear();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="App">
                <Header loggedIn={this.isLoggedIn} onLogout={this.onLogout}/>
                <Switch>
                    <Route exact path='/' component={Login}/>
                    <Route path='/register' component={Register}/>

                    <PrivateRoute path='/plan/:year/:month/expense' component={AddExpense}/>
                    <PrivateRoute path='/plan/:year/:month' component={MonthlyBalance}/>
                    <PrivateRoute path='/plan/:year' component={YearlyBalance}/>



                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(App);
