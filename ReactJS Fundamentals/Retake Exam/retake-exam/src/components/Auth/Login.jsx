import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {login} from '../../api/remote';
import toastr from 'toastr';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    async onSubmitHandler(e) {
        e.preventDefault();

        if (this.state.email === '' || this.state.password === '') {
            toastr.error('All fields must be filled');
            return;
        }

        const res = await login(this.state.email, this.state.password);

        if (!res.success) {
            toastr.error('Invalid Credentials', 'Error');
            return;
        }

        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.user.name);
        toastr.success('Login Successful');
        this.props.history.push(`/trips`);
    }

    render() {
        return (


                <main>
                    <h2>Log In:</h2>
                    <form onSubmit={this.onSubmitHandler} className="register-form">
                        <label>Email:</label>
                        <input onChange={this.onChangeHandler} type="email" placeholder="Enter your Email" name="email"/>

                        <label>Password:</label>
                        <input onChange={this.onChangeHandler}  type="password" placeholder="Enter your Password" name="password"/>

                        <input type="submit" className="login" value="Login"/>
                    </form>
                    <footer>SoftUni RailWays</footer>
                </main>

        );
    }
}

export default withRouter(Login)