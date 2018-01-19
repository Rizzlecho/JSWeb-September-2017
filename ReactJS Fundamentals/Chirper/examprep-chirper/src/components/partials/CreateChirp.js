import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import {countChirps, countFollowers, countFollowing, createChirp} from "../utils/reqHandler";

class CreateChirp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            chirpCount: 0,
            followingCount: 0,
            followersCount: 0
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        // this.getStats=this.getStats.bind(this)
    }

    componentDidMount() {
        this.getStats()
    }

    async getStats() {
        const chirps = await countChirps();
        const following = await countFollowing();
        const followers = await countFollowers();

        this.setState({
            chirpCount: chirps.length,
            followingCount: following.length,
            followersCount: followers.length
        });
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    async onSubmitHandler(e) {
        e.preventDefault();

        if (this.state.text === '') {
            console.log('text cannot be empty');
            return;
        }
        let res = await createChirp(this.state.text);
        this.refs.form.reset();
        this.props.history.push('/me');
    }


    render() {
        return (
            <div className="chirper">

                <h2 className="titlebar">{localStorage.getItem('username')}</h2>

                <form onSubmit={this.onSubmitHandler} id="formSubmitChirp" className="chirp-form" ref='form'>
                    <textarea onChange={this.onChangeHandler} name="text" className="chirp-input"/>
                    <input className="chirp-submit" id="btnSubmitChirp" value="Chirp" type="submit"/>
                </form>

                <div id="userStats" className="user-details">
                    <span>{this.state.chirpCount} chirps</span> | <span>{this.state.followingCount} following</span> |
                    <span> {this.state.followersCount} followers</span>
                </div>
            </div>
        )
    }
}

export default withRouter(CreateChirp);