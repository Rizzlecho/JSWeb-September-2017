import React, {Component} from 'react';
import CreateChirp from "./partials/CreateChirp";
import Chirp from "./partials/Chirp";
import {getAllChirps, countFollowers, countFollowing, countChirps} from "./utils/reqHandler";

class MainFeed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chirps: []
            // chirpCount: 0,
            // followingCount: 0,
            // followersCount: 0
        };


        this.getData = this.getData.bind(this);
    }

    // async getStats() {
    //     const chirps = await countChirps();
    //     const following = await countFollowing();
    //     const followers = await countFollowers();
    //
    //     this.setState({
    //         chirpCount: chirps.length,
    //         followingCount: following.length,
    //         followersCount: followers.length
    //     });
    // }


    componentDidMount() {
        this.getData();
        // this.getStats()
    }

    async getData() {
        let data = await getAllChirps();
        this.setState({chirps: data});
    }


    render() {

        return (
            <section id="viewFeed">
                <div className="content">
                    <CreateChirp/>

                    <div id="chirps" className="chirps"><h2 className="titlebar">Chirps</h2>
                        {this.state.chirps.length === 0 ?
                            <p>No chirps in database</p> : this.state.chirps.map((chirp) => {
                                return <Chirp key={chirp._id} id={chirp.id} props={chirp}/>
                            })}
                    </div>
                </div>
            </section>
        )
    }
}

export default MainFeed;