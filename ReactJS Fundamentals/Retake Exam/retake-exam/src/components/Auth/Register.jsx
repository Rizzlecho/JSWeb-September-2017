import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import toastr from 'toastr';
import {register} from '../../api/remote';

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
        this.setState({[e.target.name]: e.target.value});
    }

    async onSubmitHandler(e) {
        e.preventDefault();

        if (this.state.password.length < 4) {
            toastr.error('Passwords must be at least 4 characters long');
            return;
        }

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
        this.props.history.push('/login');
    }

    render() {
        return (
                <main>
                    <h2>Create your account:</h2>
                    <form onSubmit={this.onSubmitHandler} className="register-form">
                        <label>Name:</label>
                        <input onChange={this.onChangeHandler} type="text" placeholder="Name" name="name"/>
                        <label>Email:</label>
                        <input onChange={this.onChangeHandler} type="email" placeholder="Email" name="email"/>
                        <label>Password:</label>
                        <input onChange={this.onChangeHandler} type="password" placeholder="Password" name="password"/>
                        <label>Repeat Password:</label>
                        <input onChange={this.onChangeHandler} type="password" placeholder="Repeat Password" name="repeat"/>
                        <input type="submit" className="register" value="Register"/>
                    </form>
                    <footer>SoftUni RailWays</footer>
                </main>
        );
    }
}

export default withRouter(RegisterPage);