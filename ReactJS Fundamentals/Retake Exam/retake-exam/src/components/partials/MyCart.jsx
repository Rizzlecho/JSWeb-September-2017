import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import toastr from 'toastr';
import trainStation from '../../img/train-station.jpg'
import {removeTicketsFromCart} from "../../api/remote";

class MyCart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            destination: '',
            origin: '',
            departure: ''
        };



        this.deleteCurrentTicket = this.deleteCurrentTicket.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }


    // async getData(){
    //
    // }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    async onSubmitHandler(e) {
        e.preventDefault();

    }

    async deleteCurrentTicket(id){

        const res = await removeTicketsFromCart(id);
        if(res.success === false){
            toastr.error('Ticket not found');
            return;
        }
        toastr.info('Ticket Deleted');
        this.props.history.push('/');
        this.props.history.push('/cart');
    }



    render() {
        return (

            <section className="single-ticket">
                <div className="left-ticket-container">
                    <img src={trainStation} className="destination-img" />
                    <div className="train-parameters">
                        <span className="ticket-price">Price: {this.props.props.price}$</span>
                        <span className="ticket-class">{this.props.props.class} Class</span>
                    </div>
                </div>
                <div className="right-ticket-container">
                    <h2>{this.props.props.destination}</h2>
                    <p>from {this.props.props.origin}</p>
                    <p>Flight {this.props.props.time}</p>
                    <p>arrives {this.props.props.time} (duration {this.props.props.duration})</p>
                    <p>
                    </p><div>
                    <span className="number-of-tickets">{this.props.props.count}</span>
                    <a onClick={()=>{this.deleteCurrentTicket(this.props.props._id)}} className="remove">REMOVE</a>
                </div>
                </div>
            </section>

        )
    }
}

export default withRouter(MyCart);