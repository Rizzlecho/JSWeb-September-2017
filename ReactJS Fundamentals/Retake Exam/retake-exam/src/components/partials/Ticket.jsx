import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {AddToCart} from "../../api/remote";
import toastr from 'toastr';

class Ticket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: '07-01-18',
            firstClass: '',
            secondClass: '',
            count: 0
        };

        // this.classFunc = this.classFunc.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }



    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    async onSubmitHandler(e) {
        e.preventDefault();


        if (this.state.count === 0) {
            toastr.error('Please select ticket count');
            return
        }


        const res = await AddToCart(
            this.props.match.params.id,
            this.state.date,
            'second',
            this.state.count);




        // this.setState({
        //     firstClass: res.tickets.firstClass,
        //     secondClass: res.tickets.secondClass,
        // });

        if (res.success) {
            toastr.success('Tickets added to cart')
        }




    }



    render() {
        return (
            <div>
                <section className="train-details">
                    <form onSubmit={this.onSubmitHandler} className="seat-form">
                        <span>{this.props.props.firstClass}$</span><span>First Class</span>
                        <input name="count" onChange={this.onChangeHandler} type="text" placeholder="Add Number"/>
                        <input name="firstClass" type="submit" className="create-seat" defaultValue="Add to Cart"/>
                    </form>
                </section>

                <section className="train-details">
                    <form onSubmit={this.onSubmitHandler} className="seat-form">
                        <span>{this.props.props.secondClass}$</span><span>Second Class</span>
                        <input name="count" onChange={this.onChangeHandler} type="text" placeholder="Add Number"/>
                        <input name="secondClass" type="submit" className="create-seat" defaultValue="Add to Cart"/>
                    </form>
                </section>
            </div>
        )
    }
}

export default withRouter(Ticket);