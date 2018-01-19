import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import trainStation from '../../img/train-station.jpg'

class TripCard extends Component {
    constructor(props){
        super(props);


    }

    render(){
        return(
            <Link to={`/trips/${this.props.props._id}`} className="added-train">
                <img src={trainStation} className="picture-added-train"/>
                <h3>{this.props.props.destination}</h3>
                <span>from {this.props.props.origin}</span>
                <span>departs {this.props.props.time}</span>
                <span>arrives {this.props.props.arrives}</span>
                <span>duration {this.props.props.duration}</span>
            </Link>
        )
    }
}

export default withRouter(TripCard);