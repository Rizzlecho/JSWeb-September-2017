import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {deleteExistingExpense} from '../utils/reqHandler';
import toastr from 'toastr';

class Expenses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.props.id,
            year: props.props.year,
            month: props.props.month,
            date: props.props.date,
            name: props.props.name,
            category: props.props.category,
            amount: props.props.amount
        };

        this.deleteExpense = this.deleteExpense.bind(this);
    }

    componentDidMount() {
        console.log(this.state);
    }

    async deleteExpense(id) {
        const res = await deleteExistingExpense(id);
        if(res.success === false){
            toastr.error('Expense not found');
            return;
        }
        toastr.info('Expense Deleted');
        this.props.history.push(`/plan/${this.state.year}/${this.props.match.params.month}`);
        console.log(res);

    }

    render() {
        return (
            <tr>
                <td>{this.state.name}</td>
                <td>{this.state.category}</td>
                <td>{this.state.amount.toFixed(2)}</td>
                <td>{this.state.date}-{this.state.month}-{this.state.year}</td>
                <td>
                    <Link to={'/'}  onClick={()=>{this.deleteExpense(this.state.id)}}
                            className="btn btn-secondary">Delete
                    </Link>
                </td>
            </tr>
        )
    }
}

export default withRouter(Expenses)