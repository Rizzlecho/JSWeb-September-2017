import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import toastr from 'toastr';
import {login, register} from '../../../api/remote';

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            repeat: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();

        if (this.state.username === '' || this.state.email === '' || this.state.password === '' || this.state.repeat === '') {
            toastr.error('All fields must be filled');
            return;
        }

        if (this.state.username.length < 4 || this.state.password.length < 4) {
            toastr.error('Username and password should be at least 4 symbols');
            return;
        }

        if (this.state.password !== this.state.repeat) {
            toastr.error('Passwords do not match');
            return;
        }

        // REGISTER REQUEST
        const res = await register(this.state.username, this.state.password, 'user', "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png");

        if (res.error) {
            toastr.error('Registration unsuccessful');
            return;
        }

        toastr.success('Register Successful');


        // LOGIN REQUEST
        const resLogin = await login(this.state.username, this.state.password);
        localStorage.setItem('token', resLogin._kmd.authtoken);
        localStorage.setItem('username', resLogin.username);

        this.props.history.push('/');
    }
    render() {
        return (
            <div className="login-page">
                <div className="form">
                    <div className="row header">
                        <div className="large-12 columns">Register</div>
                    </div>
                    {/*{this.state.loginFail && <div className="shiny btn-delete error">Please enter a valid username or password</div>}*/}
                    <form onSubmit={this.onSubmitHandler} className="login-form">
                        <input onChange={this.onChangeHandler} name="username" type="text" placeholder="Username"/>
                        <input onChange={this.onChangeHandler} name="email" type="email" placeholder="Email"/>
                        <input onChange={this.onChangeHandler} name="password" type="password" placeholder="Password"/>
                        <input onChange={this.onChangeHandler} name="repeat" type="password" placeholder="Repeat Password"/>

                        <button type="submit" className="btn btn--default shiny btn-login">Register</button>
                        <p className="message">Already have an account? <NavLink to={'/login'}>Sign In</NavLink></p>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(RegisterPage);