import React, { Component } from 'react';
import {createChirp} from './../../api/remote'
import {withRouter} from 'react-router-dom'

class PostChirp extends Component {
    constructor(props){
        super(props);

        this.state = {
            author: localStorage.getItem('username'),
            text: '',
            time: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }



    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();

        const data = await createChirp(this.state.author, this.state.text);
        this.setState({time: data._kmd.lmt})

        this.props.history.push('/');
    }


    render (){
        return(
            <div className="chirper">

                <h2 className="titlebar">{localStorage.getItem('username')}</h2>

                <form id="formSubmitChirp" className="chirp-form" onSubmit={this.onSubmitHandler}>
                    <textarea name="text" className="chirp-input" onChange={this.onChangeHandler}></textarea>
                    <input className="chirp-submit" id="btnSubmitChirp" value="Chirp" type="submit"/>
                </form>

                <div id="userStats" className="user-details">
                    <span>0 chirps</span> | <span>1 following</span> | <span>0 followers</span>
                </div>
            </div>
        )
    }
}

export default withRouter(PostChirp)