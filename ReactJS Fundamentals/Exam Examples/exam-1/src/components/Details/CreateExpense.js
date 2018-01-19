import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import toastr from 'toastr';
import {addExpense} from "../../api/remote";


class CreateExpense extends Component{
    constructor(props){
        super(props);

        this.state = {
            name: '',
            category: '',
            cost: '',
            date: '',
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});


    }

    getMonth(id) {
        switch (id) {
            case 1:
                return 'January';
            case 2:
                return 'February';
            case 3:
                return 'March';
            case 4:
                return 'April';
            case 5:
                return 'May';
            case 6:
                return 'June';
            case 7:
                return 'July';
            case 8:
                return 'August';
            case 9:
                return 'September';
            case 10:
                return 'October';
            case 11:
                return 'November';
            case 12:
                return 'December';
        }
    }


    async onSubmitHandler(e){
        e.preventDefault();
        let res = await addExpense(this.state.name,
            this.state.category,
            this.state.cost,
            this.state.date,
            this.props.match.params.year,
            this.props.match.params.month);

        console.log(this.state);

        if(!res.success){
            toastr.error('Expense add failed');
            return;
        }
        toastr.success('Expense added.');

        this.props.history.push(`/plan/${this.props.match.params.year}/${this.props.match.params.month}`)
    }


    render(){
        return(
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Add Expenses</h1>
                        <h3>{this.getMonth(Number(this.props.match.params.month))} {this.props.match.params.year}</h3>
                    </div>
                </div>
                <div className="row space-top">
                    <div className="col-md-10">
                        <form onSubmit={this.onSubmitHandler}>
                            <legend>Add a new expense</legend>
                            <div className="form-group">
                                <label className="col-md-2" htmlFor="name">Name:</label>
                                <input onChange={this.onChangeHandler} className="col-md-2" name="name" type="text" />
                            </div>
                            <div className="form-group">
                                <label className="col-md-2" htmlFor="category">Category:</label>
                                <select onChange={this.onChangeHandler} className="col-md-2 pl-2" name="category">
                                    <option>Non-essential</option>
                                    <option>Fixed</option>
                                    <option>Variable</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2" htmlFor="cost">Cost:</label>
                                <input onChange={this.onChangeHandler} className="col-md-2" name="cost" type="number" />
                            </div>
                            <div className="form-group">
                                <label className="col-md-2" htmlFor="date">Payment Date:</label>
                                <input onChange={this.onChangeHandler} className="col-md-2" name="date" type="text" />
                            </div>
                            <input type="submit" className="btn btn-secondary" defaultValue="Add" />
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(CreateExpense)