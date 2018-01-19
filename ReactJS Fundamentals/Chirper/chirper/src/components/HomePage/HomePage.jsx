import React, {Component} from 'react';
import ListChirpsFromSubscriptions from './../ListChirpsFromSubscriptions/ListChirpsFromSubscriptions'
import PostChirp from "../PostChirp/PostChirp";
import {listAllChirpsFromSubscriptions} from "../../api/remote";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chirps: []
        }
    }


    componentDidMount(){
        this.getData()
    }

    async getData(){
        const data = await listAllChirpsFromSubscriptions();

        this.setState({chirps: data});
        console.log('homepage');
        console.log(this.state.chirps);
    }



    render() {
        return (
            <div>
                {!localStorage.getItem('username') && <div className="container">
                    <h1>Home Page</h1>
                    <p>Welcome to our site.</p>
                </div>}

                {localStorage.getItem('username') && <section id="viewFeed">
                    <div className="content">
                        <PostChirp/>

                        <div id="chirps" className="chirps">
                            <h2 className="titlebar">Chirps</h2>
                            <article className="chirp">
                            {this.state.chirps > 1 ? <ListChirpsFromSubscriptions props={this.state.chirps}/> :
                                <p>No chirps in database</p>}
                            </article>
                        </div>
                    </div>
                </section>}
            </div>
        );
    }
}