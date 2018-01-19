import React, {Component} from 'react';
import Contact from './Contact';

import logo from './logo.svg';
import data from './contacts.js'

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onFocus: 0
        };

        this.changeFocus = (newId) => {
            this.setState((prevState)=>{
                return {onFocus:newId}
            });
            console.log(this.state);

        }


    }

    render() {
        return (
            <div className="flex">

            <div className="App">
                {data.map((e, index) => {
                    return <Contact func={this.changeFocus} index={index} key={index} pesho={e}/>
                })}
            </div>

                <div id="details">
                    <h1>Details</h1>
                    <div className="content">
                        <div className="info">
                            <div className="col">
                                <span className="avatar">&#9787;</span>
                            </div>
                            <div className="col">
                                <span className="name">{data[this.state.onFocus].firstName}</span>
                                <span className="name">{data[this.state.onFocus].lastName}</span>
                            </div>
                        </div>
                        <div className="info">
                            <span className="info-line">&phone; {data[this.state.onFocus].phone}</span>
                            <span className="info-line">&#9993; {data[this.state.onFocus].email}</span>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default App;
