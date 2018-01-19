import React,{Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {login} from '../utils/reqHandler';
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

        let date = new Date();
        let year = date.getFullYear();

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
        this.props.history.push(`/plan/${year}`);
    }

    render(){
        return(
            <main>
                <div className="container">
                    <div className="row space-top">
                        <div className="col-md-12">
                            <h1>Login</h1>
                        </div>
                    </div>
                    <form onSubmit={this.onSubmitHandler}>
                        <div className="row space-top">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label className="form-control-label" htmlFor="email">E-mail</label>
                                    <input onChange={this.onChangeHandler} name="email" className="form-control" id="email" type="text" />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label" htmlFor="password">Password</label>
                                    <input onChange={this.onChangeHandler} name="password" className="form-control" id="password" type="password" />
                                </div>
                                <input type="submit" className="btn btn-secondary" defaultValue="Login" />
                            </div>
                        </div>
                    </form>
                </div>
            </main>

        )
    }
}

export default withRouter(Login)
