import React, {Component} from 'react';
import {login} from '../../api/remote';
import { withRouter } from 'react-router-dom'
import toastr from 'toastr'

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
            toastr.error('Login failed');
            return;

        }
        localStorage.setItem('authToken', res.token);
        localStorage.setItem('username', res.user.name);
        toastr.success('Login successful');
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
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Login</h1>
                        {errors}
                    </div>
                </div>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="row space-top">
                        <div className="col-md-3">
                            <div className="form-group">
                                <label className="form-control-label" htmlFor="email">E-mail</label>
                                <input
                                    className="form-control"
                                    id="email"
                                    type="text"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChangeHandler}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-control-label" htmlFor="password">Password</label>
                                <input
                                    className="form-control"
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChangeHandler}
                                />
                            </div>
                            <input type="submit" className="btn btn-secondary" defaultValue="Login"/>
                        </div>
                    </div>
                </form>
            </div>

        );
    }
}

export default withRouter(LoginPage)