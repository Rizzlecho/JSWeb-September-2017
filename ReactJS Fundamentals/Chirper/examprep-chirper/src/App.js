import React, {Component} from 'react';
import {Switch, BrowserRouter, Route, withRouter} from 'react-router-dom'
import './App.css';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Navigation from "./components/common/Navigation";
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import MainFeed from "./components/MainFeed";
import DiscoverPeople from "./components/DiscoverPeople";
import MyChirps from "./components/MyChirps";
import UserView from "./components/UserView";

class App extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
        this.loggedIn = this.loggedIn.bind(this);
    }

    componentDidMount() {
        console.log(this.loggedIn());
    }

    onLogout() {
        localStorage.clear();
        this.props.history.push('/');
    }

    loggedIn() {
        if (localStorage.length === 0) {
            return false;
        }
        return true;
    }

    componentDidCatch(){
        console.log('error');
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <Navigation style={{'display':'none'}} onLogout={this.onLogout}/>}
                <Switch>

                    {this.loggedIn && <Route path="/register" component={Register}/>}
                    {this.loggedIn && <Route exact path="/" component={Login}/>}

                    <Route path="/feed" component={MainFeed}/>
                    <Route path="/discover" component={DiscoverPeople}/>
                    <Route path="/me" component={MyChirps}/>
                    <Route path="/user/:id" component={UserView}/>
                </Switch>


                <Footer/>
            </div>
        );
    }
}

export default withRouter(App);
