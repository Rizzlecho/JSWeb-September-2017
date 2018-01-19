import React, {Component} from 'react';
import {getAllTickets} from "../../api/remote";
import toastr from 'toastr';

import TripCard from './../partials/TripCard'
import MyCart from "../partials/MyCart";

export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tickets: [],
        };

        this.getData = this.getData.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);

    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        let ticketsArray = [];

        const res = await getAllTickets();

        if (res.success === false) {
            toastr.error('Loading unsuccessful');
            return;
        }

        for (let obj in res) {
            ticketsArray.push(res[obj]);

        }

        this.setState({tickets: ticketsArray});

        toastr.success(`Successful Loading of Tickets`);
    }


    async onSubmitHandler(e) {
        e.preventDefault();


    }

    render() {
        {
            return (
                <div>
                    <main>

                        {
                            this.state.tickets.map((ticket, index) => {
                                return <MyCart key={index} id={index} props={ticket}/>
                            })
                        }

                        <section className="ticket-checkout">
                            <div className="total">Sub total: 200$</div>
                            <a className="checkout">Checkout</a>
                        </section>

                    </main>
                </div>
            );
        }
    }
}