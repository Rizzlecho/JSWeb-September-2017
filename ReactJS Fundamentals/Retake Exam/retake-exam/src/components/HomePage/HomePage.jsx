import React, {Component} from 'react';
import {getTrips, register, searchResults} from "../../api/remote";
import toastr from 'toastr';
import TripCard from './../partials/TripCard'

export default class HomePage extends Component {
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
        let tripsArray = [];

        const res = await getTrips();

        if (res.success === false) {
            toastr.error('Loading unsuccessful');
            return;
        }

        for (let obj in res) {
            tripsArray.push(res[obj]);

        }
        toastr.success(`Successful Loading of Trips`);

        this.setState({trips: tripsArray});

    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    async onSubmitHandler(e) {
        e.preventDefault();

        let tripsArray = [];
        if (this.state.destination === '' || this.state.origin === '' || this.state.departure === '') {
            toastr.error('All fields must be filled');
            return;
        }


        const res = await searchResults(this.state.origin, this.state.destination, this.state.departure);


        for (let obj in res) {
            tripsArray.push(res[obj]);

        }

        this.setState({trips: tripsArray});


    }

    render() {
        return (

            <main>
                <div className="train-logo">
                </div>
                <form onSubmit={this.onSubmitHandler} className="search-form">
                    <label>Destination:</label>
                    <input onChange={this.onChangeHandler} type="text" placeholder="Destination" name="destination"/>
                    <label>Origin:</label>
                    <input onChange={this.onChangeHandler} type="text" placeholder="Origin" name="origin"/>
                    <label>Departure:</label>
                    <input onChange={this.onChangeHandler} type="text" placeholder="Departure" name="departure"/>
                    <input type="submit" className="search" defaultValue="Search"/>
                </form>
                <section className="added-trains">

                    {
                        this.state.trips.map((trip, index) => {
                            return <TripCard key={index} id={index} props={trip}/>
                        })
                    }

                </section>
                <footer>SoftUni RailWays</footer>
            </main>
        );


    }
}