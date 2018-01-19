import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {getMonthlyBalance, updateMonthlyIncomeBudget, deleteExpense} from "../../api/remote";
import toastr from 'toastr';



class MonthlyBalance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            income: 0,
            budget: 0,
            expenses: []
        };

        this.getData = this.getData.bind(this);
        this.getMonth = this.getMonth.bind(this);
        this.deleteExistingExpense = this.deleteExistingExpense.bind(this);

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount() {
        this.getData();

    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e){
        e.preventDefault();
        let currentMonth = Number(this.props.match.params.month);

        let newIncome = Number(this.state.income);
        let newBudget = Number(this.state.budget);

        const res = await updateMonthlyIncomeBudget(Number(this.props.match.params.year), currentMonth, newIncome, newBudget);

        if(res.success === false){
            toastr.error('Update unsuccessful');
            return;
        }
        toastr.success('Budget and Income saved');

    }

    getMonth(){
         switch(Number(this.props.match.params.month)){
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

    async getData() {
        const res = await getMonthlyBalance(this.props.match.params.year, this.props.match.params.month);

        if (res.success === false) {
            toastr.error('Loading unsuccessful');
            return;
        }

        toastr.success(`Successful Loading of ${this.props.match.params.year}`);
        this.setState({income: res.income, budget: res.budget, expenses: res.expenses});

    }

    async deleteExistingExpense(id){
        const res = await deleteExpense(id);
        if(res.success === false){
            toastr.error('Expense not found');
            return;
        }
        toastr.info('Expense Deleted');
        this.props.history.push(`/plan/${this.props.match.params.year}/${this.props.match.params.month}`);
    }


    render() {
        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12 ">
                        <div className="card bg-secondary">
                            <div className="card-body">
                                <blockquote className="card-blockquote">
                                    <h2 style={{'textTransform' : "capitalize"}} id="month">{this.getMonth()} {this.props.match.params.year}</h2>
                                    <div className="row">
                                        <div className="col-md-3 space-top">
                                            <h4>Planner</h4>
                                            <form onSubmit={this.onSubmitHandler}>
                                                <div className="form-group">
                                                    <label className="form-control-label"
                                                           htmlFor="income">Income:</label>
                                                    <input onChange={this.onChangeHandler} className="form-control" name="income" type="number" value={this.state.income}/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-control-label"
                                                           htmlFor="budget">Budget:</label>
                                                    <input onChange={this.onChangeHandler} className="form-control" name="budget" type="number" value={this.state.budget}/>
                                                </div>
                                                <input type="submit" className="btn btn-secondary" value="Save"/>
                                            </form>
                                        </div>
                                        <div className="col-md-8 space-top">
                                            <div className="row">
                                                <h4 className="col-md-9">Expenses</h4>
                                                <Link to={`/plan/${this.props.match.params.year}/${this.props.match.params.month}/expenses`} className="btn btn-secondary ml-2 mb-2">Add
                                                    expenses</Link>
                                            </div>
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Category</th>
                                                    <th>Cost</th>
                                                    <th>Payment Date</th>
                                                    <th></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {[...this.state.expenses].map((e, index) => {
                                                    return  (
                                                        <tr key={index}>
                                                        <td>{e.name}</td>
                                                        <td>{e.category}</td>
                                                        <td>{e.amount.toFixed(2)}</td>
                                                        <td>{`${e.date}-${this.getMonth()}-${e.year}`}</td>
                                                        <td>
                                                            <Link to={'/'}  onClick={()=>{this.deleteExistingExpense(e.id)}}
                                                                  className="btn btn-secondary">Delete
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                    )

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
        );
    }
}

export default withRouter(MonthlyBalance)