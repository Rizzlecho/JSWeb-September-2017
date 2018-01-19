import React, {Component} from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import {login} from '../../../api/remote';
import toastr from 'toastr';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loginFail: false
        };


        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    async onSubmitHandler(e) {
        e.preventDefault();

        if (this.state.username === '' || this.state.password === '') {
            toastr.error('All fields must be filled');
            return;
        }

        const res = await login(this.state.username, this.state.password);

        if (res.error) {
            toastr.error('Invalid Credentials', 'Error');
            this.state.loginFail = true;
            return;
        }

        localStorage.setItem('token', res._kmd.authtoken);
        localStorage.setItem('username', res.username);
        toastr.success('Login Successful');

        window.location.reload();
        this.props.history.push(`/`);
    }

    render() {
        return (
            <div className="login-page">
                <div className="form">
                    <div className="row header">
                        <div className="large-12 columns">LOGIN</div>
                    </div>
                    {this.state.loginFail && <div className="shiny btn-delete error">Please enter a valid username or password</div>}
                    <form onSubmit={this.onSubmitHandler} className="login-form">
                        <input onChange={this.onChangeHandler} name="username" type="text" placeholder="Username"/>
                        <input onChange={this.onChangeHandler} name="password" type="password" placeholder="Password"/>

                        <button type="submit" className="btn btn--default shiny btn-login">login</button>
                        <p className="message">Not registered? <NavLink to={'/register'}>Create an account</NavLink></p>
                    </form>
                </div>
            </div>


        );
    }
}


export default withRouter(Login)