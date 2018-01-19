import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {getTripDetails} from "../../api/remote";
import toastr from 'toastr';
import Sheffield from '../../img/Sheffield.png'
import Ticket from '../partials/Ticket.jsx'


class MonthlyBalance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            origin: '',
            destination: '',
            time: '',
            arrives: '',
            duration: '',
            tickets: [],

        };


        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount() {
        this.getData();

    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    async onSubmitHandler(e) {
        e.preventDefault();


    }


    async getData() {
        let ticketsArr = [];

        const res = await getTripDetails(this.props.match.params.id);

        if (res.success === false) {
            toastr.error('Loading unsuccessful');
            return;
        }

        ticketsArr.push(res.tickets);


        toastr.success(`Successful Loading of Trip Details`);
        this.setState({
            origin: res.origin,
            destination: res.destination,
            time: res.time,
            arrives: res.arrives,
            duration: res.duration,
            tickets: ticketsArr
        });

    }


    render() {
        return (
            <main>
                <section className="ticket-area">
                    <div className="ticket-area-left">
                        <img src={Sheffield}/>
                    </div>
                    <div className="ticket-area-right">
                        <h3>{this.state.destination}</h3>
                        <div>from {this.state.origin}</div>
                        <div className="data-and-time">Flight {this.state.time}</div>
                        <div className="data-and-time">arrives {this.state.arrives}</div>
                        <div className="data-and-time">duration {this.state.duration}</div>
                    </div>
                </section>


                {this.state.tickets.map((ticket, index) => {

                        return <Ticket key={index} id={index} props={ticket}/>

                    }
                )}


                <footer>SoftUni RailWays</footer>
            </main>
        );
    }

}

export default withRouter(MonthlyBalance)