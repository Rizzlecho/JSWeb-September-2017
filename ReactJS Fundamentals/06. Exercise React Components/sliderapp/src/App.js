import React, {Component} from 'react';

import Slider from './components/Slider'
import Roster from './components/Roster'
import Bio from './components/Bio'

import observerMenu from './utils/observer'

import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor() {
        super();

        this.state = {
            focusedChar: 0
        };

        this.eventHandler = (newState)=> {
            this.setState(newState)
        }

        // this.changeEp = (ep) => {
        //     this.setState({epOnFocus: ep})
        // }
    }

    componentDidMount(){
        observerMenu.addObserver('changeFocus', this.eventHandler)
    }

    render() { //updateFunc={this.changeEp} focusedEp={this.state.epOnFocus}
        return (
            <div className="App">
                <Slider />
                <Roster/>
                <Bio params={({})}/>

            </div>
        );
    }
}

export default App;
