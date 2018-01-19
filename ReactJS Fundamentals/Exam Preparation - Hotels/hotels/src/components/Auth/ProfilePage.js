import React, { Component } from 'react';

export default class Profile extends Component {

    render(){
        return(
            <div>
                <h1>Hello {localStorage.getItem('username')}</h1>
            </div>
        )
    }
}