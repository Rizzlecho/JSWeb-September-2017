import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import toastr from 'toastr';
import { register } from '../../api/remote';

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
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

        if (this.state.password !== this.state.repeat) {
            toastr.error('Passwords do not match');
            return;
        }
        if (this.state.name === '' || this.state.email === '' || this.state.password === '' || this.state.repeat === '') {
            toastr.error('All fields must be filled');
            return;
        }

        const res = await register(this.state.name, this.state.email, this.state.password);

        if (!res.success) {
            toastr.error('Email already exists');
            return;
        }

        toastr.success('Register Successful');
        this.props.history.push('/');
    }
    render() {
        return (
            <div className="container">
                <h1>Register</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <label htmlFor="name" >Username</label><br/>
                    <input
                        name="name"
                        value={this.state.name}
                        onChange={this.onChangeHandler}

                    /><br/>

                    <label htmlFor="email" >Email</label><br/>
                    <input
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeHandler}
                    /><br/>

                    <label htmlFor="password" >Password</label><br/>
                    <input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChangeHandler}
                    /><br/>

                    <label htmlFor="repeat" >Repeat password</label><br/>
                    <input
                        name="repeat"
                        type="password"
                        value={this.state.repeat}
                        onChange={this.onChangeHandler}
                    /><br/>
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
            </div>
        );
    }
}

export default withRouter(RegisterPage);