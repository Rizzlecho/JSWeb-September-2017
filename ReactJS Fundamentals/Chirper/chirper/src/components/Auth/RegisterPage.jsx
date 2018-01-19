import React, {Component} from 'react';
import Input from '../common/Input';
import {register} from '../../api/remote';
import {withRouter} from 'react-router-dom'

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            repeat: '',
            subscriptions: [],
            // error: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    async onSubmitHandler(e) {
        e.preventDefault();
        const res = await register(this.state.username, this.state.password, this.state.subscriptions);
        // if (!res.success) {
        //     this.setState({error: res});
        //     return
        // }

        this.props.history.push('/')
    }

//     let errors = null;
//     if (this.state.error) {
//     errors = (
//         <div>
//             <h2 className="errorMessage">{this.state.error.message}</h2>
//             {Object.keys(this.state.error.errors).map(k => {
//                 return <p key={k}>{this.state.error.errors[k]}</p>;
//             })}
//         </div>
//     );
// }

// {errors}

    render() {


        return (
            <section id="viewRegister">
                <div className="content">
                    <h1 style={{textAlign:'center'}}>Register</h1>

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
                        <Input
                            name="repeat"
                            type="password"
                            value={this.state.repeat}
                            onChange={this.onChangeHandler}
                            label="Repeat password"
                        />
                        <input type="submit" className="btn btn-primary" value="Register"/>
                    </form>
                </div>
            </section>
        );
    }
}

export default withRouter(RegisterPage)