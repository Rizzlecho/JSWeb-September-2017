import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {getUserDetails} from "./remote";

export default class AdminRoute extends Component {

    render() {
        if (localStorage.getItem('token') === null) {
            return <Redirect to="/login" />;
        }

        if (localStorage.getItem('username') !== 'Rizzle') {
            return <Redirect to="/" />;
        }

        return (
            <Route {...this.props}>

            </Route>
        );
    }
}