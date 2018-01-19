import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {addExpensePost} from "../../api/remote";
import toastr from 'toastr';


class AddExpense extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: 0,
            name: '',
            category: 'Non-essential',
            amount: 0,
        };

        this.getMonth = this.getMonth.bind(this);

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount() {

    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e){
        e.preventDefault();
        let currentMonth = Number(this.props.match.params.month);

        const res = await addExpensePost(Number(this.props.match.params.year), currentMonth, Number(this.state.date), this.state.name, this.state.category,Number(this.state.amount));

        if(res.success === false){
            toastr.error('Update unsuccessful');
            return;
        }
        toastr.success('Expense added');
        this.props.history.push(`/plan/${this.props.match.params.year}/${this.props.match.params.month}`)

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


    render() {
        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Add Expenses</h1>
                        <h3>{this.getMonth()} {this.props.match.params.year}</h3>
                    </div>
                </div>
                <div className="row space-top">
                    <div className="col-md-10">
                        <form onSubmit={this.onSubmitHandler}>
                            <legend>Add a new expense</legend>
                            <div className="htmlForm-group">
                                <label className="col-md-2" htmlFor="name">Name:</label>
                                <input onChange={this.onChangeHandler} className="col-md-2" name="name" type="text" />
                            </div>
                            <div className="htmlForm-group">
                                <label className="col-md-2" htmlFor="category">Category:</label>
                                <select onChange={this.onChangeHandler} className="col-md-2 pl-2" name="category">
                                    <option>Non-essential</option>
                                    <option>Fixed</option>
                                    <option>Variable</option>
                                </select>
                            </div>
                            <div className="htmlForm-group">
                                <label className="col-md-2" htmlFor="cost">Cost:</label>
                                <input onChange={this.onChangeHandler} className="col-md-2" name="amount" type="number" />
                            </div>
                            <div className="htmlForm-group">
                                <label className="col-md-2" htmlFor="paymentDate">Payment Date:</label>
                                <input onChange={this.onChangeHandler} className="col-md-2" name="date" type="text" />
                            </div>
                            <input type="submit" className="btn btn-secondary" value="Add" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AddExpense)