import React, {Component} from 'react';
import Input from '../common/Input';
import {login} from '../../api/remote';
import {withRouter} from 'react-router-dom';

class LoginPage extends Component {
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
        this.setState({[e.target.name]: e.target.value});
    }

    async onSubmitHandler(e) {
        e.preventDefault();
        const res = await login(this.state.username, this.state.password);

        localStorage.setItem('authToken', res._kmd.authtoken);
        localStorage.setItem('username', res.username);
        localStorage.setItem('subscriptions', res.subscriptions);

        this.props.history.push('/');
    }

    render() {

        return (
            <section id="viewLogin">
                <div className="content">
                    <h1 style={{textAlign: 'center'}}>Login</h1>

                    <form onSubmit={this.onSubmitHandler} className="form">
                        <Input
                            name="username"
                            value={this.state.username}
                            onChange={this.onChangeHandler}
                            label="Username"
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
            </section>
        );
    }
}

export default withRouter(LoginPage)