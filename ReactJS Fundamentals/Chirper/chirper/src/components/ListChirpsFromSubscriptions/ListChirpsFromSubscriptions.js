import React, {Component} from 'react';
import ChirpCard from './../HomePage/ChirpCard'

export default class ListChirpsFromSubscriptions extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount(){
        console.log(this.props);
    }

    render() {
        return (
            <div>
                {this.props.props.chirps.map(c => (
                    <ChirpCard
                        key={c.id}
                        props={c}
                    />
                ))}
            </div>
        )
    }
}