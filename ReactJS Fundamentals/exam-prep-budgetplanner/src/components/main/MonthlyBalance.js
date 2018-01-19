import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {getMonthBalance, updateMonthlyBudgetAndIncome} from "../utils/reqHandler";
import toastr from 'toastr';
import Expenses from "../partials/Expenses";

class MonthlyBalance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            budget: -1,
            income: -1,
            expenses: []
        };

        this.getData = this.getData.bind(this);
        this.getMonth = this.getMonth.bind(this);

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);

        this.year = this.props.match.params.year;

    }

    componentDidMount() {
        this.getData();
        this.getMonth(this.props.match.params.month);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    async onSubmitHandler(e) {
        e.preventDefault();
        let currentMonth = this.getMonth(this.props.match.params.month);

        let newBudget = Number(this.state.budget);
        let newIncome = Number(this.state.income);

        const res = await updateMonthlyBudgetAndIncome(this.year, currentMonth, newIncome, newBudget);
        if(res.success === false){
            toastr.error('Update unsuccessful');
            return;
        }
        toastr.success('Budget and Income saved');
        console.log(res);

    }



    async getData() {
        let currentMonth = this.getMonth(this.props.match.params.month);

        const res = await getMonthBalance(this.year, currentMonth);
        toastr.success('Monthly Balance Loaded');
        this.setState({budget: res.budget, income: res.income, expenses: res.expenses});

    }

    getMonth(monthName) {
        switch (monthName) {
            case 'january':
                return 1;
            case 'february':
                return 2;
            case 'march':
                return 3;
            case 'april':
                return 4;
            case 'may':
                return 5;
            case 'june':
                return 6;
            case 'july':
                return 7;
            case 'august':
                return 8;
            case 'september':
                return 9;
            case 'october':
                return 10;
            case 'november':
                return 11;
            case 'december':
                return 12;
        }
    }

    render() {
        return (
            <main>
                <div className="container">
                    <div className="row space-top">
                        <div className="col-md-12">
                            <h1>Welcome to Budget Planner</h1>
                        </div>
                    </div>
                    <div className="row space-top ">
                        <div className="col-md-12 ">
                            <div className="card bg-secondary">
                                <div className="card-body">
                                    <blockquote className="card-blockquote">
                                        <h2 id="month">November 2017</h2>
                                        <div className="row">
                                            <div className="col-md-3 space-top">
                                                <h4>Planner</h4>


                                                <form onSubmit={this.onSubmitHandler}>
                                                    <div className="form-group">
                                                        <label className="form-control-label"
                                                               htmlFor="income">Income:</label>
                                                        <input className="form-control" onChange={this.onChangeHandler}
                                                               name="income" value={this.state.income} type="number"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-control-label"
                                                               htmlFor="budget">Budget:</label>
                                                        <input className="form-control" onChange={this.onChangeHandler}
                                                               name="budget" value={this.state.budget} type="number"/>
                                                    </div>
                                                    <input type="submit" className="btn btn-secondary"
                                                           defaultValue="Save"/>
                                                </form>


                                            </div>
                                            <div className="col-md-8 space-top">
                                                <div className="row">
                                                    <h4 className="col-md-9">Expenses</h4>
                                                    <Link to={`/plan/${this.year}/${this.getMonth(this.props.match.params.month)}/expense`}
                                                          className="btn btn-secondary ml-2 mb-2">Add expenses</Link>
                                                </div>
                                                <table className="table">
                                                    <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Category</th>
                                                        <th>Cost</th>
                                                        <th>Payment Date</th>
                                                        <th/>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.expenses.length === 0 ? <tr>
                                                        <td>No expenses this month</td>
                                                    </tr> : this.state.expenses.map(data => {
                                                        return <Expenses key={data.id} props={data}/>
                                                    })}

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        )
    }
}

export default withRouter(MonthlyBalance)
