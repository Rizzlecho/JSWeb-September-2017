import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {login} from './../utils/reqHandler';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    async onSubmitHandler(e) {
        e.preventDefault();
        let data = await login(this.state.username, this.state.password);

        if (data.error) {

            //TODO add toastr notifications
            console.log(data.description);
            return;

        }
        localStorage.setItem('token', data._kmd.authtoken);
        localStorage.setItem('username', data.username);
        localStorage.setItem('subscriptions', data.subscriptions);
        localStorage.setItem('userId', data._id);
        this.props.history.push('/feed');
    }

    render() {
        return (
            <section id="viewLogin">
                <div className="content">
                    <form onSubmit={this.onSubmitHandler} id="formLogin" className="form">
                        <label>Username</label>
                        <input onChange={this.onChangeHandler} name="username" type="text"/>
                        <label>Password</label>
                        <input onChange={this.onChangeHandler} name="password" type="password"/>
                        <input id="btnLogin" value="Sign In" type="submit"/>
                        <Link to="/register">Register</Link>
                    </form>
                </div>
            </section>
        )
    }
}

export default Login;