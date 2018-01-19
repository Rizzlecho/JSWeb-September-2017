import React, {Component} from 'react';
import {postReview, getReviews} from './../../api/remote'
import Review from './Review'

export default class ReviewSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hotel: false,
            rating: 5,
            comment: '',
            reviews: [],
            error: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount(){
        this.getData();
    }

    async getData(){
       const reviews = await getReviews(this.props.hotelId);
       this.setState({reviews});
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    async onSubmitHandler(e) {
        e.preventDefault();

        const res = await postReview(this.props.hotelId, this.state.comment, Number(this.state.rating));

        if (!res.success) {
            this.setState({error: res});
            return;
        }

        const reviews = this.state.reviews.slice();
        reviews.push(res.review);
        this.setState({reviews});
        this.getData();
    }


    render() {
        let errors = null;
        if (this.state.error) {
            errors = (
                <div>
                    <h2 className="errorMessage">{this.state.error.message}</h2>
                    {Object.keys(this.state.error.errors).map(k => {
                        return <p key={k}>{this.state.error.errors[k]}</p>;
                    })}
                </div>
            );
        }



        return (
            <div>
                <form onSubmit={this.onSubmitHandler}>
                    <br/>
                    <h2>Leave a review</h2>
                    {errors}
                    <span>Rating </span>
                    <select className="select" onChange={this.onChangeHandler} value={this.state.rating} name="rating">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <br/><br/>

                    <div>Comment:</div>
                    <textarea
                        onChange={this.onChangeHandler}
                        name="comment"
                        value={this.state.comment}
                    />
                    <input type="submit" value="Post Review"/>
                </form>

                {this.state.reviews.map(r => (
                    <Review key={r.createdOn} user={r.user} comment={r.comment} rating={r.rating} date={r.createdOn}/>
                ))}
            </div>
        )
    }
}