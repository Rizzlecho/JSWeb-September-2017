import React, {Component} from 'react';
import {getProfile} from "../../api/remote";
import toastr from 'toastr';
import {withRouter, Link} from 'react-router-dom';
import train from '../../img/train-station.jpg'

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trips: [],
            destination: '',
            origin: '',
            departure: ''
        };

        this.getData = this.getData.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);

    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const res = await getProfile();

    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    async onSubmitHandler(e) {
        e.preventDefault();




    }

    render() {
        return (

            <main>
                <h2>Your Trains</h2>

                <section className="purchased-ticket">
                    <div className="purchased-left">
                        <img src={train}/>
                    </div>
                    <div className="purchased-right">
                        <div>
                            <h3>Varna</h3><span>15 January</span>
                        </div>
                        <div>
                            from Sofia <span>14:00</span>
                        </div>
                        <div>
                            arrives <span>21:53</span>
                        </div>
                        <div>
                            duration <span>7:53</span>
                        </div>
                        <p>2 x 100$ (Second Class) </p>
                    </div>
                </section>

                <footer>SoftUni RailWays</footer>
            </main>
        );
    }
}

export default withRouter(Profile)