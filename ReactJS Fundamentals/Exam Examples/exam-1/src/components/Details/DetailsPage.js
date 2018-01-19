import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom'
import {updateIncomeBudget} from "../../api/remote";
import {detailsBudget} from './../../api/remote'
import toastr from 'toastr'
import Expenses from "./Expenses";

class DetailsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            month: '',
            expenses: [],
            budget: '',
            income: ''
        };

        this.getData = this.getData.bind(this);
        this.getMonth = this.getMonth.bind(this);

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    async onSubmitHandler(e) {
        e.preventDefault();
        const res = await updateIncomeBudget(this.state.income, this.state.budget, this.props.match.params.year, this.props.match.params.month);
        this.getData();

        console.log('Income = ' + this.state.income);
        console.log('Budget = ' + this.state.budget);

        if(!res.success){
            toastr.error('Budget and Income update failed');
            return;
        }
        toastr.success('Budget and Income updated');
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

    componentDidMount() {
        if(!localStorage.getItem('authToken')){
            this.props.history.push('/login');
            return
        }

        this.getData();
        console.log('Params Year = ' + this.props.match.params.year);
        console.log('Params Month = ' + this.props.match.params.month);
    }

    // async componentWillReceiveProps(newProps){
    //     console.log(newProps.match.params.month);
    //     console.log(this.props.match.params.month);
    //     if(newProps.match.params.month !== this.props.match.params.month ){
    //         window.location.reload();
    //     }
    // }



    async getData() {

        console.log('Details here');
        const res = await detailsBudget(this.props.match.params.year, this.props.match.params.month);
        this.setState({month: res});

        this.setState({
            income: this.state.month.income,
            budget: this.state.month.budget
        });

        this.setState({expenses: res.expenses});

        console.log(this.state.month);

    }


    render() {

        return (
            <div className="container">
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
                                        <h2 id="month">{this.getMonth(Number(this.props.match.params.month))} {this.props.match.params.year}</h2>
                                        <div className="row">
                                            <div className="col-md-3 space-top">
                                                <h4>Planner</h4>
                                                <form onSubmit={this.onSubmitHandler}>
                                                    <div className="form-group" >
                                                        <label className="form-control-label"
                                                               htmlFor="income">Income:</label>
                                                        <input onChange={this.onChangeHandler} className="form-control" name="income" value={Number(this.state.income)} type="number"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-control-label"
                                                               htmlFor="budget">Budget:</label>
                                                        <input onChange={this.onChangeHandler} className="form-control" name="budget" type="number" value={Number(this.state.budget)}/>
                                                    </div>
                                                    <input  type="submit" className="btn btn-secondary" defaultValue="Save"/>
                                                </form>
                                            </div>
                                            <div className="col-md-8 space-top">
                                                <div className="row">
                                                    <h4 className="col-md-9">Expenses</h4>
                                                    <Link  to={'/plan/' + this.props.match.params.year + '/' + this.props.match.params.month + '/expenses'} className="btn btn-secondary ml-2 mb-2">Add expenses</Link>
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
                                                    {this.state.expenses.length === 0 ?
                                                        <tr>
                                                            <td>No expenses this month</td>
                                                        </tr>
                                                        :
                                                        this.state.expenses.map(e => {
                                                            return <Expenses key={e.id} props={e}/>
                                                        })
                                                    }

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
            </div>
        )
    }
}

export default withRouter(DetailsPage)

