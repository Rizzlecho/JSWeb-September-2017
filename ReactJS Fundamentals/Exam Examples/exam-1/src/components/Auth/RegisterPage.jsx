import React, {Component} from 'react';
import {register} from '../../api/remote';
import { withRouter } from 'react-router-dom'
import toastr from 'toastr'


class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            repeat: '',
            error: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();
        const res = await register(this.state.name, this.state.email, this.state.password);
        if(!res.success){
            this.setState({error: res});
            toastr.error('Registration failed');
            return
        }
        toastr.success('Registration successful');
        this.props.history.push('/')
    }

    render() {
        let errors = null;
        if (this.state.error) {
            errors = (
                <div>
                    <h2 className="errorMessage">{this.state.error.message}</h2>
                    {Object.keys(this.state.error.errors).map(k => {
                        return <p key={k}>{this.state.error.errors[k]}</p>;
                    })}
                </div>
            );
        }

        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Register</h1>
                        {errors}
                        <p>Please fill all fields.</p>
                    </div>
                </div>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-group">
                                <label className="form-control-label " htmlFor="new-username">Username</label>
                                <input
                                    className="form-control"
                                    id="new-username"
                                    type="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChangeHandler}
                                />
                            </div>

                            <div className="form-group has-success">
                                <label className="form-control-label" htmlFor="new-email">E-mail</label>
                                <input
                                    className="form-control is-valid"
                                    id="new-email"
                                    type="text"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChangeHandler}
                                />
                                <div className="form-control-feedback">This input value is valid</div>
                            </div>

                            <div className="form-group has-danger">
                                <label className="form-control-label" htmlFor="new-password">Password</label>
                                <input
                                    className="form-control is-invalid"
                                    id="new-password"
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChangeHandler}
                                />
                                <div className="form-control-feedback">This input value is invalid</div>
                            </div>

                            <div className="form-group has-danger">
                                <label className="form-control-label" htmlFor="new-repeat-password">Repeat
                                    password</label>
                                <input
                                    className="form-control is-invalid"
                                    id="new-repeat-password"
                                    type="password"
                                    name="repeat"
                                    value={this.state.repeat}
                                    onChange={this.onChangeHandler}/>
                                <div className="form-control-feedback">This input value is invalid</div>
                            </div>

                            <input type="submit" className="btn btn-secondary" defaultValue="Register"/>
                        </div>
                    </div>
                </form>
            </div>

        );
    }
}

export default withRouter(RegisterPage)