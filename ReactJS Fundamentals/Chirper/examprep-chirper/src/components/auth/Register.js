import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import toastr from 'toastr';

import {register} from './../utils/reqHandler';

class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            repeatPass: '',
            subscriptions: [],
            error: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e){
        this.setState({[e.target.name]:e.target.value})
    }

    async onSubmitHandler(e){
        e.preventDefault();
        if(this.state.password !== this.state.repeatPass){
            toastr.error('Passwords do not match!');
            return;
        }
        let data = await register(this.state.username, this.state.password, this.state.subscriptions);
        toastr.success('Register successful!');
        this.props.history.push('/login');

    }

    render() {
        return (
            <section id="viewRegister">
                <div className="content">
                    <form onSubmit={this.onSubmitHandler} className="form" id="formRegister" >
                        <label>Username</label>
                        <input onChange={this.onChangeHandler} name="username" type="text"/>
                        <label>Password</label>
                        <input onChange={this.onChangeHandler} name="password" type="password"/>
                        <label>Repeat Password</label>
                        <input onChange={this.onChangeHandler} name="repeatPass" type="password"/>
                        <input id="btnRegister" value="Register" type="submit"/>
                        <Link to="/login">Login</Link>
                    </form>
                </div>
            </section>
        )
    }
}

export default withRouter(Register);