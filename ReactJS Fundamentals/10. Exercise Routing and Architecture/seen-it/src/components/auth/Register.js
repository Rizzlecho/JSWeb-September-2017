import React, {Component} from 'react';
import reqHandler from './../../utils/reqHandler';
import dataCollector from './../../utils/dataCollector';

class Register extends Component {
    constructor() {
        super();

        this.dataCollector = (e) => {
            this.setState(dataCollector(e));
        };

        this.register = (e) => {
            e.preventDefault();
            if(this.validate(this.state)){
                reqHandler.register(this.state).then(()=>{
                    reqHandler.login(this.state)
                        .then(res => {
                            localStorage.setItem('token', res._kmd.authtoken);
                            localStorage.setItem('username', res.username);
                            this.setState({loading: false, success: true});
                            window.location.replace('/catalog')
                        }).catch((e) =>{
                        console.log(e)
                    })
                })
            }

        };

        this.validate = (payload) =>{

            let userPattern = /[a-zA-Z]{3,}/g;
            let passPattern = /[a-zA-Z0-9]{6,}/g;

            if (!userPattern.test(payload.username)) {
                // notify.showError('A username should be at least 3 characters long and should contain only english alphabet letters.');
                return false;
            }

            if (!passPattern.test(payload.password)) {
                // notify.showError('Password should be at least 6 characters long and should contain only english alphabet letters and digits.');
                return false;
            }



            return true;

        }
    }



    render() {
        return (
            <form id="registerForm" onSubmit={e=>this.register(e)}>
                <h2>Register</h2>
                <label>Username:</label>
                <input onChange={(e) => {
                    this.dataCollector(e)
                }} name="username" type="text"/>
                <label>Password:</label>
                <input onChange={(e) => {
                    this.dataCollector(e)
                }} name="password" type="password"/>
                <label>Repeat Password:</label>
                <input onChange={(e) => {
                    this.dataCollector(e)
                }} name="repeatPass" type="password"/>
                <input id="btnRegister" value="Sign Up" type="submit"/>
            </form>
        )
    }
}

export default Register;