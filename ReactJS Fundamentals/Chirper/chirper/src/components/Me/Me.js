import React, {Component} from 'react';
import ChirpCard from './../HomePage/ChirpCard'
import PostChirp from './../PostChirp/PostChirp'
import {listMyChirps} from "../../api/remote";
import { withRouter} from 'react-router-dom'

class Me extends Component {
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
        const data = await listMyChirps();

        this.setState({chirps: data});

        console.log(this.state.chirps);
    }


    render() {
        return (
            <div>
                <div className="content">
                <PostChirp/>

                {this.state.chirps.map(c => (
                    <ChirpCard
                        key={c.id}
                        props={c}
                    />
                ))}
                </div>
            </div>
        )
    }
}
export default withRouter(Me)