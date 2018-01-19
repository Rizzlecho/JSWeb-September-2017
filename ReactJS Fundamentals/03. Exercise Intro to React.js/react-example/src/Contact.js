import React, { Component } from 'react';

class Contact extends Component {

    render() {
        return (

            <div onClick={()=>{this.props.func(this.props.index)}} key={this.props.key} className="contact" data-id={this.props.id}>
                <span className="avatar small">&#9787;</span>
                <span className="title">{this.props.pesho.firstName}</span>
            </div>
        );
    }
}

export default Contact