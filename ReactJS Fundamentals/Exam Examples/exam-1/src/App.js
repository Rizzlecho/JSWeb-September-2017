import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from './components/common/Header';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import HomePage from './components/HomePage/HomePage';
import DetailsPage from "./components/Details/DetailsPage";
import CreateExpense from "./components/Details/CreateExpense";



class App extends Component {
    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        localStorage.clear();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="App">
                <Header loggedIn={localStorage.getItem('authToken') != null} onLogout={this.onLogout} />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/plan/:year/:month/expenses" component={CreateExpense} />
                    <Route path="/plan/:year/:month" component={DetailsPage} />
                    <Route path="/plan/:year" component={HomePage} />

                </Switch>
            </div>
        );
    }
}

export default withRouter(App);