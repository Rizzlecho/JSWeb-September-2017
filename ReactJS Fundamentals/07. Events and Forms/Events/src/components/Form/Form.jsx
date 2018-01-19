import React, { Component } from 'react';

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.state = { name: '', password: '', bio: '', make: 'volvo' };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        alert(this.state.value);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                Name:
                <input
                    onChange={this.onChange}
                    name="name"
                    type="text"
                    value={this.state.name} /><br />
                Password:
                <input
                    onChange={this.onChange}
                    type="password"
                    name="password"
                    value={this.state.password} /><br />
                Bio:
                <textarea
                    onChange={this.onChange}
                    name="bio"
                    value={this.state.bio} /><br />
                <input type="submit" value="Submit" /><br />
                <select
                    onChange={this.onChange}
                    name="make"
                    value={this.state.make}>
                    <option value="volvo">Volvo</option>
                    <option value="audi">Audi</option>
                </select>
            </form>
        );
    }
}