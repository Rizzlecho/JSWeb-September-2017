import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';

class BalanceSheet extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            currentMonth: {}
        };

        this.getMonth = this.getMonth.bind(this);
    }

    getMonth(){
        switch(this.props.id){
            case 1: return 'January';
            case 2: return 'February';
            case 3: return 'March';
            case 4: return 'April';
            case 5: return 'May';
            case 6: return 'June';
            case 7: return 'July';
            case 8: return 'August';
            case 9: return 'September';
            case 10: return 'October';
            case 11: return 'November';
            case 12: return 'December';
        }

    }
    
    render(){
        return(
            <div className="col-md-3">
                <div className="card text-white bg-secondary">
                    <div className="card-body">
                        <blockquote className="card-blockquote">
                            <h2>{this.getMonth()}</h2>
                            <h4>Year {this.props.match.params.year}</h4>
                            <label htmlFor="budget">Budget:</label>
                            <input className="col-md-9" value={this.props.props.budget} disabled/>
                            <label htmlFor="balance">Balance:</label>
                            <input className="col-md-9" value={this.props.props.balance} disabled/>
                            <div className="space-top">
                                <Link to={`/plan/${this.props.match.params.year}/${this.props.id}`} className="btn btn-secondary">Details</Link>
                            </div>
                        </blockquote>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(BalanceSheet);