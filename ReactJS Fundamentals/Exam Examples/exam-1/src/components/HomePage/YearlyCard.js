import React, {Component} from 'react';
import {Link} from 'react-router-dom'
// import {getYearBalance} from "../../api/remote";

export default class YearlyCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="col-md-3">
                <div className="card text-white bg-secondary">
                    <div className="card-body">
                        <blockquote className="card-blockquote">
                            <h2>{this.props.name}</h2>
                            <h4>Year 2017</h4>
                            <label htmlFor="budget">Budget</label>
                            <input className="col-md-9" name="budget" value={this.props.props.budget} disabled/>
                            <label htmlFor="balance">Balance</label>
                            <input className="col-md-9" name="balance" value={this.props.props.balance} disabled/>
                            <div className="space-top">
                                <Link to={'/plan/2017/' + this.props.id}
                                      className="btn btn-secondary">Details</Link>
                            </div>
                        </blockquote>
                    </div>
                </div>
            </div>
        )
    }
}
