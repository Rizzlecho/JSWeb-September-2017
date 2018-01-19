import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import calcTime from './../utils/calcTime'
import {deleteChirp} from "../utils/reqHandler";

class Chirp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <article className="chirp">
                <div className="titlebar">
                    <a href="#" className="chirp-author">{this.props.props.author}</a>
                    {localStorage.getItem('username') === this.props.props.author ?
                        <span className="chirp-time">{calcTime(this.props.props._kmd.lmt)} |
                        <Link className="deleteLink" to={'/me'} onClick={() => {
                            deleteChirp(this.props.props._id)
                        }}> Delete</Link></span>
                        :
                        <span className="chirp-time">{calcTime(this.props.props._kmd.lmt)}</span>}
                </div>
                <p>{this.props.props.text}</p>
            </article>
        )
    }
}

export default Chirp;