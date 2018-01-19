import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ToggleButton from './components/ToggleButton';
import FocusDiv from './components/FocusDiv';
import Form from './components/Form/Form';
import Converter from './components/Converter/Converter';
import List from './components/List';

function Greeting(props) {
    return (
        <div className={props.className}>
            Hello, {props.name}!
            {props.message}
        </div>
    );
}

function FancyGreeting(props) {
    return (
        <Greeting
            className="fancy"
            name={props.name}
            message="Welcome to the Underground!" />
    );
}

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { value: true };
    }

    render() {
        return (
            <div className="App">
                <List type="fancy">
                    {['Pesho', 'Gosho', 'Vasil', 'Maria'].map(u => {
                        return <li key={u}>{u}</li>
                    })}
                </List>
                {this.state.value ? <Converter /> : null}
                <Form />
                <ToggleButton />
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                {[1, 2, 3, 4].map((n, i) => {
                    return (
                        <FocusDiv key={i} number={n}>
                            <p>I mad this</p>
                        </FocusDiv>
                    );
                })}
            </div>
        );
    }
}

export default App;
