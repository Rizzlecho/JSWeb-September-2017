import React, { Component } from 'react'
import './App.css'

import SingUpForm from './components/form/SingUpForm'
import LoginForm from './components/form/LoginForm';
import Pokedex from './components/form/Pokedex';

class App extends Component {
  constructor () {
    super();

    this.state = {
      username: '',
      token: ''
    };

    this.authenticate = (data) =>{
        if(data.success){
            this.setState({token: data.token, username:data.user.name});
            localStorage.setItem('token', data.token)
        }
    }
  }

  componentDidMount() {
      try{
          this.setState({token:localStorage.getItem('token')});
      } catch (err){
          console.log(err);
      }

  }

  render () {
      if(this.state.token !== '' && this.state.token !== 'undefined' && typeof(localStorage.token) !== 'undefined') {
          return (
              <div className="App">
                  <h1>Logged in</h1>
                  <Pokedex />
              </div>
          )
      }
    return (
        <div className="App">
        <SingUpForm />
        <LoginForm authFunc={this.authenticate}/>
        </div>
    )
  }
}

export default App
