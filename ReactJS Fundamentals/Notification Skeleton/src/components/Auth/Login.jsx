import React,{Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import { login } from '../../api/remote';
import toastr from 'toastr';

class Login extends Component{
    constructor(props){
        super(props);

        this.state={
            email: '',
            password: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e){
        this.setState({[e.target.name]: e.target.value});
    }

    async onSubmitHandler(e){
        e.preventDefault();

        if(this.state.email === '' || this.state.password === ''){
            toastr.error('All fields must be filled');
            return;
        }

        const res = await login(this.state.email, this.state.password);

        if(!res.success){
            toastr.error('Invalid Credentials', 'Error');
            return;
        }

        localStorage.setItem('token', res.token);
        toastr.success('Login Successful');
        this.props.history.push(`/`);
    }

    render() {
        return (
            <div className="container">
                <h1>Login</h1>
                <form onSubmit={this.onSubmitHandler}>
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
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
            </div>
        );
    }
}

export default withRouter(Login)