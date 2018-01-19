import React, {Component} from 'react';
import {calcTime, listMyChirps} from "../../api/remote";
import {Link} from 'react-router-dom'


export default class ChirpCard extends Component {
    constructor(props){
        super(props);

    }

    componentDidMount(){
        console.log('chirper card');

        console.log(this.props);
    }
// <Link className="deleteLink" to={'/me'} onClick={() => {
//     deleteChirp(this.props.props._id)
// }}> Delete</Link></span>

    render(){
        return (
            <article className="chirp">
                <div className="titlebar">
                    <a href="#" className="chirp-author">{this.props.props.author}</a>
                    {localStorage.getItem('username') === this.props.props.author ?
                        <span className="chirp-time">{calcTime(this.props.props._kmd.lmt)}</span>

                        :
                        <span className="chirp-time">{calcTime(this.props.props._kmd.lmt)}</span>}
                </div>
                <p>{this.props.props.text}</p>
            </article>
        )
    }
}

