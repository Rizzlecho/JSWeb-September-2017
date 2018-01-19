import React, {Component} from 'react';
import Input from '../common/Input';
import {login} from '../../api/remote';
import {withRouter} from 'react-router-dom';

class LoginPage extends Component {
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
        const res = await login(this.state.email, this.state.password);
        if (!res.success) {
            this.setState({error: res});
            return;
        }
        localStorage.setItem('authToken', res.token);
        localStorage.setItem('username', res.user.name);

        this.props.history.push('/');
    }

    render() {
        let errors = null;
        if (this.state.error) {
            errors = (
                <div>
                    <h2 className="errorMessage">{this.state.error.message}</h2>
                </div>
            );
        }
        return (
            <div className="container">
                <h1>Login</h1>
                {errors}
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeHandler}
                        label="E-mail"
                    />
                    <Input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChangeHandler}
                        label="Password"
                    />
                    <input type="submit" className="btn btn-primary" value="Login"/>
                </form>
            </div>
        );
    }
}

export default withRouter(LoginPage);