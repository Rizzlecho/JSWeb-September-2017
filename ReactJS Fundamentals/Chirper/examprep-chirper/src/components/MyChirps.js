import React, {Component} from 'react';
import Chirp from './../components/partials/Chirp';
import CreateChirp from './../components/partials/CreateChirp';
import {listMyChirps} from "./utils/reqHandler";
import {withRouter} from 'react-router-dom';

class MyChirps extends Component {
    constructor(props) {
        super(props);

        this.state={
            myChirps: []
        }

    }

    componentDidMount(){
        this.getData();
    }

    async getData(){
        let res = await listMyChirps();
        this.setState({myChirps:res});
    }
    componentDidCatch(){
        console.log('error');
        this.props.history.push('/');
    }

    render() {
        return (
            <section id="viewMe">
                <div className="content">
                    <div id="chirps" className="chirps">

                    <CreateChirp onClick={this.getData()}/>

                    <div id="myChirps" className="chirps">
                        <h2 className="titlebar">Chirps</h2>
                    </div>
                        {this.state.myChirps.length === 0 ?
                            <p>No chirps in database</p>
                            :
                            this.state.myChirps.map((chirp)=>{
                            return <Chirp key={chirp._id}  props={chirp}/>
                        })}
                    </div>
                </div>
            </section>
        )
    }
}

export default withRouter(MyChirps);